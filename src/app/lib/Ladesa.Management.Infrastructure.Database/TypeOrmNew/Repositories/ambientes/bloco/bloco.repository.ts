import { BlocoEntity } from "@/Ladesa.Management.Application/ambientes/bloco/infrastructure/persistence/typeorm/bloco.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createBlocoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(BlocoEntity).extend({}),
);

export type BlocoRepository = IRepositoryFactoryOutput<typeof createBlocoRepository>;
