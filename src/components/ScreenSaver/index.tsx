import React, { useCallback, useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Bodies,
  World,
  Body,
  Runner,
  IChamferableBodyDefinition,
  Common,
  MouseConstraint,
  Mouse,
  IMouseConstraintDefinition,
} from "matter-js";
import * as S from "./styles";
import { useTheme } from "@emotion/react";

const ScreenSaver = () => {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine>(Engine.create());
  const render = useRef<Render | undefined>(undefined);
  const theme = useTheme();

  const cleanUp = useCallback(() => {
    if (render.current) {
      Render.stop(render.current);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.current.canvas.remove();
      render.current.textures = {};
    }
  }, []);

  useEffect(() => {
    if (!scene.current) {
      return () => {};
    }

    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    render.current = Render.create({
      element: scene.current || undefined,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    const option: IChamferableBodyDefinition = {
      isStatic: true,
      density: 1,
      render: {
        opacity: 0,
      },
    };

    const size = 20;

    const top = Bodies.rectangle(0, -size, cw * 2, size, option);
    const left = Bodies.rectangle(-size, 0, size, ch * 2, option);
    const bottom = Bodies.rectangle(0, ch, cw * 2, size, option);
    const right = Bodies.rectangle(cw, 0, size, ch * 2, option);

    World.add(engine.current.world, [top, right, bottom, left]);
    engine.current.gravity.x = 0;
    engine.current.gravity.y = 0;

    Runner.run(engine.current);
    Render.run(render.current);

    const ball = Bodies.circle(100, 200, 30 + Math.random() * 30, {
      restitution: 0.8,
      friction: 0.01,
      frictionAir: 0,
      density: 1,
      inertia: Infinity,
      render: {
        fillStyle: theme.colors.primary,
      },
    });

    const mouse = Mouse.create(render.current.canvas);

    const options: IMouseConstraintDefinition = {
      mouse,
    };

    const constraints = MouseConstraint.create(engine.current, options);
    constraints.constraint.stiffness = 0.001;
    constraints.constraint.render.visible = false;
    constraints.constraint.damping = 0.5;
    World.add(engine.current.world, constraints);

    var forceMagnitude = 0.001 * ball.mass;

    Body.applyForce(ball, ball.position, {
      x:
        (forceMagnitude + Common.random() * forceMagnitude) *
        Common.choose([1, -1]),
      y: -forceMagnitude + Common.random() * -forceMagnitude,
    });

    World.add(engine.current.world, [ball]);

    return cleanUp;
  }, [cleanUp, theme]);

  return <S.Canvas ref={scene} />;
};

export default ScreenSaver;
