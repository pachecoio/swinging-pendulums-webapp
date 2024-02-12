import { useEffect, useState } from "react";
import { Pendulum } from "../models";
import { PendulumConfig, fetchPendulum } from "../api";

export function usePollingPendulum(config: PendulumConfig, refreshRate: number): { pendulum: Pendulum | null, loading: boolean } {
  const [pendulum, setPendulum] = useState<Pendulum | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      loadPendulum();
    }, refreshRate);
    return () => clearInterval(interval);
  }, [config]);

  async function loadPendulum() {
    setLoading(true);
    const pendulum = await fetchPendulum(config.port);
    setPendulum(pendulum);
    setLoading(false);
  }

  return {
    pendulum,
    loading,
  };
}

export function usePollingPendulums(configs: PendulumConfig[], refreshRate: number): { pendulums: Pendulum[], loading: boolean } {
  const [pendulums, setPendulums] = useState<Pendulum[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      loadPendulums();
    }, refreshRate);
    return () => clearInterval(interval);
  }, [configs]);

  async function loadPendulums() {
    setLoading(true);
    const pendulums = await Promise.all(configs.map(config => fetchPendulum(config.port)));
    setPendulums(pendulums);
    setLoading(false);
  }

  return {
    pendulums,
    loading,
  };
}
