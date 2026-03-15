import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { ImagemEntity } from "./imagem.typeorm.entity";

export const createImagemRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ImagemEntity).extend({}),
);

export type ImagemRepository = IRepositoryFactoryOutput<typeof createImagemRepository>;
