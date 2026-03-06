import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createAulaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/AulaRepository";

export const AulaAuthzRegistrySetup = createAuthzRegistryProvider("aula", (ds) =>
  createAulaRepository(ds),
);
