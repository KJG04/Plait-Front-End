import React, { useCallback, useEffect, useRef } from "react";
import { Engine, Render, Bodies, World, Body, Vector } from "matter-js";
import * as S from "./styles";
import { useTheme } from "@emotion/react";

const ScreenSaver = () => {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine>(Engine.create());
  const theme = useTheme();

  const doFirst = useCallback(() => {
    if (!scene.current) {
      return;
    }

    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);
    engine.current.gravity.scale = 0;

    Engine.run(engine.current);
    Render.run(render);

    const ball = Bodies.circle(100, 200, 10 + Math.random() * 30, {
      mass: 1,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      render: {
        fillStyle: theme.colors.primary,
      },
    });

    Body.setVelocity(ball, Vector.create(1, 1));

    World.add(engine.current.world, [ball]);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    };
  }, [theme]);

  useEffect(() => {
    doFirst();
  }, [doFirst]);

  return <S.Canvas ref={scene} />;
};

export default ScreenSaver;
