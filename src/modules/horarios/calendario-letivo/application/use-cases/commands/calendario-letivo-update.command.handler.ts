import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CampusService } from "@/modules/ambientes/campus";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.types";
import {
  type ICalendarioLetivoUpdateCommand,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import type { CalendarioLetivoFindOneOutputDto } from "../../dtos";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
} from "../../ports";

@Injectable()
export class CalendarioLetivoUpdateCommandHandlerImpl
  implements ICalendarioLetivoUpdateCommandHandler
{
  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    private readonly repository: ICalendarioLetivoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ICalendarioLetivoUpdateCommand): Promise<CalendarioLetivoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("CalendarioLetivo", dto.id);
    }

    await this.authorizationService.ensurePermission("calendario_letivo:update", { dto }, dto.id);

    const domain = CalendarioLetivo.fromData(current);
    domain.atualizar({ nome: dto.nome, ano: dto.ano });
    const updateData: Partial<PersistInput<ICalendarioLetivo>> = {
      nome: domain.nome,
      ano: domain.ano,
    };
    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      updateData.campus = { id: campus.id };
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        );
        updateData.ofertaFormacao = { id: ofertaFormacao.id };
      } else {
        updateData.ofertaFormacao = null;
      }
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("CalendarioLetivo", dto.id);
    }

    return result;
  }
}
