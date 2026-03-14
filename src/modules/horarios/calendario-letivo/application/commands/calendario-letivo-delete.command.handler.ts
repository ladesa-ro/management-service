import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import {
  type ICalendarioLetivoDeleteCommand,
  ICalendarioLetivoDeleteCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-delete.command.handler.interface";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CalendarioLetivoDeleteCommandHandlerImpl
  implements ICalendarioLetivoDeleteCommandHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
    @DeclareDependency(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: ICalendarioLetivoDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, CalendarioLetivo.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
