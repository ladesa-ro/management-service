import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { ReservaEntity } from "./reserva.entity";

export const createReservaRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ReservaEntity).extend({}),
);

export type ReservaRepository = IRepositoryFactoryOutput<typeof createReservaRepository>;
