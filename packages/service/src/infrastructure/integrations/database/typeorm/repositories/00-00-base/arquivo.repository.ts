import { ArquivoEntity } from "../../entities/00-00-base/arquivo.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ArquivoEntity).extend({
    //
  });
});

export type ArquivoRepository = IRepositoryFactoryOutput<typeof createArquivoRepository>;
