import { CalendarioLetivoEntity } from "@/Ladesa.Management.Application/horarios/calendario-letivo/infrastructure/persistence/typeorm/calendario-letivo.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createCalendarioLetivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioLetivoEntity).extend({});
});

export type CalendarioLetivoRepository = IRepositoryFactoryOutput<
  typeof createCalendarioLetivoRepository
>;
