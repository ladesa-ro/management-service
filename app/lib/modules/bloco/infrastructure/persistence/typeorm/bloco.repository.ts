import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { BlocoEntity } from "./bloco.entity";

export const createBlocoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(BlocoEntity).extend({}),
);

export type BlocoRepository = IRepositoryFactoryOutput<typeof createBlocoRepository>;
