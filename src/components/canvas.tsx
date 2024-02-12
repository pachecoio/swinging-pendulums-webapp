import Sketch from "react-p5";
import { PendulumConfig } from "../api";
import { usePollingPendulums } from "../hooks/pendulumHooks";
import { Pendulum } from "../models";

export function Canvas({ configs = [] }: { configs: PendulumConfig[] }) {
  const { pendulums } = usePollingPendulums(configs, 100);

  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(800, 300).parent(canvasParentRef);
  }

  const drawPendulum = async (p5: any, pendulum: Pendulum) => {
    p5.color(pendulum.bob.color);
    p5.strokeWeight(2);
    p5.stroke(pendulum.bob.color);
    p5.fill(pendulum.bob.color);

    p5.line(pendulum.origin.x, pendulum.origin.y, pendulum.bob.x, pendulum.bob.y);
    p5.circle(pendulum.bob.x, pendulum.bob.y, pendulum.bob.radius * 2);
  }

  const draw = (p5: any) => {
    p5.background(255);

    Promise.all(pendulums.map(pendulum => drawPendulum(p5, pendulum)));

  }

  return (
    <Sketch setup={setup} draw={draw} />
  );

}

