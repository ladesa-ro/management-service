import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { IOfertaFormacaoPeriodoRepository } from "@/modules/ensino/oferta-formacao-periodo/domain/repositories";
import { OfertaFormacaoPeriodoEntity } from "@/modules/ensino/oferta-formacao-periodo/infrastructure.database/typeorm/oferta-formacao-periodo.typeorm.entity";
import { IOfertaFormacaoPeriodoEtapaRepository } from "@/modules/ensino/oferta-formacao-periodo-etapa/domain/repositories";
import { OfertaFormacaoPeriodoEtapaEntity } from "@/modules/ensino/oferta-formacao-periodo-etapa/infrastructure.database/typeorm/oferta-formacao-periodo-etapa.typeorm.entity";
import {
  OfertaFormacaoPeriodoBulkReplaceInputRestDto,
  OfertaFormacaoPeriodoFindOneOutputRestDto,
  OfertaFormacaoPeriodoListOutputRestDto,
  OfertaFormacaoPeriodoParentParamsRestDto,
} from "./oferta-formacao-periodo.rest.dto";

@ApiTags("ofertas-formacoes")
@Controller("/ofertas-formacoes/:ofertaFormacaoId/periodos")
export class OfertaFormacaoPeriodoRestController {
  constructor(
    @DeclareDependency(IOfertaFormacaoPeriodoRepository)
    private readonly ofertaFormacaoPeriodoRepository: IOfertaFormacaoPeriodoRepository,
    @DeclareDependency(IOfertaFormacaoPeriodoEtapaRepository)
    private readonly ofertaFormacaoPeriodoEtapaRepository: IOfertaFormacaoPeriodoEtapaRepository,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista periodos de uma oferta de formacao",
    operationId: "ofertaFormacaoPeriodoFindAll",
  })
  @ApiOkResponse({ type: OfertaFormacaoPeriodoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: OfertaFormacaoPeriodoParentParamsRestDto,
  ): Promise<OfertaFormacaoPeriodoListOutputRestDto> {
    const periodos = await this.ofertaFormacaoPeriodoRepository.findByOfertaFormacaoId(
      parentParams.ofertaFormacaoId,
    );

    const data: OfertaFormacaoPeriodoFindOneOutputRestDto[] = [];

    for (const periodo of periodos) {
      const etapas = await this.ofertaFormacaoPeriodoEtapaRepository.findByPeriodoId(periodo.id);

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
  @ApiOperation({
    summary: "Substitui periodos e etapas de uma oferta de formacao",
    operationId: "ofertaFormacaoPeriodoBulkReplace",
  })
  @ApiOkResponse({ type: OfertaFormacaoPeriodoListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: OfertaFormacaoPeriodoParentParamsRestDto,
    @Body() dto: OfertaFormacaoPeriodoBulkReplaceInputRestDto,
  ): Promise<OfertaFormacaoPeriodoListOutputRestDto> {
    const ofertaFormacaoId = parentParams.ofertaFormacaoId;

    // Find existing periods to delete their etapas
    const existingPeriodos =
      await this.ofertaFormacaoPeriodoRepository.findByOfertaFormacaoId(ofertaFormacaoId);

    // Delete etapas of existing periods
    for (const p of existingPeriodos) {
      await this.ofertaFormacaoPeriodoEtapaRepository.deleteByPeriodoId(p.id);
    }

    // Delete existing periods
    await this.ofertaFormacaoPeriodoRepository.deleteByOfertaFormacaoId(ofertaFormacaoId);

    // Insert new periods + etapas
    for (const item of dto.periodos) {
      const periodoEntity = new OfertaFormacaoPeriodoEntity();
      periodoEntity.id = generateUuidV7();
      periodoEntity.idOfertaFormacaoFk = ofertaFormacaoId;
      periodoEntity.numeroPeriodo = item.numeroPeriodo;
      await this.ofertaFormacaoPeriodoRepository.save(periodoEntity);

      if (item.etapas) {
        for (const etapaItem of item.etapas) {
          const etapaEntity = new OfertaFormacaoPeriodoEtapaEntity();
          etapaEntity.id = generateUuidV7();
          etapaEntity.idOfertaFormacaoPeriodoFk = periodoEntity.id;
          etapaEntity.nome = etapaItem.nome;
          etapaEntity.cor = etapaItem.cor ?? "#000000";
          await this.ofertaFormacaoPeriodoEtapaRepository.save(etapaEntity);
        }
      }
    }

    // Return updated list
    return this.findAll(_accessContext, parentParams);
  }
}
