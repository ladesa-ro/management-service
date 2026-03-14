import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CampusService } from "@/modules/ambientes/campus";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import {
  type ICalendarioLetivoCreateCommand,
  ICalendarioLetivoCreateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import type { CalendarioLetivoFindOneOutputDto } from "../../dtos";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
} from "../../ports";

@Injectable()
export class CalendarioLetivoCreateCommandHandlerImpl
  implements ICalendarioLetivoCreateCommandHandler
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
  }: ICalendarioLetivoCreateCommand): Promise<CalendarioLetivoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("calendario_letivo:create", { dto });

    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    let ofertaFormacaoRef: { id: string } | undefined;
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      ofertaFormacaoRef = { id: ofertaFormacao.id };
    }
    const domain = CalendarioLetivo.criar({
      nome: dto.nome,
      ano: dto.ano,
      campus: { id: campus.id },
      ofertaFormacao: ofertaFormacaoRef,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      campus: { id: campus.id },
      ...(ofertaFormacaoRef ? { ofertaFormacao: ofertaFormacaoRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("CalendarioLetivo", id);
    }

    return result;
  }
}
