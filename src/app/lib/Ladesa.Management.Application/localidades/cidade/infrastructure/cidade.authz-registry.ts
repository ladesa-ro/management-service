import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createCidadeRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/localidades/cidade/cidade.repository";

export const CidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "cidade",
  (ds) => createCidadeRepository(ds),
  { actions: { find: true } },
);
