import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { AccessContextHttp } from "@/server/nest/access-context";
import { getNowISO } from "@/utils/date";
import {
  CalendarioLetivoDesativarCommandMetadata,
  CalendarioLetivoEtapaBulkReplaceCommandMetadata,
  CalendarioLetivoEtapaFindAllQueryMetadata,
} from "../domain/calendario-letivo-etapa.operations";
import { ICalendarioLetivoRepository } from "../domain/repositories/calendario-letivo.repository.interface";
import { ICalendarioLetivoEtapaRepository } from "../domain/repositories/calendario-letivo-etapa.repository.interface";
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
    @Dep(ICalendarioLetivoEtapaRepository)
    private readonly etapaRepository: ICalendarioLetivoEtapaRepository,
  ) {}

  @Get("/")
  @ApiOperation(CalendarioLetivoEtapaFindAllQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoEtapaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() parentParams: CalendarioLetivoEtapaParentParamsRestDto,
  ): Promise<CalendarioLetivoEtapaListOutputRestDto> {
    const etapas = await this.etapaRepository.findByCalendarioLetivoId(
      parentParams.calendarioLetivoId,
    );

    return {
      data: etapas.map((e) => ({
        id: e.id,
        ofertaFormacaoPeriodoEtapaId: e.ofertaFormacaoPeriodoEtapa?.id,
        nomeEtapa: e.ofertaFormacaoPeriodoEtapa?.nome ?? "",
        dataInicio: String(e.dataInicio),
        dataTermino: String(e.dataTermino),
      })),
    };
  }

  @Put("/")
  @ApiOperation(CalendarioLetivoEtapaBulkReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CalendarioLetivoEtapaListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() parentParams: CalendarioLetivoEtapaParentParamsRestDto,
    @Body() dto: CalendarioLetivoEtapaBulkReplaceInputRestDto,
  ): Promise<CalendarioLetivoEtapaListOutputRestDto> {
    const calendarioLetivoId = parentParams.calendarioLetivoId;

    // Soft-delete existing
    await this.etapaRepository.softDeleteByCalendarioLetivoId(calendarioLetivoId);

    // Insert new
    const now = getNowISO();
    for (const item of dto.etapas) {
      await this.etapaRepository.save({
        id: generateUuidV7(),
        calendarioLetivo: { id: calendarioLetivoId },
        ofertaFormacaoPeriodoEtapa: { id: item.ofertaFormacaoPeriodoEtapaId },
        dataInicio: item.dataInicio,
        dataTermino: item.dataTermino,
        dateCreated: now,
        dateUpdated: now,
        dateDeleted: null,
      });
    }

    return this.findAll(_accessContext, parentParams);
  }
}

// Separate controller for desativar action
@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoDesativarRestController {
  constructor(
    @Dep(ICalendarioLetivoRepository)
    private readonly calendarioLetivoRepository: ICalendarioLetivoRepository,
  ) {}

  @Post("/:id/desativar")
  @ApiOperation(CalendarioLetivoDesativarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async desativar(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<boolean> {
    await this.calendarioLetivoRepository.softDeleteById(params.id);
    return true;
  }
}
