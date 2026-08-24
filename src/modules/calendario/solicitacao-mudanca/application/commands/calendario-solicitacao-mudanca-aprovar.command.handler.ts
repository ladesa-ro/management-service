import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
import type { HorarioEdicaoMudancaTipoOperacao } from "@/modules/calendario/horario-edicao/domain/horario-edicao.types";
import { HorarioEdicaoSessaoStatus } from "@/modules/calendario/horario-edicao/domain/horario-edicao.types";
import { IHorarioEdicaoMudancaRepository } from "@/modules/calendario/horario-edicao/domain/repositories/horario-edicao-mudanca.repository.interface";
import { IHorarioEdicaoSessaoRepository } from "@/modules/calendario/horario-edicao/domain/repositories/horario-edicao-sessao.repository.interface";
import { getNowISO } from "@/utils/date";
import { ICalendarioSolicitacaoMudancaPermissionChecker } from "../../domain/authorization";
import { CalendarioSolicitacaoMudanca } from "../../domain/calendario-solicitacao-mudanca";
import { CalendarioSolicitacaoMudancaStatus } from "../../domain/calendario-solicitacao-mudanca.types";
import type {
  ICalendarioSolicitacaoMudancaAprovarCommandHandler,
  ICalendarioSolicitacaoMudancaAprovarResult,
} from "../../domain/commands/calendario-solicitacao-mudanca-aprovar.command.handler.interface";
import type { CalendarioSolicitacaoMudancaFindOneQuery } from "../../domain/queries/calendario-solicitacao-mudanca-find-one.query";
import { ICalendarioSolicitacaoMudancaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioSolicitacaoMudancaAprovarCommandHandlerImpl
  implements ICalendarioSolicitacaoMudancaAprovarCommandHandler
{
  constructor(
    @Dep(ICalendarioSolicitacaoMudancaRepository)
    private readonly repository: ICalendarioSolicitacaoMudancaRepository,
    @Dep(ICalendarioSolicitacaoMudancaPermissionChecker)
    private readonly permissionChecker: ICalendarioSolicitacaoMudancaPermissionChecker,
    @Dep(IHorarioEdicaoSessaoRepository)
    private readonly sessaoRepository: IHorarioEdicaoSessaoRepository,
    @Dep(IHorarioEdicaoMudancaRepository)
    private readonly mudancaRepository: IHorarioEdicaoMudancaRepository,
    @Dep(ICalendarioAgendamentoRepository)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioSolicitacaoMudancaFindOneQuery,
  ): Promise<ICalendarioSolicitacaoMudancaAprovarResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const solicitacao = await this.repository.loadById(accessContext, dto.id);
    ensureExists(solicitacao, CalendarioSolicitacaoMudanca.entityName, dto.id);

    if (solicitacao.status !== CalendarioSolicitacaoMudancaStatus.ABERTA) {
      throw new BadRequestException(
        `Solicitação ${dto.id} não está aberta. Status atual: ${solicitacao.status}.`,
      );
    }

    const dadosAnteriores = await this.capturarEstadoAtual(solicitacao.calendarioAgendamentoId);

    const sessao = await this.sessaoRepository.save({
      id: generateUuidV7(),
      status: HorarioEdicaoSessaoStatus.ABERTA,
      usuario: { id: accessContext?.requestActor?.id ?? "" },
      dateCreated: getNowISO(),
      dateUpdated: getNowISO(),
    });

    await this.mudancaRepository.save({
      id: generateUuidV7(),
      sessao: { id: sessao.id },
      calendarioAgendamento: { id: solicitacao.calendarioAgendamentoId },
      tipoOperacao: solicitacao.tipoOperacao as unknown as HorarioEdicaoMudancaTipoOperacao,
      dados: solicitacao.dadosPropostos,
      dadosAnteriores,
      dateCreated: getNowISO(),
    });

    solicitacao.status = CalendarioSolicitacaoMudancaStatus.APROVADA;
    solicitacao.sessaoEdicaoId = sessao.id;
    solicitacao.dateUpdated = getNowISO();
    await this.repository.save(solicitacao);

    const result = await this.repository.getFindOneQueryResult(accessContext, {
      id: solicitacao.id,
    });
    ensureExists(result, CalendarioSolicitacaoMudanca.entityName, solicitacao.id);

    return { solicitacao: result, sessaoEdicaoId: sessao.id };
  }

  private async capturarEstadoAtual(
    calendarioAgendamentoId: string,
  ): Promise<Record<string, unknown> | null> {
    const atual = await this.calendarioAgendamentoRepository.getFindOneQueryResult(
      null,
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
