import { CalendarioLetivoEntity } from "../../entities/05-calendario/calendario-letivo.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createCalendarioLetivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioLetivoEntity).extend({
    //
  });
});

export type CalendarioLetivoRepository = IRepositoryFactoryOutput<typeof createCalendarioLetivoRepository>;
