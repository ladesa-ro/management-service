import { EventoEntity } from "../../entities/05-calendario/evento.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createEventoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EventoEntity).extend({
    //
  });
});

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
