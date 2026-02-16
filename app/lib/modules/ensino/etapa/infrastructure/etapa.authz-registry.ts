import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const EtapaAuthzRegistrySetup = createAuthzRegistryProvider(
  "etapa",
  (db) => db.etapaRepository,
);
