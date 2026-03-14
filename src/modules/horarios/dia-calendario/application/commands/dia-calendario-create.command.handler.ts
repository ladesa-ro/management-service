import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import {
  type ICalendarioLetivoFindOneQueryHandler,
  ICalendarioLetivoFindOneQueryHandler as ICalendarioLetivoFindOneQueryHandlerToken,
} from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import {
  type IDiaCalendarioCreateCommand,
  IDiaCalendarioCreateCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-create.command.handler.interface";
import { DiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario.domain";
import { IDiaCalendarioPermissionChecker } from "../../domain/authorization";
import type { DiaCalendarioFindOneQueryResult } from "../../domain/queries";
import { IDiaCalendarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiaCalendarioCreateCommandHandlerImpl implements IDiaCalendarioCreateCommandHandler {
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
  }: IDiaCalendarioCreateCommand): Promise<DiaCalendarioFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.calendario.id },
      });
      ensureExists(calendario, CalendarioLetivo.entityName, dto.calendario.id);
      calendarioRef = { id: calendario.id };
    }
    const domain = DiaCalendario.criar({
      data: dto.data,
      diaLetivo: dto.diaLetivo,
      feriado: dto.feriado,
      tipo: dto.tipo,
      diaPresencial: dto.diaPresencial,
      extraCurricular: dto.extraCurricular,
      calendario: calendarioRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, DiaCalendario.entityName, id);

    return result;
  }
}
