import { ReservaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createReservaRepository = createRepositoryFactory((ds) =>
  ds.getRepository(ReservaEntity).extend({}),
);

export type ReservaRepository = IRepositoryFactoryOutput<typeof createReservaRepository>;
