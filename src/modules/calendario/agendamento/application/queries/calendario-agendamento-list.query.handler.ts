import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoListQuery } from "../../domain/queries/calendario-agendamento-list.query";
import { ICalendarioAgendamentoListQueryHandler } from "../../domain/queries/calendario-agendamento-list.query.handler.interface";
import type { CalendarioAgendamentoListQueryResult } from "../../domain/queries/calendario-agendamento-list.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoListQueryHandlerImpl
  implements ICalendarioAgendamentoListQueryHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoListQuery | null,
  ): Promise<CalendarioAgendamentoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
