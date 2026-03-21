import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoTurmaEntity } from "./calendario-agendamento-turma.typeorm.entity";

export const createCalendarioAgendamentoTurmaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoTurmaEntity).extend({});
});

export type CalendarioAgendamentoTurmaRepository = IRepositoryFactoryOutput<
  typeof createCalendarioAgendamentoTurmaRepository
>;
