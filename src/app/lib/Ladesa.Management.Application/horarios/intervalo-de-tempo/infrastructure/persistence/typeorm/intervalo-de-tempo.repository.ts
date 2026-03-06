import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { IntervaloDeTempoEntity } from "./intervalo-de-tempo.entity";

export const createIntervaloDeTempoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(IntervaloDeTempoEntity).extend({}),
);

export type IntervaloDeTempoRepository = IRepositoryFactoryOutput<
  typeof createIntervaloDeTempoRepository
>;
