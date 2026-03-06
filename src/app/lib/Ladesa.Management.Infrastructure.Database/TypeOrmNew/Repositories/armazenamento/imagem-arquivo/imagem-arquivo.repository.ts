import { ImagemArquivoEntity } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm/imagem-arquivo.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createImagemArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ImagemArquivoEntity).extend({});
});

export type ImagemArquivoRepository = IRepositoryFactoryOutput<
  typeof createImagemArquivoRepository
>;
