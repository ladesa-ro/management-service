import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import {
  type ICalendarioLetivoCreateCommand,
  ICalendarioLetivoCreateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
} from "../../../domain/repositories";
import type { CalendarioLetivoFindOneOutputDto } from "../../dtos";

@Injectable()
export class CalendarioLetivoCreateCommandHandlerImpl
  implements ICalendarioLetivoCreateCommandHandler
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
  }: ICalendarioLetivoCreateCommand): Promise<CalendarioLetivoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("calendario_letivo:create", { dto });

    const campus = await this.campusFindOneHandler.execute({
      accessContext,
      dto: { id: dto.campus.id },
    });
    if (!campus) {
      throw new ResourceNotFoundError("Campus", dto.campus.id);
    }
    let ofertaFormacaoRef: { id: string } | undefined;
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ofertaFormacao.id },
      });
      if (!ofertaFormacao) {
        throw new ResourceNotFoundError("OfertaFormacao", dto.ofertaFormacao.id);
      }
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
