import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const AmbienteAuthzRegistrySetup = createAuthzRegistryProvider(
  "ambiente",
  (db) => db.ambienteRepository,
);
