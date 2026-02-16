import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { ImagemEntity } from "./imagem.entity";

export const createImagemRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ImagemEntity).extend({}),
);

export type ImagemRepository = IRepositoryFactoryOutput<typeof createImagemRepository>;
