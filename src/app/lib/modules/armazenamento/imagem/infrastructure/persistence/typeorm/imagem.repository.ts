import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/create-repository-factory";
import { ImagemEntity } from "./imagem.entity";

export const createImagemRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ImagemEntity).extend({}),
);

export type ImagemRepository = IRepositoryFactoryOutput<typeof createImagemRepository>;
