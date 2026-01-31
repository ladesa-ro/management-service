import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { EstadoEntity } from "./estado.entity";

export const createEstadoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstadoEntity).extend({});
});

export type IEstadoRepository = IRepositoryFactoryOutput<typeof createEstadoRepository>;
