import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { getNowISO } from "@/utils/date";
import { ICalendarioSolicitacaoMudancaPermissionChecker } from "../../domain/authorization";
import { CalendarioSolicitacaoMudanca } from "../../domain/calendario-solicitacao-mudanca";
import { CalendarioSolicitacaoMudancaStatus } from "../../domain/calendario-solicitacao-mudanca.types";
import type { CalendarioSolicitacaoMudancaRecusarCommand } from "../../domain/commands/calendario-solicitacao-mudanca-recusar.command";
import { ICalendarioSolicitacaoMudancaRecusarCommandHandler } from "../../domain/commands/calendario-solicitacao-mudanca-recusar.command.handler.interface";
import type { CalendarioSolicitacaoMudancaFindOneQuery } from "../../domain/queries/calendario-solicitacao-mudanca-find-one.query";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "../../domain/queries/calendario-solicitacao-mudanca-find-one.query.result";
import { ICalendarioSolicitacaoMudancaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioSolicitacaoMudancaRecusarCommandHandlerImpl
  implements ICalendarioSolicitacaoMudancaRecusarCommandHandler
{
  constructor(
    @Dep(ICalendarioSolicitacaoMudancaRepository)
    private readonly repository: ICalendarioSolicitacaoMudancaRepository,
    @Dep(ICalendarioSolicitacaoMudancaPermissionChecker)
    private readonly permissionChecker: ICalendarioSolicitacaoMudancaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioSolicitacaoMudancaFindOneQuery & CalendarioSolicitacaoMudancaRecusarCommand,
  ): Promise<CalendarioSolicitacaoMudancaFindOneQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const solicitacao = await this.repository.loadById(accessContext, dto.id);
    ensureExists(solicitacao, CalendarioSolicitacaoMudanca.entityName, dto.id);

    if (solicitacao.status !== CalendarioSolicitacaoMudancaStatus.ABERTA) {
      throw new BadRequestException(
        `Solicitação ${dto.id} não está aberta. Status atual: ${solicitacao.status}.`,
      );
    }

    solicitacao.status = CalendarioSolicitacaoMudancaStatus.RECUSADA;
    solicitacao.motivoRecusa = dto.motivoRecusa ?? null;
    solicitacao.dateUpdated = getNowISO();
    await this.repository.save(solicitacao);

    const result = await this.repository.getFindOneQueryResult(accessContext, {
      id: solicitacao.id,
    });
    ensureExists(result, CalendarioSolicitacaoMudanca.entityName, solicitacao.id);

    return result;
  }
}
