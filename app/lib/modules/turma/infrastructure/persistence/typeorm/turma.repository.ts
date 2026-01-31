import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { TurmaEntity } from "./turma.entity";

export const createTurmaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaEntity).extend({});
});

export type TurmaRepository = IRepositoryFactoryOutput<typeof createTurmaRepository>;
