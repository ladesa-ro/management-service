import { registerEstado } from "@/features/estado/infrastructure";
import { createContainerRegister, registerMany } from "@/shared";

export const registerFeatures = createContainerRegister((container) => {
  return registerMany([registerEstado])(container);
});
