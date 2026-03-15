import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { EstadoEntity } from "./estado.typeorm.entity";

export const createEstadoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstadoEntity).extend({});
});

export type EstadoTypeOrmRepository = IRepositoryFactoryOutput<typeof createEstadoRepository>;
