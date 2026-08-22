import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import { ICalendarioAgendamentoFindOneQueryHandler } from "../../domain/queries/calendario-agendamento-find-one.query.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoVisibilidadeService } from "../authorization/calendario-agendamento-visibilidade.service";

@Impl()
export class CalendarioAgendamentoFindOneQueryHandlerImpl
  implements ICalendarioAgendamentoFindOneQueryHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(CalendarioAgendamentoVisibilidadeService)
    private readonly visibilidadeService: CalendarioAgendamentoVisibilidadeService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioAgendamentoFindOneQuery,
  ): Promise<CalendarioAgendamentoFindOneQueryResult | null> {
    const resultado = await this.repository.getFindOneQueryResult(accessContext, query.id);
    if (!resultado) return null;

    // null aqui significa "sem acesso" — tratado como não encontrado, não como
    // erro de permissão, pra não confirmar a existência do registro pra quem
    // não pode vê-lo.
    return this.visibilidadeService.aplicarVisibilidadeUm(accessContext, resultado);
  }
}
