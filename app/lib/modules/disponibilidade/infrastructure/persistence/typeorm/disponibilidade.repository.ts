import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { DisponibilidadeEntity } from "./disponibilidade.entity";

export const createDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisponibilidadeEntity).extend({});
});

export type DisponibilidadeRepository = IRepositoryFactoryOutput<
  typeof createDisponibilidadeRepository
>;
