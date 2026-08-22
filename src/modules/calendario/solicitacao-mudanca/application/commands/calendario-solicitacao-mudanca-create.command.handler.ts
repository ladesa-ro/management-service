import { UnauthorizedException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
import { ICalendarioSolicitacaoMudancaPermissionChecker } from "../../domain/authorization";
import { CalendarioSolicitacaoMudanca } from "../../domain/calendario-solicitacao-mudanca";
import type { CalendarioSolicitacaoMudancaCreateCommand } from "../../domain/commands/calendario-solicitacao-mudanca-create.command";
import { ICalendarioSolicitacaoMudancaCreateCommandHandler } from "../../domain/commands/calendario-solicitacao-mudanca-create.command.handler.interface";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "../../domain/queries/calendario-solicitacao-mudanca-find-one.query.result";
import { ICalendarioSolicitacaoMudancaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioSolicitacaoMudancaCreateCommandHandlerImpl
  implements ICalendarioSolicitacaoMudancaCreateCommandHandler
{
  constructor(
    @Dep(ICalendarioSolicitacaoMudancaRepository)
    private readonly repository: ICalendarioSolicitacaoMudancaRepository,
    @Dep(ICalendarioSolicitacaoMudancaPermissionChecker)
    private readonly permissionChecker: ICalendarioSolicitacaoMudancaPermissionChecker,
    @Dep(ICalendarioAgendamentoRepository)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioSolicitacaoMudancaCreateCommand,
  ): Promise<CalendarioSolicitacaoMudancaFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    if (!accessContext?.requestActor?.id) {
      throw new UnauthorizedException(
        "É necessário estar autenticado para criar uma solicitação de mudança.",
      );
    }

    const agendamento = await this.calendarioAgendamentoRepository.getFindOneQueryResult(
      accessContext,
      dto.calendarioAgendamentoId,
    );
    ensureExists(agendamento, "CalendarioAgendamento", dto.calendarioAgendamentoId);

    const domain = CalendarioSolicitacaoMudanca.create({
      autor: { id: accessContext.requestActor.id },
      calendarioAgendamentoId: dto.calendarioAgendamentoId,
      tipoOperacao: dto.tipoOperacao,
      dadosPropostos: dto.dadosPropostos,
      justificativa: dto.justificativa,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioSolicitacaoMudanca.entityName, domain.id);

    return result;
  }
}
