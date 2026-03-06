import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createProfessorIndisponibilidadeRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/professor-indisponibilidade/professor-indisponibilidade.repository";

export const ProfessorIndisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "professor_disponibilidade",
  (ds) => createProfessorIndisponibilidadeRepository(ds),
  { alias: "professor_indisponibilidade" },
);
