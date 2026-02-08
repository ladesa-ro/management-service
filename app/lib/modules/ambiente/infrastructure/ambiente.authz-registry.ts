import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const AmbienteAuthzRegistrySetup = createAuthzRegistryProvider(
  "ambiente",
  (db) => db.ambienteRepository,
);
