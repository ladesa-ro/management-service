import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEtapaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/EtapaRepository";

export const EtapaAuthzRegistrySetup = createAuthzRegistryProvider("etapa", (ds) =>
  createEtapaRepository(ds),
);
