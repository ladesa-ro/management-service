import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDisciplinaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/disciplina/disciplina.repository";

export const DisciplinaAuthzRegistrySetup = createAuthzRegistryProvider("disciplina", (ds) =>
  createDisciplinaRepository(ds),
);
