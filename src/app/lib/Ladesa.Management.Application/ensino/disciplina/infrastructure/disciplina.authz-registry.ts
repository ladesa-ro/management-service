import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDisciplinaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/DisciplinaRepository";

export const DisciplinaAuthzRegistrySetup = createAuthzRegistryProvider("disciplina", (ds) =>
  createDisciplinaRepository(ds),
);
