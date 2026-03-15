import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { AmbienteEntity } from "./ambiente.typeorm.entity";

export const createAmbienteRepository = createRepositoryFactory((ds) =>
  ds.getRepository(AmbienteEntity).extend({}),
);

export type AmbienteRepository = IRepositoryFactoryOutput<typeof createAmbienteRepository>;
