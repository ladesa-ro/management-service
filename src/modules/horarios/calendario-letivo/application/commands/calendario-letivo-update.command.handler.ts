import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import {
  CalendarioLetivo,
  type ICalendarioLetivo,
} from "@/modules/horarios/calendario-letivo/domain/calendario-letivo";
import type { CalendarioLetivoUpdateCommand } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command";
import { ICalendarioLetivoUpdateCommandHandler } from "@/modules/horarios/calendario-letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import type { CalendarioLetivoFindOneQuery } from "@/modules/horarios/calendario-letivo/domain/queries";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import type { CalendarioLetivoFindOneQueryResult } from "../../domain/queries";
import { ICalendarioLetivoRepository } from "../../domain/repositories";

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

  async execute(
    accessContext: AccessContext | null,
    dto: CalendarioLetivoFindOneQuery & CalendarioLetivoUpdateCommand,
  ): Promise<CalendarioLetivoFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, CalendarioLetivo.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = CalendarioLetivo.load(current);
    domain.update({ nome: dto.nome, ano: dto.ano });
    const updateData: Partial<PersistInput<ICalendarioLetivo>> = { ...domain };
    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
      ensureExists(campus, Campus.entityName, dto.campus.id);
      updateData.campus = { id: campus.id };
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
          id: dto.ofertaFormacao.id,
        });
        ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
        updateData.ofertaFormacao = { id: ofertaFormacao.id };
      } else {
        updateData.ofertaFormacao = null;
      }
    }
    await this.repository.update(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, CalendarioLetivo.entityName, dto.id);

    return result;
  }
}
