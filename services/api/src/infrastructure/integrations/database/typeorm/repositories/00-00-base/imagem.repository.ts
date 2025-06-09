import { ImagemEntity } from "../../entities/00-00-base/imagem.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createImagemRepository = createRepositoryFactory((ds) => ds.getRepository(ImagemEntity).extend({}));

export type ImagemRepository = IRepositoryFactoryOutput<typeof createImagemRepository>;
