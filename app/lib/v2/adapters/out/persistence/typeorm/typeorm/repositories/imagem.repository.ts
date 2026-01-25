import { ImagemEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createImagemRepository = createRepositoryFactory((ds) => ds.getRepository(ImagemEntity).extend({}));

export type ImagemRepository = IRepositoryFactoryOutput<typeof createImagemRepository>;
