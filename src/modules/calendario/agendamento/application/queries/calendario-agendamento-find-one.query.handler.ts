import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import { ICalendarioAgendamentoFindOneQueryHandler } from "../../domain/queries/calendario-agendamento-find-one.query.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoFindOneQueryHandlerImpl
  implements ICalendarioAgendamentoFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioAgendamentoFindOneQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, query.id);
  }
}
