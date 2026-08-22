import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeAmbientePermissionChecker } from "../../domain/authorization";
import { CalendarioIndisponibilidadeAmbiente } from "../../domain/calendario-indisponibilidade-ambiente";
import { ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler } from "../../domain/commands/calendario-indisponibilidade-ambiente-delete.command.handler.interface";
import type { CalendarioIndisponibilidadeAmbienteFindOneQuery } from "../../domain/queries/calendario-indisponibilidade-ambiente-find-one.query";
import { ICalendarioIndisponibilidadeAmbienteRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeAmbienteDeleteCommandHandlerImpl
  implements ICalendarioIndisponibilidadeAmbienteDeleteCommandHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeAmbienteRepository)
    private readonly repository: ICalendarioIndisponibilidadeAmbienteRepository,
    @Dep(ICalendarioIndisponibilidadeAmbientePermissionChecker)
    private readonly permissionChecker: ICalendarioIndisponibilidadeAmbientePermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeAmbienteFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);
    ensureExists(aggregate, CalendarioIndisponibilidadeAmbiente.entityName, dto.id);
    ensureActiveEntity(aggregate, CalendarioIndisponibilidadeAmbiente.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}
