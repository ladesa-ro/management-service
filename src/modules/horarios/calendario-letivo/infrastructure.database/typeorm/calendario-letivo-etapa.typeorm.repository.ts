import { createRepositoryFactory, IRepositoryFactoryOutput } from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioLetivoEtapaEntity } from "./calendario-letivo-etapa.typeorm.entity";

export const createCalendarioLetivoEtapaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioLetivoEtapaEntity).extend({});
});

export type CalendarioLetivoEtapaRepository = IRepositoryFactoryOutput<typeof createCalendarioLetivoEtapaRepository>;
