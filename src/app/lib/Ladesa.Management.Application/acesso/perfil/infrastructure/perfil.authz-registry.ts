import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createPerfilRepository } from "./persistence/typeorm/perfil.repository";

export const PerfilAuthzRegistrySetup = createAuthzRegistryProvider(
  "vinculo",
  (ds) => createPerfilRepository(ds),
  { actions: { find: true } },
);
