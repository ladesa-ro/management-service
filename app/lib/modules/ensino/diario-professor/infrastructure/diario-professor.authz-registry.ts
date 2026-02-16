import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const DiarioProfessorAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_professor",
  (db) => db.diarioProfessorRepository,
);
