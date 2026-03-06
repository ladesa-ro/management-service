import { BlocoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/BlocoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createBlocoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(BlocoEntity).extend({}),
);

export type BlocoRepository = IRepositoryFactoryOutput<typeof createBlocoRepository>;
