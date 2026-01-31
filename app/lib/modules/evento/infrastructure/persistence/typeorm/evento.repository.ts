import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { EventoEntity } from "./evento.entity";

export const createEventoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EventoEntity).extend({});
});

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
