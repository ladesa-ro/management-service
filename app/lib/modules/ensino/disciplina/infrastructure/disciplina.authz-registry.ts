import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const DisciplinaAuthzRegistrySetup = createAuthzRegistryProvider(
  "disciplina",
  (db) => db.disciplinaRepository,
);
