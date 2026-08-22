import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeProfessorPermissionChecker } from "../../domain/authorization";
import { CalendarioIndisponibilidadeProfessor } from "../../domain/calendario-indisponibilidade-professor";
import type { CalendarioIndisponibilidadeProfessorCreateCommand } from "../../domain/commands/calendario-indisponibilidade-professor-create.command";
import { ICalendarioIndisponibilidadeProfessorCreateCommandHandler } from "../../domain/commands/calendario-indisponibilidade-professor-create.command.handler.interface";
import type { CalendarioIndisponibilidadeProfessorFindOneQueryResult } from "../../domain/queries/calendario-indisponibilidade-professor-find-one.query.result";
import { ICalendarioIndisponibilidadeProfessorRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeProfessorCreateCommandHandlerImpl
  implements ICalendarioIndisponibilidadeProfessorCreateCommandHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeProfessorRepository)
    private readonly repository: ICalendarioIndisponibilidadeProfessorRepository,
    @Dep(ICalendarioIndisponibilidadeProfessorPermissionChecker)
    private readonly permissionChecker: ICalendarioIndisponibilidadeProfessorPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeProfessorCreateCommand,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = CalendarioIndisponibilidadeProfessor.create({
      perfil: dto.perfil,
      tipo: dto.tipo,
      diaSemana: dto.diaSemana,
      data: dto.data,
      inicio: dto.inicio,
      fim: dto.fim,
      motivo: dto.motivo,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioIndisponibilidadeProfessor.entityName, domain.id);

    return result;
  }
}
