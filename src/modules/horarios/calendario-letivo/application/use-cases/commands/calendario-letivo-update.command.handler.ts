import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.types";
import {
  type ICalendarioLetivoUpdateCommand,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
} from "../../../domain/repositories";
import type { CalendarioLetivoFindOneOutputDto } from "../../dtos";

@Injectable()
export class CalendarioLetivoUpdateCommandHandlerImpl
  implements ICalendarioLetivoUpdateCommandHandler
{
  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    private readonly repository: ICalendarioLetivoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @Inject(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
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
      const campus = await this.campusFindOneHandler.execute({
        accessContext,
        dto: { id: dto.campus.id },
      });
      if (!campus) {
        throw new ResourceNotFoundError("Campus", dto.campus.id);
      }
      updateData.campus = { id: campus.id };
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
          accessContext,
          dto: { id: dto.ofertaFormacao.id },
        });
        if (!ofertaFormacao) {
          throw new ResourceNotFoundError("OfertaFormacao", dto.ofertaFormacao.id);
        }
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
