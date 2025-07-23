import { DisciplinaEntity } from "../../entities/04-ensino-institucional/disciplina.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createDisciplinaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisciplinaEntity).extend({
    //
  });
});

export type DisciplinaRepository = IRepositoryFactoryOutput<typeof createDisciplinaRepository>;
