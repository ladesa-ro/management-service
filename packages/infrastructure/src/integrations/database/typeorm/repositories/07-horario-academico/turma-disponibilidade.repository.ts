import { TurmaDisponibilidadeEntity } from "../../entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createTurmaDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaDisponibilidadeEntity).extend({
    //
  });
});

export type TurmaDisponibilidadeRepository = IRepositoryFactoryOutput<typeof createTurmaDisponibilidadeRepository>;
