import { createContainerRegister, registerMany, registerSchemas } from "@/shared/infrastructure";
import { registerDataSource } from "@/shared/infrastructure/typeorm/register-data-source.ts";

export const registerShared = createContainerRegister(async (container) => {
  const composition = [registerDataSource, registerSchemas];
  await registerMany(composition)(container);
});
