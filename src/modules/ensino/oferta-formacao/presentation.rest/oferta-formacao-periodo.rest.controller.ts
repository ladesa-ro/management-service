import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import {
  OfertaFormacaoPeriodoBulkReplaceCommandMetadata,
  OfertaFormacaoPeriodoFindAllQueryMetadata,
} from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-periodo.query.metadata";
import { IOfertaFormacaoPeriodoRepository } from "@/modules/ensino/oferta-formacao-periodo/domain/repositories";
import { OfertaFormacaoPeriodoEntity } from "@/modules/ensino/oferta-formacao-periodo/infrastructure.database/typeorm/oferta-formacao-periodo.typeorm.entity";
import { IOfertaFormacaoPeriodoEtapaRepository } from "@/modules/ensino/oferta-formacao-periodo-etapa/domain/repositories";
import { OfertaFormacaoPeriodoEtapaEntity } from "@/modules/ensino/oferta-formacao-periodo-etapa/infrastructure.database/typeorm/oferta-formacao-periodo-etapa.typeorm.entity";
import { AccessContextHttp } from "@/server/nest/access-context";
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
  @ApiOperation(OfertaFormacaoPeriodoFindAllQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoPeriodoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: IAccessContext,
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
  @ApiOperation(OfertaFormacaoPeriodoBulkReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: OfertaFormacaoPeriodoListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: IAccessContext,
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
      periodoEntity.ofertaFormacao = {
        id: ofertaFormacaoId,
      } as typeof periodoEntity.ofertaFormacao;
      periodoEntity.numeroPeriodo = item.numeroPeriodo;
      await this.ofertaFormacaoPeriodoRepository.save(periodoEntity);

      if (item.etapas) {
        for (const etapaItem of item.etapas) {
          const etapaEntity = new OfertaFormacaoPeriodoEtapaEntity();
          etapaEntity.id = generateUuidV7();
          etapaEntity.ofertaFormacaoPeriodo = {
            id: periodoEntity.id,
          } as typeof etapaEntity.ofertaFormacaoPeriodo;
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
