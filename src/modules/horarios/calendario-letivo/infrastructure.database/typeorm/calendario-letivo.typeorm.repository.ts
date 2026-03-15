import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioLetivoEntity } from "./calendario-letivo.typeorm.entity";

export const createCalendarioLetivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioLetivoEntity).extend({});
});

export type CalendarioLetivoRepository = IRepositoryFactoryOutput<
  typeof createCalendarioLetivoRepository
>;
