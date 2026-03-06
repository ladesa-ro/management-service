import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createReservaRepository } from "./persistence/typeorm/reserva.repository";

export const ReservaAuthzRegistrySetup = createAuthzRegistryProvider("reserva", (ds) =>
  createReservaRepository(ds),
);
