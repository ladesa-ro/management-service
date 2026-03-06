import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiaCalendarioRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/DiaCalendarioRepository";

export const DiaCalendarioAuthzRegistrySetup = createAuthzRegistryProvider("dia_calendario", (ds) =>
  createDiaCalendarioRepository(ds),
);
