import { createRepositoryFactory } from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { ProfessorIndisponibilidadeEntity } from "./professor-indisponibilidade.entity";

export const createProfessorIndisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ProfessorIndisponibilidadeEntity).extend({});
});

export type ProfessorIndisponibilidadeRepository = ReturnType<
  typeof createProfessorIndisponibilidadeRepository
>;
