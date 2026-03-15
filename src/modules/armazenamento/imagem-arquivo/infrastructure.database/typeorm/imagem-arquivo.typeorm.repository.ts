import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { ImagemArquivoEntity } from "./imagem-arquivo.typeorm.entity";

export const createImagemArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ImagemArquivoEntity).extend({});
});

export type ImagemArquivoRepository = IRepositoryFactoryOutput<
  typeof createImagemArquivoRepository
>;
