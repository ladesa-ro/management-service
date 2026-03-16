import { createRepositoryFactory, IRepositoryFactoryOutput } from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoCalendarioLetivoEntity } from "./calendario-agendamento-calendario-letivo.typeorm.entity";

export const createCalendarioAgendamentoCalendarioLetivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoCalendarioLetivoEntity).extend({});
});

export type CalendarioAgendamentoCalendarioLetivoRepository = IRepositoryFactoryOutput<typeof createCalendarioAgendamentoCalendarioLetivoRepository>;
