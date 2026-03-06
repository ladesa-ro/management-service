import { EstadoEntity } from "@/Ladesa.Management.Application/localidades/estado/infrastructure/persistence/typeorm/estado.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEstadoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstadoEntity).extend({});
});

export type IEstadoRepository = IRepositoryFactoryOutput<typeof createEstadoRepository>;
