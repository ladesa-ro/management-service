import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { CalendarioLetivoEntity } from "./calendario-letivo.entity";

export const createCalendarioLetivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioLetivoEntity).extend({});
});

export type CalendarioLetivoRepository = IRepositoryFactoryOutput<
  typeof createCalendarioLetivoRepository
>;
