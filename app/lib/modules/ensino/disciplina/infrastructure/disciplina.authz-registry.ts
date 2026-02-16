import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const DisciplinaAuthzRegistrySetup = createAuthzRegistryProvider(
  "disciplina",
  (db) => db.disciplinaRepository,
);
