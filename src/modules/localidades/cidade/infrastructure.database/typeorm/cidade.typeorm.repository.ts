import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CidadeEntity } from "./cidade.typeorm.entity";

export const createCidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CidadeEntity).extend({});
});

export type CidadeTypeOrmRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
