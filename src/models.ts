export type Pendulum = {
  id: string;
  origin: Position
  bob: Bob;
  armLength: number;
  angle: number;
  mass: number;
};

export type Bob = {
  color: string;
  radius: number;
  x: number;
  y: number;
};

export type Position = {
  x: number;
  y: number;
};
