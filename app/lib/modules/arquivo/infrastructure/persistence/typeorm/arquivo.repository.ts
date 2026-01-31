import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { ArquivoEntity } from "./arquivo.entity";

export const createArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ArquivoEntity).extend({});
});

export type ArquivoRepository = IRepositoryFactoryOutput<typeof createArquivoRepository>;
