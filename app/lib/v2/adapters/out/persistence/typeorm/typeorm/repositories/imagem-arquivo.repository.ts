import { ImagemArquivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createImagemArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ImagemArquivoEntity).extend({});
});

export type ImagemArquivoRepository = IRepositoryFactoryOutput<typeof createImagemArquivoRepository>;
