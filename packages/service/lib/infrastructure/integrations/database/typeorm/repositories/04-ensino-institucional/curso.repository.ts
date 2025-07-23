import { CursoEntity } from "../../entities/04-ensino-institucional/curso.entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createCursoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CursoEntity).extend({
    //
  });
});

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
