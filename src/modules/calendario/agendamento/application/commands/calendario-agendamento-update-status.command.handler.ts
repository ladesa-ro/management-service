import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import type { CalendarioAgendamentoUpdateStatusCommand } from "../../domain/commands/calendario-agendamento-update-status.command";
import { ICalendarioAgendamentoUpdateStatusCommandHandler } from "../../domain/commands/calendario-agendamento-update-status.command.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoUpdateStatusCommandHandlerImpl
  implements ICalendarioAgendamentoUpdateStatusCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(ICalendarioAgendamentoPermissionChecker)
    private readonly permissionChecker: ICalendarioAgendamentoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoUpdateStatusCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioAgendamento.entityName, dto.id);

    await this.repository.updateStatus(dto.id, dto.status);

    const result = await this.repository.getFindOneQueryResult(accessContext, dto.id);
    ensureExists(result, CalendarioAgendamento.entityName, dto.id);

    return result;
  }
}
