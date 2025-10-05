import type { Container } from "inversify";
import { registerEstado } from "@/features/estado/infrastructure/di/register-estado.ts";
import { Server } from "@/server/server.ts";
import { createContainer, registerMany } from "@/shared";
import { registerDataSource } from "@/shared/infrastructure/typeorm/register-data-source.ts";

const registerAll = async (container: Container) => {
  const composition = [registerDataSource, registerEstado];

  await registerMany(composition)(container);
};

const start = async () => {
  const container = createContainer();

  await registerAll(container);

  const server = new Server();
  server.start();
};

await start();
