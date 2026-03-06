import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/create-repository-factory";
import { AmbienteEntity } from "./ambiente.entity";

export const createAmbienteRepository = createRepositoryFactory((ds) =>
  ds.getRepository(AmbienteEntity).extend({}),
);

export type AmbienteRepository = IRepositoryFactoryOutput<typeof createAmbienteRepository>;
