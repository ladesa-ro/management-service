import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const TurmaAuthzRegistrySetup = createAuthzRegistryProvider(
  "turma",
  (db) => db.turmaRepository,
);
