import {
  CidadeDatabaseEntity
} from "@/features/cidade/infrastructure/persistence/typeorm/entities/cidade.database-entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createCidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CidadeDatabaseEntity).extend({});
});

export type ICidadeRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
