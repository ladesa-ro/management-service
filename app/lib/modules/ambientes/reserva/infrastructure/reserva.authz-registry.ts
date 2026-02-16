import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createReservaRepository } from "./persistence/typeorm/reserva.repository";

export const ReservaAuthzRegistrySetup = createAuthzRegistryProvider("reserva", (ds) =>
  createReservaRepository(ds),
);
