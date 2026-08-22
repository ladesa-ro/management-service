import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoLinhaDoTempoQuery } from "../../domain/queries/calendario-agendamento-linha-do-tempo.query";
import { ICalendarioAgendamentoLinhaDoTempoQueryHandler } from "../../domain/queries/calendario-agendamento-linha-do-tempo.query.handler.interface";
import { CalendarioAgendamentoLinhaDoTempoQueryResult } from "../../domain/queries/calendario-agendamento-linha-do-tempo.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoLinhaDoTempoQueryHandlerImpl
  implements ICalendarioAgendamentoLinhaDoTempoQueryHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    query: CalendarioAgendamentoLinhaDoTempoQuery,
  ): Promise<CalendarioAgendamentoLinhaDoTempoQueryResult | null> {
    const versoes = await this.repository.getLinhaDoTempo(query.identificadorExterno);

    if (versoes.length === 0) {
      return null;
    }

    const result = new CalendarioAgendamentoLinhaDoTempoQueryResult();
    result.identificadorExterno = query.identificadorExterno;
    result.versoes = versoes;
    return result;
  }
}
