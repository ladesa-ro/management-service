import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoEntity } from "./calendario-agendamento.typeorm.entity";

export const createCalendarioAgendamentoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoEntity).extend({});
});

export type CalendarioAgendamentoRepository = IRepositoryFactoryOutput<
  typeof createCalendarioAgendamentoRepository
>;
