import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import {
  type ICalendarioLetivoCreateCommand,
  ICalendarioLetivoCreateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-create.command.handler.interface";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import { ICalendarioLetivoRepository } from "../../domain/repositories";
import type { CalendarioLetivoFindOneOutputDto } from "../dtos";

@Injectable()
export class CalendarioLetivoCreateCommandHandlerImpl
  implements ICalendarioLetivoCreateCommandHandler
{
  constructor(
    @Inject(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
    @Inject(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
    @Inject(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @Inject(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ICalendarioLetivoCreateCommand): Promise<CalendarioLetivoFindOneOutputDto> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute({
      accessContext,
      dto: { id: dto.campus.id },
    });
    ensureExists(campus, Campus.entityName, dto.campus.id);
    let ofertaFormacaoRef: { id: string } | undefined;
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ofertaFormacao.id },
      });
      ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
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

    ensureExists(result, CalendarioLetivo.entityName, id);

    return result;
  }
}
