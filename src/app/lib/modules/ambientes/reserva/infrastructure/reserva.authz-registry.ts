import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createReservaRepository } from "./persistence/typeorm/reserva.repository";

export const ReservaAuthzRegistrySetup = createAuthzRegistryProvider("reserva", (ds) =>
  createReservaRepository(ds),
);
