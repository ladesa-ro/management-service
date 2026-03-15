import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { BlocoEntity } from "./bloco.typeorm.entity";

export const createBlocoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(BlocoEntity).extend({}),
);

export type BlocoRepository = IRepositoryFactoryOutput<typeof createBlocoRepository>;
