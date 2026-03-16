import { createRepositoryFactory, IRepositoryFactoryOutput } from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoAmbienteEntity } from "./calendario-agendamento-ambiente.typeorm.entity";

export const createCalendarioAgendamentoAmbienteRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoAmbienteEntity).extend({});
});

export type CalendarioAgendamentoAmbienteRepository = IRepositoryFactoryOutput<typeof createCalendarioAgendamentoAmbienteRepository>;
