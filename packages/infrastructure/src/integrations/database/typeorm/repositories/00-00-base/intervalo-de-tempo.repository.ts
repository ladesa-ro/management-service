import { IntervaloDeTempoEntity } from "../../entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createIntervaloDeTempoRepository = createRepositoryFactory((ds) => ds.getRepository(IntervaloDeTempoEntity).extend({}));

export type IntervaloDeTempoRepository = IRepositoryFactoryOutput<typeof createIntervaloDeTempoRepository>;
