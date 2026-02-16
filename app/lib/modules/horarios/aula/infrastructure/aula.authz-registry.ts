import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const AulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "aula",
  (db) => db.aulaRepository,
);
