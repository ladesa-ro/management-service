import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const EtapaAuthzRegistrySetup = createAuthzRegistryProvider(
  "etapa",
  (db) => db.etapaRepository,
);
