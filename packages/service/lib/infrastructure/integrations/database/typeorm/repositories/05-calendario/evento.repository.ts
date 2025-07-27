import { EventoEntity } from "../../entities/05-calendario/evento.entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createEventoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EventoEntity).extend({});
});

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
