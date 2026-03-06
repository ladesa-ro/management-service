import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiarioProfessorRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/DiarioProfessorRepository";

export const DiarioProfessorAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_professor",
  (ds) => createDiarioProfessorRepository(ds),
);
