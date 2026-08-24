import { ForbiddenException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { CalendarioAgendamentoLinhaDoTempoQuery } from "../../domain/queries/calendario-agendamento-linha-do-tempo.query";
import { ICalendarioAgendamentoLinhaDoTempoQueryHandler } from "../../domain/queries/calendario-agendamento-linha-do-tempo.query.handler.interface";
import { CalendarioAgendamentoLinhaDoTempoQueryResult } from "../../domain/queries/calendario-agendamento-linha-do-tempo.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoVisibilidadeService } from "../authorization/calendario-agendamento-visibilidade.service";

@Impl()
export class CalendarioAgendamentoLinhaDoTempoQueryHandlerImpl
  implements ICalendarioAgendamentoLinhaDoTempoQueryHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(CalendarioAgendamentoVisibilidadeService)
    private readonly visibilidadeService: CalendarioAgendamentoVisibilidadeService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: CalendarioAgendamentoLinhaDoTempoQuery,
  ): Promise<CalendarioAgendamentoLinhaDoTempoQueryResult | null> {
    const { colecaoId, versoes } = await this.repository.getLinhaDoTempo(
      query.identificadorExterno,
    );

    if (versoes.length === 0) {
      return null;
    }

    const visibilidade = await this.visibilidadeService.resolver(accessContext, colecaoId);

    if (!this.visibilidadeService.temAlgumAcesso(visibilidade)) {
      return null;
    }

    if (!this.visibilidadeService.podeVerDetalhes(visibilidade)) {
      throw new ForbiddenException(
        "Linha do tempo expõe motivo e histórico completo; papel OCUPACAO não tem acesso a este nível de detalhe.",
      );
    }

    const result = new CalendarioAgendamentoLinhaDoTempoQueryResult();
    result.identificadorExterno = query.identificadorExterno;
    result.colecaoId = colecaoId;
    result.versoes = versoes;
    return result;
  }
}
