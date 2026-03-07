import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createPerfilRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreatePerfilRepository";

export const PerfilAuthzRegistrySetup = createAuthzRegistryProvider(
  "vinculo",
  (ds) => createPerfilRepository(ds),
  { actions: { find: true } },
);
