import { EventoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/EventoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEventoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EventoEntity).extend({});
});

export type IEventoRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createEventoRepository>;
