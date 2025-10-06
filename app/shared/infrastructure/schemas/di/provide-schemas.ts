import { createContainerRegister, SchemaRegistry } from "@/shared";

export const registerSchemas = createContainerRegister((container) => {
  container.bind(SchemaRegistry).toSelf().inSingletonScope();
});
