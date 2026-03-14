import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists, IAuthorizationService, type PersistInput } from "@/modules/@shared";
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
import { IDiaCalendarioRepository } from "../../../domain/repositories";
import type { DiaCalendarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiaCalendarioUpdateCommandHandlerImpl implements IDiaCalendarioUpdateCommandHandler {
  constructor(
    @Inject(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(ICalendarioLetivoFindOneQueryHandlerToken)
    private readonly calendarioLetivoFindOneHandler: ICalendarioLetivoFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiaCalendarioUpdateCommand): Promise<DiaCalendarioFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, "DiaCalendario", dto.id);

    await this.authorizationService.ensurePermission("dia_calendario:update", { dto }, dto.id);

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
      ensureExists(calendario, "CalendarioLetivo", dto.calendario!.id);
      updateData.calendario = { id: calendario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, "DiaCalendario", dto.id);

    return result;
  }
}
