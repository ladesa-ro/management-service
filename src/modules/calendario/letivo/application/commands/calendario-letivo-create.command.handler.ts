import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  CalendarioLetivo,
  CalendarioLetivoSituacao,
} from "@/modules/calendario/letivo/domain/calendario-letivo";
import { validateEtapasNaoSobrepostas } from "@/modules/calendario/letivo/domain/calendario-letivo-etapa.validators";
import type { CalendarioLetivoCreateCommand } from "@/modules/calendario/letivo/domain/commands/calendario-letivo-create.command";
import { ICalendarioLetivoCreateCommandHandler } from "@/modules/calendario/letivo/domain/commands/calendario-letivo-create.command.handler.interface";
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
export class CalendarioLetivoCreateCommandHandlerImpl
  implements ICalendarioLetivoCreateCommandHandler
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
    dto: CalendarioLetivoCreateCommand,
  ): Promise<CalendarioLetivoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
    ensureExists(campus, Campus.entityName, dto.campus.id);

    let ofertaFormacaoRef: { id: string } | undefined;
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
        id: dto.ofertaFormacao.id,
      });
      ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
      ofertaFormacaoRef = { id: ofertaFormacao.id };
    }

    const domain = CalendarioLetivo.create({
      nome: dto.nome,
      ano: dto.ano,
      campus: { id: campus.id },
      ofertaFormacao: ofertaFormacaoRef,
      situacao: dto.situacao as CalendarioLetivoSituacao | undefined,
    });

    await this.repository.save(domain);

    if (dto.etapas && dto.etapas.length > 0) {
      validateEtapasNaoSobrepostas(dto.etapas);

      const now = getNowISO();

      for (const item of dto.etapas) {
        const snapshot = await this.etapaRepository.findOfertaFormacaoPeriodoEtapaSnapshot(
          item.ofertaFormacaoPeriodoEtapaId,
        );
        ensureExists(snapshot, "OfertaFormacaoPeriodoEtapa", item.ofertaFormacaoPeriodoEtapaId);

        await this.etapaRepository.save({
          id: generateUuidV7(),
          identificadorExterno: generateUuidV7(),
          calendarioLetivo: { id: domain.id },
          ofertaFormacaoPeriodoEtapa: { id: item.ofertaFormacaoPeriodoEtapaId },
          nome: snapshot.nome,
          cor: snapshot.cor,
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

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioLetivo.entityName, domain.id);

    return result;
  }
}
