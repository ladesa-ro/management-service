import { ArquivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ArquivoEntity).extend({});
});

export type ArquivoRepository = IRepositoryFactoryOutput<typeof createArquivoRepository>;
