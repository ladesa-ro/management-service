import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioLetivoDiaEntity } from "./calendario-letivo-dia.typeorm.entity";

export const createCalendarioLetivoDiaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioLetivoDiaEntity).extend({});
});

export type CalendarioLetivoDiaRepository = IRepositoryFactoryOutput<
  typeof createCalendarioLetivoDiaRepository
>;
