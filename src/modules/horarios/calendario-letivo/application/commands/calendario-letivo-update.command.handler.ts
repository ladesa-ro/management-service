import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.types";
import {
  type ICalendarioLetivoUpdateCommand,
  ICalendarioLetivoUpdateCommandHandler,
} from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import { ICalendarioLetivoRepository } from "../../domain/repositories";
import type { CalendarioLetivoFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class CalendarioLetivoUpdateCommandHandlerImpl
  implements ICalendarioLetivoUpdateCommandHandler
{
  constructor(
    @DeclareDependency(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
    @DeclareDependency(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @DeclareDependency(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ICalendarioLetivoUpdateCommand): Promise<CalendarioLetivoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, CalendarioLetivo.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

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
      ensureExists(campus, Campus.entityName, dto.campus.id);
      updateData.campus = { id: campus.id };
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
          accessContext,
          dto: { id: dto.ofertaFormacao.id },
        });
        ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
        updateData.ofertaFormacao = { id: ofertaFormacao.id };
      } else {
        updateData.ofertaFormacao = null;
      }
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, CalendarioLetivo.entityName, dto.id);

    return result;
  }
}
