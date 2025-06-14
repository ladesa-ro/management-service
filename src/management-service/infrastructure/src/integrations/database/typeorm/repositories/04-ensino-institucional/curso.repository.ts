import { CursoEntity } from "../../entities/04-ensino-institucional/curso.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createCursoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CursoEntity).extend({
    //
  });
});

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
