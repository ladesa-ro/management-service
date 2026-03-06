import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { AmbienteEntity } from "./ambiente.entity";

export const createAmbienteRepository = createRepositoryFactory((ds) =>
  ds.getRepository(AmbienteEntity).extend({}),
);

export type AmbienteRepository = IRepositoryFactoryOutput<typeof createAmbienteRepository>;
