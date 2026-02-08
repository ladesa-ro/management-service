import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const DiarioProfessorAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_professor",
  (db) => db.diarioProfessorRepository,
);
