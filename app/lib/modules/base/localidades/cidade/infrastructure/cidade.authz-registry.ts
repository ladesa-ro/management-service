import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const CidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "cidade",
  (db) => db.cidadeRepository,
  { actions: { find: true } },
);
