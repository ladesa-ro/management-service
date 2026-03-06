import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiarioProfessorRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/diario-professor/diario-professor.repository";

export const DiarioProfessorAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_professor",
  (ds) => createDiarioProfessorRepository(ds),
);
