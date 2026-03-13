import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { ImagemArquivoEntity } from "./imagem-arquivo.entity";

export const createImagemArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ImagemArquivoEntity).extend({});
});

export type ImagemArquivoRepository = IRepositoryFactoryOutput<
  typeof createImagemArquivoRepository
>;
