import { TurmaEntity } from "../../entities/06-ensino-discente/turma.entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createTurmaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaEntity).extend({
    //
  });
});

export type TurmaRepository = IRepositoryFactoryOutput<typeof createTurmaRepository>;
