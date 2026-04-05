import { PaginationQueryResult } from "@/domain/abstractions";
import { CalendarioAgendamentoFindOneQueryResult } from "./calendario-agendamento-find-one.query.result";

export class CalendarioAgendamentoListQueryResult extends PaginationQueryResult<CalendarioAgendamentoFindOneQueryResult> {}
