import { EventoEntity } from "@/Ladesa.Management.Application/horarios/evento/infrastructure/persistence/typeorm/evento.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEventoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EventoEntity).extend({});
});

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
