import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ICalendarioLetivoRepository } from "../domain/repositories/calendario-letivo.repository.interface";
import { ICalendarioLetivoEtapaRepository } from "../domain/repositories/calendario-letivo-etapa.repository.interface";
import { CalendarioLetivoEtapaEntity } from "../infrastructure.database/typeorm/calendario-letivo-etapa.typeorm.entity";
import { CalendarioLetivoFindOneInputRestDto } from "./calendario-letivo.rest.dto";
import {
  CalendarioLetivoEtapaBulkReplaceInputRestDto,
  CalendarioLetivoEtapaListOutputRestDto,
  CalendarioLetivoEtapaParentParamsRestDto,
} from "./calendario-letivo-etapa.rest.dto";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos/:calendarioLetivoId/etapas")
export class CalendarioLetivoEtapaRestController {
  constructor(
    @DeclareDependency(ICalendarioLetivoEtapaRepository)
    private readonly etapaRepository: ICalendarioLetivoEtapaRepository,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista etapas do calendario letivo",
    operationId: "calendarioLetivoEtapaFindAll",
  })
  @ApiOkResponse({ type: CalendarioLetivoEtapaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: CalendarioLetivoEtapaParentParamsRestDto,
  ): Promise<CalendarioLetivoEtapaListOutputRestDto> {
    const etapas = await this.etapaRepository.findByCalendarioLetivoId(
      parentParams.calendarioLetivoId,
    );

    return {
      data: etapas.map((e) => ({
        id: e.id,
        ofertaFormacaoPeriodoEtapaId: e.idOfertaFormacaoPeriodoEtapaFk,
        nomeEtapa: e.ofertaFormacaoPeriodoEtapa?.nome ?? "",
        dataInicio:
          e.dataInicio instanceof Date
            ? e.dataInicio.toISOString().split("T")[0]
            : String(e.dataInicio),
        dataTermino:
          e.dataTermino instanceof Date
            ? e.dataTermino.toISOString().split("T")[0]
            : String(e.dataTermino),
      })),
    };
  }

  @Put("/")
  @ApiOperation({
    summary: "Substitui datas das etapas do calendario letivo",
    operationId: "calendarioLetivoEtapaBulkReplace",
  })
  @ApiOkResponse({ type: CalendarioLetivoEtapaListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: CalendarioLetivoEtapaParentParamsRestDto,
    @Body() dto: CalendarioLetivoEtapaBulkReplaceInputRestDto,
  ): Promise<CalendarioLetivoEtapaListOutputRestDto> {
    const calendarioLetivoId = parentParams.calendarioLetivoId;

    // Soft-delete existing
    await this.etapaRepository.softDeleteByCalendarioLetivoId(calendarioLetivoId);

    // Insert new
    const now = new Date();
    for (const item of dto.etapas) {
      const entity = new CalendarioLetivoEtapaEntity();
      entity.id = generateUuidV7();
      entity.idCalendarioLetivoFk = calendarioLetivoId;
      entity.idOfertaFormacaoPeriodoEtapaFk = item.ofertaFormacaoPeriodoEtapaId;
      entity.dataInicio = new Date(item.dataInicio);
      entity.dataTermino = new Date(item.dataTermino);
      entity.dateCreated = now;
      entity.dateUpdated = now;
      entity.dateDeleted = null;
      entity.calendarioLetivo = {
        id: calendarioLetivoId,
      } as CalendarioLetivoEtapaEntity["calendarioLetivo"];
      entity.ofertaFormacaoPeriodoEtapa = {
        id: item.ofertaFormacaoPeriodoEtapaId,
      } as CalendarioLetivoEtapaEntity["ofertaFormacaoPeriodoEtapa"];
      await this.etapaRepository.save(entity);
    }

    return this.findAll(_accessContext, parentParams);
  }
}

// Separate controller for desativar action
@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoDesativarRestController {
  constructor(
    @DeclareDependency(ICalendarioLetivoRepository)
    private readonly calendarioLetivoRepository: ICalendarioLetivoRepository,
  ) {}

  @Post("/:id/desativar")
  @ApiOperation({
    summary: "Desativa um calendario letivo (sem excluir)",
    operationId: "calendarioLetivoDesativar",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async desativar(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<boolean> {
    await this.calendarioLetivoRepository.softDeleteById(params.id);
    return true;
  }
}
