import React, { useCallback, useEffect, useRef } from "react";
import { Engine, Render, Bodies, World } from "matter-js";
import * as S from "./styles";

const ScreenSaver = () => {
  const scene = useRef<HTMLDivElement>(null);
  const isPressed = useRef<boolean>(false);
  const engine = useRef<Engine>(Engine.create());

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

    Engine.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    doFirst();
  }, [doFirst]);

  const handleDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    isPressed.current = true;
  };

  const handleUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    isPressed.current = false;
  };

  const handleAddCircle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPressed.current) {
      e.stopPropagation();
      e.preventDefault();

      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: "#0000ff",
          },
        }
      );
      World.add(engine.current.world, [ball]);
    }
  };

  return (
    <S.Canvas
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseMove={handleAddCircle}
    >
      <S.Canvas ref={scene} />
    </S.Canvas>
  );
};

export default ScreenSaver;
