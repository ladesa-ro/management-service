import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource } from "typeorm";
import { OfertaFormacaoPeriodoEntity } from "@/modules/ensino/oferta-formacao-periodo/infrastructure.database/typeorm/oferta-formacao-periodo.typeorm.entity";
import { OfertaFormacaoPeriodoEtapaEntity } from "@/modules/ensino/oferta-formacao-periodo-etapa/infrastructure.database/typeorm/oferta-formacao-periodo-etapa.typeorm.entity";
import {
  OfertaFormacaoPeriodoBulkReplaceInputRestDto,
  OfertaFormacaoPeriodoFindOneOutputRestDto,
  OfertaFormacaoPeriodoEtapaOutputRestDto,
  OfertaFormacaoPeriodoListOutputRestDto,
  OfertaFormacaoPeriodoParentParamsRestDto,
} from "./oferta-formacao-periodo.rest.dto";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes/:ofertaFormacaoId/periodos")
export class OfertaFormacaoPeriodoRestController {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista periodos de uma oferta de formacao", operationId: "ofertaFormacaoPeriodoFindAll" })
  @ApiOkResponse({ type: OfertaFormacaoPeriodoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: OfertaFormacaoPeriodoParentParamsRestDto,
  ): Promise<OfertaFormacaoPeriodoListOutputRestDto> {
    const periodoRepo = this.dataSource.getRepository(OfertaFormacaoPeriodoEntity);
    const etapaRepo = this.dataSource.getRepository(OfertaFormacaoPeriodoEtapaEntity);

    const periodos = await periodoRepo.find({
      where: { idOfertaFormacaoFk: parentParams.ofertaFormacaoId },
      order: { numeroPeriodo: "ASC" },
    });

    const data: OfertaFormacaoPeriodoFindOneOutputRestDto[] = [];

    for (const periodo of periodos) {
      const etapas = await etapaRepo.find({
        where: { idOfertaFormacaoPeriodoFk: periodo.id },
      });

      data.push({
        id: periodo.id,
        numeroPeriodo: periodo.numeroPeriodo,
        etapas: etapas.map((e) => ({
          id: e.id,
          nome: e.nome,
          cor: e.cor,
        })),
      });
    }

    return { data };
  }

  @Put("/")
  @ApiOperation({ summary: "Substitui periodos e etapas de uma oferta de formacao", operationId: "ofertaFormacaoPeriodoBulkReplace" })
  @ApiOkResponse({ type: OfertaFormacaoPeriodoListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: OfertaFormacaoPeriodoParentParamsRestDto,
    @Body() dto: OfertaFormacaoPeriodoBulkReplaceInputRestDto,
  ): Promise<OfertaFormacaoPeriodoListOutputRestDto> {
    const ofertaFormacaoId = parentParams.ofertaFormacaoId;

    await this.dataSource.transaction(async (manager) => {
      const periodoRepo = manager.getRepository(OfertaFormacaoPeriodoEntity);
      const etapaRepo = manager.getRepository(OfertaFormacaoPeriodoEtapaEntity);

      // Find existing periods to delete their etapas
      const existingPeriodos = await periodoRepo.find({
        where: { idOfertaFormacaoFk: ofertaFormacaoId },
      });

      // Delete etapas of existing periods
      for (const p of existingPeriodos) {
        await etapaRepo.delete({ idOfertaFormacaoPeriodoFk: p.id });
      }

      // Delete existing periods
      await periodoRepo.delete({ idOfertaFormacaoFk: ofertaFormacaoId });

      // Insert new periods + etapas
      for (const item of dto.periodos) {
        const periodoEntity = new OfertaFormacaoPeriodoEntity();
        periodoEntity.id = generateUuidV7();
        periodoEntity.idOfertaFormacaoFk = ofertaFormacaoId;
        periodoEntity.numeroPeriodo = item.numeroPeriodo;
        (periodoEntity as any).ofertaFormacao = { id: ofertaFormacaoId };
        await manager.save(OfertaFormacaoPeriodoEntity, periodoEntity);

        if (item.etapas) {
          for (const etapaItem of item.etapas) {
            const etapaEntity = new OfertaFormacaoPeriodoEtapaEntity();
            etapaEntity.id = generateUuidV7();
            etapaEntity.idOfertaFormacaoPeriodoFk = periodoEntity.id;
            etapaEntity.nome = etapaItem.nome;
            etapaEntity.cor = etapaItem.cor ?? "#000000";
            (etapaEntity as any).ofertaFormacaoPeriodo = { id: periodoEntity.id };
            await manager.save(OfertaFormacaoPeriodoEtapaEntity, etapaEntity);
          }
        }
      }
    });

    // Return updated list
    return this.findAll(_accessContext, parentParams);
  }
}
