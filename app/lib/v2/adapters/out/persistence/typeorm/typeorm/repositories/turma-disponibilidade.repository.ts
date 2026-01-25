import { TurmaDisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createTurmaDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaDisponibilidadeEntity).extend({});
});

export type TurmaDisponibilidadeRepository = IRepositoryFactoryOutput<typeof createTurmaDisponibilidadeRepository>;
