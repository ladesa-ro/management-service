import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createDiarioProfessorRepository } from "./persistence/typeorm/diario-professor.repository";

export const DiarioProfessorAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_professor",
  (ds) => createDiarioProfessorRepository(ds),
);
