import { ReservaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ReservaEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createReservaRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ReservaEntity).extend({}),
);

export type IReservaRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createReservaRepository>;
