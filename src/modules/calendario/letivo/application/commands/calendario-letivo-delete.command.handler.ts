import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioLetivo } from "@/modules/calendario/letivo/domain/calendario-letivo";
import { ICalendarioLetivoDeleteCommandHandler } from "@/modules/calendario/letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import type { CalendarioLetivoFindOneQuery } from "@/modules/calendario/letivo/domain/queries";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioLetivoDeleteCommandHandlerImpl
  implements ICalendarioLetivoDeleteCommandHandler
{
  constructor(
    @Dep(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
    @Dep(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);
    ensureExists(aggregate, CalendarioLetivo.entityName, dto.id);
    ensureActiveEntity(aggregate, CalendarioLetivo.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}
