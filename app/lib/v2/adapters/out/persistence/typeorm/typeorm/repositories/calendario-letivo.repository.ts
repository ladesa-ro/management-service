import { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createCalendarioLetivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioLetivoEntity).extend({});
});

export type CalendarioLetivoRepository = IRepositoryFactoryOutput<typeof createCalendarioLetivoRepository>;
