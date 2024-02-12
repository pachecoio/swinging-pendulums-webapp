import { Pendulum } from "./models";
import axios from "axios";

const BASE_URL = "http://localhost";
const SUPERVISOR_PORT = 3000;

export async function listPendulumConfigs(): Promise<PendulumConfig[]> {
  const client = getSupervisorApi();
  const response = await client.get("/pendulums");
  return response.data;
}

export async function fetchPendulum(port: number): Promise<Pendulum> {
  const client = getPendulumApi(port);
  const response = await client.get("/pendulum");
  return response.data;
}

export async function updatePendulum(port: number, data: UpdatePendulumOptions) {
  const client = getPendulumApi(port);
  await client.put("/pendulum", data);
}

export async function startAllPendulums() {
  const client = getSupervisorApi();
  await client.post("/startAll");
}

export async function pauseAllPendulums() {
  const client = getSupervisorApi();
  await client.post("/pauseAll");
}

export async function stopAllPendulums() {
  const client = getSupervisorApi();
  await client.post("/stopAll");
}

export async function updateSettings(config: Config) {
  const client = getSupervisorApi();
  const res = await client.put("/settings", config);
  console.log('settings updated', res)
}

function getSupervisorApi() {
  const baseURL = `${BASE_URL}:${SUPERVISOR_PORT}`;
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export function getPendulumApi(port: number) {
  const baseURL = `${BASE_URL}:${port}`;
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export type PendulumConfig = {
  port: number;
  config: Config;
  pendulum: Pendulum;
};

export type Config = {
  gravity: number;
  time: number;
  refreshRate: number;
};

export type UpdatePendulumOptions = {
  mass?: number;
  armLength?: number;
  origin?: Position;
  angle?: number;
  bobRadius?: number;
  bobColor?: string;
  left?: string;
  right?: string;
};

export type Position = {
  x: number;
  y: number;
};

