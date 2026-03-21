import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import { CalendarioLetivoDia, type ICalendarioLetivoDia } from "../../domain/calendario-letivo-dia";
import type { CalendarioLetivoDiaUpdateCommand } from "../../domain/commands/calendario-letivo-dia-update.command";
import { ICalendarioLetivoDiaUpdateCommandHandler } from "../../domain/commands/calendario-letivo-dia-update.command.handler.interface";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
} from "../../domain/queries";
import { ICalendarioLetivoDiaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CalendarioLetivoDiaUpdateCommandHandlerImpl
  implements ICalendarioLetivoDiaUpdateCommandHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoDiaRepository)
    private readonly repository: ICalendarioLetivoDiaRepository,
    @DeclareDependency(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: CalendarioLetivoDiaFindOneQuery & CalendarioLetivoDiaUpdateCommand,
  ): Promise<CalendarioLetivoDiaFindOneQueryResult> {
    let current: CalendarioLetivoDiaFindOneQueryResult | null;

    if (dto.calendarioLetivoId && dto.data) {
      current = await this.repository.findByCalendarioAndDate(
        accessContext,
        dto.calendarioLetivoId,
        dto.data,
      );
    } else {
      current = await this.repository.findById(accessContext, { id: dto.id });
    }

    ensureExists(current, CalendarioLetivoDia.entityName, dto.id ?? dto.data);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, current.id);

    const domain = CalendarioLetivoDia.load(current);
    domain.update({
      diaLetivo: dto.diaLetivo,
      feriado: dto.feriado,
      diaPresencial: dto.diaPresencial,
      tipo: dto.tipo,
      extraCurricular: dto.extraCurricular,
    });

    const updateData: Partial<PersistInput<ICalendarioLetivoDia>> = { ...domain };
    await this.repository.update(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: current.id });
    ensureExists(result, CalendarioLetivoDia.entityName, current.id);

    return result;
  }
}
