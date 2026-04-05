import { has } from "lodash";
import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { CalendarioLetivo } from "@/modules/calendario/letivo/domain/calendario-letivo";
import { validateEtapasNaoSobrepostas } from "@/modules/calendario/letivo/domain/calendario-letivo-etapa.validators";
import type { CalendarioLetivoUpdateCommand } from "@/modules/calendario/letivo/domain/commands/calendario-letivo-update.command";
import { ICalendarioLetivoUpdateCommandHandler } from "@/modules/calendario/letivo/domain/commands/calendario-letivo-update.command.handler.interface";
import type { CalendarioLetivoFindOneQuery } from "@/modules/calendario/letivo/domain/queries";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { getNowISO } from "@/utils/date";
import { ICalendarioLetivoPermissionChecker } from "../../domain/authorization";
import type { CalendarioLetivoFindOneQueryResult } from "../../domain/queries";
import {
  ICalendarioLetivoEtapaRepository,
  ICalendarioLetivoRepository,
} from "../../domain/repositories";

@Impl()
export class CalendarioLetivoUpdateCommandHandlerImpl
  implements ICalendarioLetivoUpdateCommandHandler
{
  constructor(
    @Dep(ICalendarioLetivoRepository)
    private readonly repository: ICalendarioLetivoRepository,
    @Dep(ICalendarioLetivoPermissionChecker)
    private readonly permissionChecker: ICalendarioLetivoPermissionChecker,
    @Dep(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @Dep(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
    @Dep(ICalendarioLetivoEtapaRepository)
    private readonly etapaRepository: ICalendarioLetivoEtapaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioLetivoFindOneQuery & CalendarioLetivoUpdateCommand,
  ): Promise<CalendarioLetivoFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioLetivo.entityName, dto.id);
    ensureActiveEntity(domain, CalendarioLetivo.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    domain.update({ nome: dto.nome, ano: dto.ano, situacao: dto.situacao });

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
      ensureExists(campus, Campus.entityName, dto.campus.id);
      domain.campus = { id: campus.id } as CalendarioLetivo["campus"];
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
          id: dto.ofertaFormacao.id,
        });
        ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
        domain.ofertaFormacao = { id: ofertaFormacao.id } as CalendarioLetivo["ofertaFormacao"];
      } else {
        domain.ofertaFormacao = null;
      }
    }

    await this.repository.save(domain);

    if (has(dto, "etapas")) {
      const etapas = dto.etapas ?? [];

      if (etapas.length > 0) {
        validateEtapasNaoSobrepostas(etapas);
      }

      await this.etapaRepository.softDeleteByCalendarioLetivoId(dto.id);

      const now = getNowISO();

      for (const item of etapas) {
        const snapshot = await this.etapaRepository.findOfertaFormacaoPeriodoEtapaSnapshot(
          item.ofertaFormacaoPeriodoEtapaId,
        );
        ensureExists(snapshot, "OfertaFormacaoPeriodoEtapa", item.ofertaFormacaoPeriodoEtapaId);

        await this.etapaRepository.save({
          id: generateUuidV7(),
          identificadorExterno: generateUuidV7(),
          calendarioLetivo: { id: dto.id },
          ofertaFormacaoPeriodoEtapa: { id: item.ofertaFormacaoPeriodoEtapaId },
          nome: snapshot.nome,
          cor: snapshot.cor ?? "",
          ordem: snapshot.ordem,
          numeroPeriodo: snapshot.numeroPeriodo,
          dataInicio: item.dataInicio,
          dataTermino: item.dataTermino,
          version: 1,
          previousVersionId: null,
          validFrom: now,
          validTo: null,
          dateCreated: now,
          dateUpdated: now,
          dateDeleted: null,
        });
      }
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, CalendarioLetivo.entityName, dto.id);

    return result;
  }
}
