import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/create-repository-factory";
import { IntervaloDeTempoEntity } from "./intervalo-de-tempo.entity";

export const createIntervaloDeTempoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(IntervaloDeTempoEntity).extend({}),
);

export type IntervaloDeTempoRepository = IRepositoryFactoryOutput<
  typeof createIntervaloDeTempoRepository
>;
