import { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createBlocoRepository = createRepositoryFactory((ds) => ds.getRepository(BlocoEntity).extend({}));

export type BlocoRepository = IRepositoryFactoryOutput<typeof createBlocoRepository>;
