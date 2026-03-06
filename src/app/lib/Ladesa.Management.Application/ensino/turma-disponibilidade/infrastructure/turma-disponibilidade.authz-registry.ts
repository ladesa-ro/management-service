import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createTurmaDisponibilidadeRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/turma-disponibilidade/turma-disponibilidade.repository";

export const TurmaDisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "turma_disponibilidade",
  (ds) => createTurmaDisponibilidadeRepository(ds),
);
