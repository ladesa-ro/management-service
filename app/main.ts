import type { Container } from "inversify";
import { registerEstado } from "@/features/estado/infrastructure/di/register-estado.ts";
import { Server } from "@/server/server.ts";
import { createContainer, registerMany } from "@/shared";
import { registerShared } from "@/shared/register-shared.ts";

const registerAll = async (container: Container) => {
  const composition = [registerShared, registerEstado];
  await registerMany(composition)(container);
};

const start = async () => {
  const container = createContainer();

  await registerAll(container);

  const server = new Server(container);
  server.start();
};

await start();
