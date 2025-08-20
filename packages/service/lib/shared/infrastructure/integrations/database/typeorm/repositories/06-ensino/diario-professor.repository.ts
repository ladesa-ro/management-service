import { DiarioProfessorEntity } from "../../entities/06-ensino-discente/diario-professor.entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioProfessorEntity).extend({});
});

export type DiarioProfessorRepository = IRepositoryFactoryOutput<typeof createDiarioProfessorRepository>;
