import { IntervaloDeTempoEntity } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/infrastructure/persistence/typeorm/intervalo-de-tempo.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createIntervaloDeTempoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(IntervaloDeTempoEntity).extend({}),
);

export type IntervaloDeTempoRepository = IRepositoryFactoryOutput<
  typeof createIntervaloDeTempoRepository
>;
