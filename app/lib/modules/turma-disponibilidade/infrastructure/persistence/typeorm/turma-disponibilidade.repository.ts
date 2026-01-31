import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { TurmaDisponibilidadeEntity } from "./turma-disponibilidade.entity";

export const createTurmaDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaDisponibilidadeEntity).extend({});
});

export type TurmaDisponibilidadeRepository = IRepositoryFactoryOutput<
  typeof createTurmaDisponibilidadeRepository
>;
