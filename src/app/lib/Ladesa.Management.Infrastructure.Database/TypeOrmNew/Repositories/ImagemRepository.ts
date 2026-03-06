import { ImagemEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ImagemEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createImagemRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ImagemEntity).extend({}),
);

export type ImagemRepository = IRepositoryFactoryOutput<typeof createImagemRepository>;
