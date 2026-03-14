import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import {
  type ICalendarioLetivoFindOneQueryHandler,
  ICalendarioLetivoFindOneQueryHandler as ICalendarioLetivoFindOneQueryHandlerToken,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import {
  type IDiaCalendarioUpdateCommand,
  IDiaCalendarioUpdateCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-update.command.handler.interface";
import { DiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario.domain";
import type { IDiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario.types";
import { IDiaCalendarioPermissionChecker } from "../../domain/authorization";
import type { DiaCalendarioFindOneQueryResult } from "../../domain/queries";
import { IDiaCalendarioRepository } from "../../domain/repositories";
@DeclareImplementation()
export class DiaCalendarioUpdateCommandHandlerImpl implements IDiaCalendarioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
    @DeclareDependency(IDiaCalendarioPermissionChecker)
    private readonly permissionChecker: IDiaCalendarioPermissionChecker,
    @DeclareDependency(ICalendarioLetivoFindOneQueryHandlerToken)
    private readonly calendarioLetivoFindOneHandler: ICalendarioLetivoFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiaCalendarioUpdateCommand): Promise<DiaCalendarioFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, DiaCalendario.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = DiaCalendario.fromData(current);
    domain.atualizar({ data: dto.data, diaLetivo: dto.diaLetivo, feriado: dto.feriado });
    const updateData: Partial<PersistInput<IDiaCalendario>> = {
      data: domain.data,
      diaLetivo: domain.diaLetivo,
      feriado: domain.feriado,
    };
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.calendario!.id },
      });
      ensureExists(calendario, CalendarioLetivo.entityName, dto.calendario!.id);
      updateData.calendario = { id: calendario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, DiaCalendario.entityName, dto.id);

    return result;
  }
}
