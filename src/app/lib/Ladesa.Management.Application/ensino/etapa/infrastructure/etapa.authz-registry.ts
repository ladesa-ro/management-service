import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEtapaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateEtapaRepository";

export const EtapaAuthzRegistrySetup = createAuthzRegistryProvider("etapa", (ds) =>
  createEtapaRepository(ds),
);
