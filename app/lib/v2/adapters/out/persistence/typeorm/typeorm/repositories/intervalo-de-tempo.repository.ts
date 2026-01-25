import { IntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createIntervaloDeTempoRepository = createRepositoryFactory((ds) => ds.getRepository(IntervaloDeTempoEntity).extend({}));

export type IntervaloDeTempoRepository = IRepositoryFactoryOutput<typeof createIntervaloDeTempoRepository>;
