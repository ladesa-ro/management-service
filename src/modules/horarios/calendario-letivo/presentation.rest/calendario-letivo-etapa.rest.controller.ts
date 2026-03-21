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
import { ensureExists } from "@/modules/@shared";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CalendarioLetivoEntity } from "../infrastructure.database/typeorm/calendario-letivo.typeorm.entity";
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
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
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
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEtapaEntity);

    const etapas = await repo.find({
      where: {
        idCalendarioLetivoFk: parentParams.calendarioLetivoId,
        dateDeleted: null as any,
      },
      relations: ["ofertaFormacaoPeriodoEtapa"],
      order: { dataInicio: "ASC" },
    });

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

    await this.appTypeormConnection.transaction(async (manager) => {
      const repo = manager.getRepository(CalendarioLetivoEtapaEntity);

      // Soft-delete existing
      await repo
        .createQueryBuilder()
        .update(CalendarioLetivoEtapaEntity)
        .set({ dateDeleted: new Date() })
        .where("id_calendario_letivo_fk = :calendarioLetivoId AND date_deleted IS NULL", {
          calendarioLetivoId,
        })
        .execute();

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
        (entity as any).calendarioLetivo = { id: calendarioLetivoId };
        (entity as any).ofertaFormacaoPeriodoEtapa = { id: item.ofertaFormacaoPeriodoEtapaId };
        await manager.save(CalendarioLetivoEtapaEntity, entity);
      }
    });

    return this.findAll(_accessContext, parentParams);
  }
}

// Separate controller for desativar action
@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoDesativarRestController {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
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
    const repo = this.appTypeormConnection.getRepository(CalendarioLetivoEntity);
    const entity = await repo.findOneBy({ id: params.id });
    ensureExists(entity, "CalendarioLetivo", params.id);

    // Soft-delete (desativar)
    entity!.dateDeleted = new Date();
    entity!.dateUpdated = new Date();
    await repo.save(entity!);

    return true;
  }
}
