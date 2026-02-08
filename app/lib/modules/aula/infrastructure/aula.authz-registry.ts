import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const AulaAuthzRegistrySetup = createAuthzRegistryProvider(
  "aula",
  (db) => db.aulaRepository,
);
