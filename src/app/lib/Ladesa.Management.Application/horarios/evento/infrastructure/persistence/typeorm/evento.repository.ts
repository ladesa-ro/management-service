import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { EventoEntity } from "./evento.entity";

export const createEventoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EventoEntity).extend({});
});

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
