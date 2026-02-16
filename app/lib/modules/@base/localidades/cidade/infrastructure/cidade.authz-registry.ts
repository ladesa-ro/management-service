import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const CidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "cidade",
  (db) => db.cidadeRepository,
  { actions: { find: true } },
);
