import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoListQuery } from "../../domain/queries/calendario-agendamento-list.query";
import { ICalendarioAgendamentoListQueryHandler } from "../../domain/queries/calendario-agendamento-list.query.handler.interface";
import type { CalendarioAgendamentoListQueryResult } from "../../domain/queries/calendario-agendamento-list.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoVisibilidadeService } from "../authorization/calendario-agendamento-visibilidade.service";

@Impl()
export class CalendarioAgendamentoListQueryHandlerImpl
  implements ICalendarioAgendamentoListQueryHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(CalendarioAgendamentoVisibilidadeService)
    private readonly visibilidadeService: CalendarioAgendamentoVisibilidadeService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoListQuery | null,
  ): Promise<CalendarioAgendamentoListQueryResult> {
    const resultado = await this.repository.getFindAllQueryResult(accessContext, dto);

    resultado.data = await this.visibilidadeService.aplicarVisibilidadeMuitos(
      accessContext,
      resultado.data,
    );

    return resultado;
  }
}
