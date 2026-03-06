import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { BlocoEntity } from "./bloco.entity";

export const createBlocoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(BlocoEntity).extend({}),
);

export type BlocoRepository = IRepositoryFactoryOutput<typeof createBlocoRepository>;
