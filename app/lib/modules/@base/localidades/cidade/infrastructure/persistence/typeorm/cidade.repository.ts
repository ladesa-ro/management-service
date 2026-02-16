import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { CidadeEntity } from "./cidade.entity";

export const createCidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CidadeEntity).extend({});
});

export type ICidadeRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
