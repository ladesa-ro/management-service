import { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createTurmaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaEntity).extend({});
});

export type TurmaRepository = IRepositoryFactoryOutput<typeof createTurmaRepository>;
