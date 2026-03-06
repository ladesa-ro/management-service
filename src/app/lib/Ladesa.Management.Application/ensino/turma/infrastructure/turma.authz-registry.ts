import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createTurmaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/turma/turma.repository";

export const TurmaAuthzRegistrySetup = createAuthzRegistryProvider("turma", (ds) =>
  createTurmaRepository(ds),
);
