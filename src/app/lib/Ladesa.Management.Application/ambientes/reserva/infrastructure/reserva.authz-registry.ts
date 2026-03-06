import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createReservaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ambientes/reserva/reserva.repository";

export const ReservaAuthzRegistrySetup = createAuthzRegistryProvider("reserva", (ds) =>
  createReservaRepository(ds),
);
