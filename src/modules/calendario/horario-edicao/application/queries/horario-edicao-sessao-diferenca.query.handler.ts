import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
import {
  HorarioEdicaoMudancaTipoOperacao,
  type IHorarioEdicaoMudanca,
} from "../../domain/horario-edicao.types";
import type { HorarioEdicaoSessaoDiferencaQuery } from "../../domain/queries/horario-edicao-sessao-diferenca.query";
import { IHorarioEdicaoSessaoDiferencaQueryHandler } from "../../domain/queries/horario-edicao-sessao-diferenca.query.handler.interface";
import { HorarioEdicaoSessaoDiferencaQueryResult } from "../../domain/queries/horario-edicao-sessao-diferenca.query.result";
import { IHorarioEdicaoMudancaRepository } from "../../domain/repositories/horario-edicao-mudanca.repository.interface";
import { IHorarioEdicaoSessaoRepository } from "../../domain/repositories/horario-edicao-sessao.repository.interface";

@Impl()
export class HorarioEdicaoSessaoDiferencaQueryHandlerImpl
  implements IHorarioEdicaoSessaoDiferencaQueryHandler
{
  constructor(
    @Dep(IHorarioEdicaoSessaoRepository)
    private readonly sessaoRepository: IHorarioEdicaoSessaoRepository,
    @Dep(IHorarioEdicaoMudancaRepository)
    private readonly mudancaRepository: IHorarioEdicaoMudancaRepository,
    @Dep(ICalendarioAgendamentoRepository)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: HorarioEdicaoSessaoDiferencaQuery,
  ): Promise<HorarioEdicaoSessaoDiferencaQueryResult> {
    const sessao = await this.sessaoRepository.findById(query.sessaoId);
    ensureExists(sessao, "HorarioEdicaoSessao", query.sessaoId);

    const mudancas = await this.mudancaRepository.findBySessaoId(query.sessaoId);

    const resultado = new HorarioEdicaoSessaoDiferencaQueryResult();
    resultado.sessaoId = query.sessaoId;
    resultado.entram = [];
    resultado.saem = [];
    resultado.mudam = [];

    for (const mudanca of mudancas) {
      switch (mudanca.tipoOperacao) {
        case HorarioEdicaoMudancaTipoOperacao.CRIAR:
          resultado.entram.push({
            mudancaId: mudanca.id,
            tipoOperacao: HorarioEdicaoMudancaTipoOperacao.CRIAR,
            calendarioAgendamentoId: mudanca.calendarioAgendamento?.id ?? null,
            antes: null,
            depois: mudanca.dados,
          });
          break;

        case HorarioEdicaoMudancaTipoOperacao.REMOVER:
          resultado.saem.push({
            mudancaId: mudanca.id,
            tipoOperacao: HorarioEdicaoMudancaTipoOperacao.REMOVER,
            calendarioAgendamentoId: mudanca.calendarioAgendamento?.id ?? null,
            antes: await this.resolverEstadoAnterior(accessContext, mudanca),
            depois: null,
          });
          break;

        case HorarioEdicaoMudancaTipoOperacao.MOVER:
          resultado.mudam.push({
            mudancaId: mudanca.id,
            tipoOperacao: HorarioEdicaoMudancaTipoOperacao.MOVER,
            calendarioAgendamentoId: mudanca.calendarioAgendamento?.id ?? null,
            antes: await this.resolverEstadoAnterior(accessContext, mudanca),
            depois: mudanca.dados,
          });
          break;
      }
    }

    return resultado;
  }

  private async resolverEstadoAnterior(
    accessContext: IAccessContext | null,
    mudanca: IHorarioEdicaoMudanca,
  ): Promise<Record<string, unknown> | null> {
    if (mudanca.dadosAnteriores) return mudanca.dadosAnteriores;

    const calendarioAgendamentoId = mudanca.calendarioAgendamento?.id;
    if (!calendarioAgendamentoId) return null;

    const atual = await this.calendarioAgendamentoRepository.getFindOneQueryResult(
      accessContext,
      calendarioAgendamentoId,
    );
    if (!atual) return null;

    return {
      nome: atual.nome,
      cor: atual.cor,
      dataInicio: atual.dataInicio,
      dataFim: atual.dataFim,
      horarioInicio: atual.horarioInicio,
      horarioFim: atual.horarioFim,
      diaInteiro: atual.diaInteiro,
    };
  }
}
