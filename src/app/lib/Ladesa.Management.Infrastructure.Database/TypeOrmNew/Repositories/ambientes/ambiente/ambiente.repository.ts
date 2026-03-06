import { AmbienteEntity } from "@/Ladesa.Management.Application/ambientes/ambiente/infrastructure/persistence/typeorm/ambiente.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createAmbienteRepository = createRepositoryFactory((ds) =>
  ds.getRepository(AmbienteEntity).extend({}),
);

export type AmbienteRepository = IRepositoryFactoryOutput<typeof createAmbienteRepository>;
