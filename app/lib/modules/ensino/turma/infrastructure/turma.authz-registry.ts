import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const TurmaAuthzRegistrySetup = createAuthzRegistryProvider(
  "turma",
  (db) => db.turmaRepository,
);
