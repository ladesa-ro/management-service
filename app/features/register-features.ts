import { registerEstado } from "@/features/estado/infrastructure";
import { createContainerRegister, registerMany } from "@/shared";

export const registerFeatures = createContainerRegister((container) => {
  const composition = [
    registerEstado
  ];

  return registerMany(composition)(container);
});
