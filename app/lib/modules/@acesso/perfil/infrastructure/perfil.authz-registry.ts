import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const PerfilAuthzRegistrySetup = createAuthzRegistryProvider(
  "vinculo",
  (db) => db.perfilRepository,
  { actions: { find: true } },
);
