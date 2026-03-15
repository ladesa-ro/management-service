import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { ArquivoEntity } from "./arquivo.typeorm.entity";

export const createArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ArquivoEntity).extend({});
});

export type ArquivoRepository = IRepositoryFactoryOutput<typeof createArquivoRepository>;
