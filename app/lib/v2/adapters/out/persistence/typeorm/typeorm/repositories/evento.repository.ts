import { EventoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createEventoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EventoEntity).extend({});
});

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
