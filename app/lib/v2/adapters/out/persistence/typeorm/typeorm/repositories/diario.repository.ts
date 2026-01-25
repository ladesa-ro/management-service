import { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createDiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioEntity).extend({});
});

export type DiarioRepository = IRepositoryFactoryOutput<typeof createDiarioRepository>;
