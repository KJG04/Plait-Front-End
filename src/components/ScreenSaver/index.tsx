import React, { Fragment, useCallback, useEffect, useRef } from "react";
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
  IBodyDefinition,
  Svg,
} from "matter-js";
import * as S from "./styles";
import { useTheme } from "@emotion/react";
import Triangle from "./Triangle";

if (process.browser) {
  require("pathseg");
}

const ScreenSaver = () => {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine>(Engine.create());
  const render = useRef<Render | undefined>(undefined);
  const triangleRef = useRef<SVGPathElement>(null);
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
    if (!scene.current || !triangleRef.current) {
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

    const bodyOptions: IBodyDefinition = {
      restitution: 0.8,
      friction: 0.01,
      frictionAir: 0,
      density: 1,
      isStatic: false,
      render: {
        fillStyle: theme.colors.primary,
      },
    };

    const ball = Bodies.circle(100, 200, 30, bodyOptions);
    const box = Bodies.rectangle(cw * 0.9, ch * 0.8, 100, 100, {
      ...bodyOptions,
      chamfer: { radius: 30 },
    });

    const mouse = Mouse.create(render.current.canvas);

    const options: IMouseConstraintDefinition = {
      mouse,
    };

    const constraints = MouseConstraint.create(engine.current, options);
    constraints.constraint.stiffness = 0.0005;
    constraints.constraint.length = 0;
    constraints.constraint.render.visible = false;
    constraints.constraint.damping = 0.00001;

    World.add(engine.current.world, constraints);

    const vertexSets: Body[] = [];
    const v = Bodies.fromVertices(
      500,
      80,
      [Svg.pathToVertices(triangleRef.current, 5)],
      {
        density: 1,
        render: {
          fillStyle: theme.colors.primary,
        },
      },
      true
    );
    vertexSets.push(v);

    const bodies = [ball, box, ...vertexSets];

    bodies.forEach((value) => {
      var forceMagnitude = 0.005 * value.mass;

      Body.applyForce(value, value.position, {
        x:
          (forceMagnitude + Common.random() * forceMagnitude) *
          Common.choose([1, -1]),
        y: -forceMagnitude + Common.random() * -forceMagnitude,
      });

      Body.setAngularVelocity(value, (Math.random() * forceMagnitude) / 1000);
    });

    World.add(engine.current.world, bodies);

    return cleanUp;
  }, [cleanUp, theme]);

  return (
    <Fragment>
      <S.Canvas ref={scene} />
      <div style={{ display: "none" }}>
        <Triangle ref={triangleRef} />
      </div>
    </Fragment>
  );
};

export default ScreenSaver;
