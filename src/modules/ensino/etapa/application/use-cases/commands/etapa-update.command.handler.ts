import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IEtapaUpdateCommand,
  IEtapaUpdateCommandHandler,
} from "@/modules/ensino/etapa/domain/commands/etapa-update.command.handler.interface";
import { Etapa } from "@/modules/ensino/etapa/domain/etapa.domain";
import type { IEtapa } from "@/modules/ensino/etapa/domain/etapa.types";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import type { EtapaFindOneOutputDto } from "../../dtos";
import { ETAPA_REPOSITORY_PORT, type IEtapaRepositoryPort } from "../../ports";

@Injectable()
export class EtapaUpdateCommandHandlerImpl implements IEtapaUpdateCommandHandler {
  constructor(
    @Inject(ETAPA_REPOSITORY_PORT)
    private readonly repository: IEtapaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async execute({ accessContext, dto }: IEtapaUpdateCommand): Promise<EtapaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Etapa", dto.id);
    }

    await this.authorizationService.ensurePermission("etapa:update", { dto }, dto.id);

    const domain = Etapa.fromData(current);
    domain.atualizar({
      numero: dto.numero,
      cor: dto.cor,
      dataInicio: dto.dataInicio,
      dataTermino: dto.dataTermino,
    });
    const updateData: Partial<PersistInput<IEtapa>> = {
      numero: domain.numero,
      cor: domain.cor,
      dataInicio: domain.dataInicio,
      dataTermino: domain.dataTermino,
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
      throw new ResourceNotFoundError("Etapa", dto.id);
    }

    return result;
  }
}
