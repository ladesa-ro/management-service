import { ReservaEntity } from "@/Ladesa.Management.Application/ambientes/reserva/infrastructure/persistence/typeorm/reserva.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createReservaRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ReservaEntity).extend({}),
);

export type ReservaRepository = IRepositoryFactoryOutput<typeof createReservaRepository>;
