import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { IntervaloDeTempoEntity } from "./intervalo-de-tempo.entity";

export const createIntervaloDeTempoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(IntervaloDeTempoEntity).extend({}),
);

export type IntervaloDeTempoRepository = IRepositoryFactoryOutput<
  typeof createIntervaloDeTempoRepository
>;
