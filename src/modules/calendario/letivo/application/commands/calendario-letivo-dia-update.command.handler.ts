import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import { CalendarioLetivoDia } from "../../domain/calendario-letivo-dia";
import type { CalendarioLetivoDiaUpdateCommand } from "../../domain/commands/calendario-letivo-dia-update.command";
import { ICalendarioLetivoDiaUpdateCommandHandler } from "../../domain/commands/calendario-letivo-dia-update.command.handler.interface";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoDiaRepository } from "../../domain/repositories";

@Impl()
export class CalendarioLetivoDiaUpdateCommandHandlerImpl
  implements ICalendarioLetivoDiaUpdateCommandHandler
{
  constructor(
    @Dep(ICalendarioLetivoDiaRepository)
    private readonly repository: ICalendarioLetivoDiaRepository,
    @Dep(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoDiaFindOneQuery & CalendarioLetivoDiaUpdateCommand,
  ): Promise<CalendarioLetivoDiaFindOneQueryResult> {
    let domain: CalendarioLetivoDia | null = null;

    if (dto.calendarioLetivoId && dto.data) {
      // Busca via query result e depois carrega pelo id encontrado
      const found = await this.repository.findByCalendarioAndDate(
        accessContext,
        dto.calendarioLetivoId,
        dto.data,
      );
      ensureExists(found, CalendarioLetivoDia.entityName, dto.data);
      domain = await this.repository.loadById(accessContext, found.id);
    } else {
      domain = await this.repository.loadById(accessContext, dto.id);
    }

    ensureExists(domain, CalendarioLetivoDia.entityName, dto.id ?? dto.data);
    ensureActiveEntity(domain, CalendarioLetivoDia.entityName, domain.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, domain.id);

    domain.update({
      diaLetivo: dto.diaLetivo,
      feriado: dto.feriado,
      diaPresencial: dto.diaPresencial,
      tipo: dto.tipo,
      extraCurricular: dto.extraCurricular,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioLetivoDia.entityName, domain.id);

    return result;
  }
}
