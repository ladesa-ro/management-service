import { CidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createCidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CidadeEntity).extend({});
});

export type ICidadeRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
