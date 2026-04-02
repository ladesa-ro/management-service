import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type CalendarioAgendamentoFindEventosQuery,
  ICalendarioAgendamentoFindEventosQueryHandler,
} from "../../domain/queries/calendario-agendamento-find-eventos.query.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@DeclareImplementation()
export class CalendarioAgendamentoFindEventosQueryHandlerImpl
  implements ICalendarioAgendamentoFindEventosQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioAgendamentoFindEventosQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult[]> {
    return this.repository.getFindEventosQueryResult(accessContext, query);
  }
}
