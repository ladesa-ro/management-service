import { ImagemArquivoEntity } from "../../entities/00-00-base/imagem-arquivo.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createImagemArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ImagemArquivoEntity).extend({
    //
  });
});

export type ImagemArquivoRepository = IRepositoryFactoryOutput<typeof createImagemArquivoRepository>;
