import { IntervaloDeTempoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/IntervaloDeTempoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createIntervaloDeTempoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(IntervaloDeTempoEntity).extend({}),
);

export type IIntervaloDeTempoRepositoryTypeOrm = IRepositoryFactoryOutput<
  typeof createIntervaloDeTempoRepository
>;
