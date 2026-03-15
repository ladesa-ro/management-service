import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { TurmaEntity } from "./turma.typeorm.entity";

export const createTurmaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaEntity).extend({});
});

export type TurmaRepository = IRepositoryFactoryOutput<typeof createTurmaRepository>;
