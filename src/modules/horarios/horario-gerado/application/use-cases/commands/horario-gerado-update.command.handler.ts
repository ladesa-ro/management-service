import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import {
  type IHorarioGeradoUpdateCommand,
  IHorarioGeradoUpdateCommandHandler,
} from "@/modules/horarios/horario-gerado/domain/commands/horario-gerado-update.command.handler.interface";
import { HorarioGerado } from "@/modules/horarios/horario-gerado/domain/horario-gerado.domain";
import type { IHorarioGerado } from "@/modules/horarios/horario-gerado/domain/horario-gerado.types";
import type { HorarioGeradoFindOneOutputDto } from "../../dtos";
import { HORARIO_GERADO_REPOSITORY_PORT, type IHorarioGeradoRepositoryPort } from "../../ports";

@Injectable()
export class HorarioGeradoUpdateCommandHandlerImpl implements IHorarioGeradoUpdateCommandHandler {
  constructor(
    @Inject(HORARIO_GERADO_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IHorarioGeradoUpdateCommand): Promise<HorarioGeradoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("HorarioGerado", dto.id);
    }

    await this.authorizationService.ensurePermission("horario_gerado:update", { dto }, dto.id);

    const domain = HorarioGerado.fromData(current);
    domain.atualizar({
      status: dto.status,
      tipo: dto.tipo,
      dataGeracao: dto.dataGeracao,
      vigenciaInicio: dto.vigenciaInicio,
      vigenciaFim: dto.vigenciaFim,
    });
    const updateData: Partial<PersistInput<IHorarioGerado>> = {
      status: domain.status,
      tipo: domain.tipo,
      dataGeracao: domain.dataGeracao,
      vigenciaInicio: domain.vigenciaInicio,
      vigenciaFim: domain.vigenciaFim,
    };
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      updateData.calendario = { id: calendario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("HorarioGerado", dto.id);
    }

    return result;
  }
}
