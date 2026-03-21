import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoOfertaFormacaoEntity } from "./calendario-agendamento-oferta-formacao.typeorm.entity";

export const createCalendarioAgendamentoOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoOfertaFormacaoEntity).extend({});
});

export type CalendarioAgendamentoOfertaFormacaoRepository = IRepositoryFactoryOutput<
  typeof createCalendarioAgendamentoOfertaFormacaoRepository
>;
