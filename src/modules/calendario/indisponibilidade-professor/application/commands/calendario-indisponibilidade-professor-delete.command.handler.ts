import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeProfessorPermissionChecker } from "../../domain/authorization";
import { CalendarioIndisponibilidadeProfessor } from "../../domain/calendario-indisponibilidade-professor";
import { ICalendarioIndisponibilidadeProfessorDeleteCommandHandler } from "../../domain/commands/calendario-indisponibilidade-professor-delete.command.handler.interface";
import type { CalendarioIndisponibilidadeProfessorFindOneQuery } from "../../domain/queries/calendario-indisponibilidade-professor-find-one.query";
import { ICalendarioIndisponibilidadeProfessorRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeProfessorDeleteCommandHandlerImpl
  implements ICalendarioIndisponibilidadeProfessorDeleteCommandHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeProfessorRepository)
    private readonly repository: ICalendarioIndisponibilidadeProfessorRepository,
    @Dep(ICalendarioIndisponibilidadeProfessorPermissionChecker)
    private readonly permissionChecker: ICalendarioIndisponibilidadeProfessorPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeProfessorFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);
    ensureExists(aggregate, CalendarioIndisponibilidadeProfessor.entityName, dto.id);
    ensureActiveEntity(aggregate, CalendarioIndisponibilidadeProfessor.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}
