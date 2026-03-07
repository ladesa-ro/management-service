import { EstadoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/EstadoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEstadoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstadoEntity).extend({});
});

export type IEstadoRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createEstadoRepository>;
