import { useTheme } from "@emotion/react";
import {
  Bodies,
  Engine,
  IChamferableBodyDefinition,
  Render,
  Runner,
  World,
} from "matter-js";
import { NextPage } from "next";
import { useCallback, useEffect, useRef } from "react";
import * as S from "./styles";

export const Container404: NextPage = () => {
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

    return cleanUp;
  }, [cleanUp, theme]);

  return <S.Canvas ref={scene} />;
};

export default Container404;
