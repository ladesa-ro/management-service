import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createReservaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ReservaRepository";

export const ReservaAuthzRegistrySetup = createAuthzRegistryProvider("reserva", (ds) =>
  createReservaRepository(ds),
);
