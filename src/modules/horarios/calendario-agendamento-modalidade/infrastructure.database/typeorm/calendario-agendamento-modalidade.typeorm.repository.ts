import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoModalidadeEntity } from "./calendario-agendamento-modalidade.typeorm.entity";

export const createCalendarioAgendamentoModalidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoModalidadeEntity).extend({});
});

export type CalendarioAgendamentoModalidadeRepository = IRepositoryFactoryOutput<
  typeof createCalendarioAgendamentoModalidadeRepository
>;
