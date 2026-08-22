import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioIndisponibilidadeAmbientePermissionChecker } from "../../domain/authorization";
import { CalendarioIndisponibilidadeAmbiente } from "../../domain/calendario-indisponibilidade-ambiente";
import type { CalendarioIndisponibilidadeAmbienteCreateCommand } from "../../domain/commands/calendario-indisponibilidade-ambiente-create.command";
import { ICalendarioIndisponibilidadeAmbienteCreateCommandHandler } from "../../domain/commands/calendario-indisponibilidade-ambiente-create.command.handler.interface";
import type { CalendarioIndisponibilidadeAmbienteFindOneQueryResult } from "../../domain/queries/calendario-indisponibilidade-ambiente-find-one.query.result";
import { ICalendarioIndisponibilidadeAmbienteRepository } from "../../domain/repositories";

@Impl()
export class CalendarioIndisponibilidadeAmbienteCreateCommandHandlerImpl
  implements ICalendarioIndisponibilidadeAmbienteCreateCommandHandler
{
  constructor(
    @Dep(ICalendarioIndisponibilidadeAmbienteRepository)
    private readonly repository: ICalendarioIndisponibilidadeAmbienteRepository,
    @Dep(ICalendarioIndisponibilidadeAmbientePermissionChecker)
    private readonly permissionChecker: ICalendarioIndisponibilidadeAmbientePermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioIndisponibilidadeAmbienteCreateCommand,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = CalendarioIndisponibilidadeAmbiente.create({
      ambiente: dto.ambiente,
      tipo: dto.tipo,
      diaSemana: dto.diaSemana,
      data: dto.data,
      inicio: dto.inicio,
      fim: dto.fim,
      motivo: dto.motivo,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioIndisponibilidadeAmbiente.entityName, domain.id);

    return result;
  }
}
