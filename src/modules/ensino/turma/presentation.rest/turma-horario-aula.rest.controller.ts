import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { TurmaHorarioAulaEntity } from "@/modules/horarios/turma-horario-aula/infrastructure.database/typeorm/turma-horario-aula.typeorm.entity";
import {
  TurmaHorarioAulaBulkReplaceInputRestDto,
  TurmaHorarioAulaListOutputRestDto,
  TurmaHorarioAulaParentParamsRestDto,
} from "./turma-horario-aula.rest.dto";

@ApiTags("turmas")
@Controller("/turmas/:turmaId/horarios-aula")
export class TurmaHorarioAulaRestController {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista horarios de aula selecionados da turma",
    operationId: "turmaHorarioAulaFindAll",
  })
  @ApiOkResponse({ type: TurmaHorarioAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: TurmaHorarioAulaParentParamsRestDto,
  ): Promise<TurmaHorarioAulaListOutputRestDto> {
    const repo = this.appTypeormConnection.getRepository(TurmaHorarioAulaEntity);

    const entries = await repo.find({
      where: { idTurmaFk: parentParams.turmaId },
      relations: ["horarioAula"],
    });

    return {
      data: entries.map((e) => ({
        id: e.id,
        horarioAulaId: e.idHorarioAulaFk,
        inicio: e.horarioAula?.inicio ?? "",
        fim: e.horarioAula?.fim ?? "",
      })),
    };
  }

  @Put("/")
  @ApiOperation({
    summary: "Substitui horarios de aula selecionados da turma",
    operationId: "turmaHorarioAulaBulkReplace",
  })
  @ApiOkResponse({ type: TurmaHorarioAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: TurmaHorarioAulaParentParamsRestDto,
    @Body() dto: TurmaHorarioAulaBulkReplaceInputRestDto,
  ): Promise<TurmaHorarioAulaListOutputRestDto> {
    await this.appTypeormConnection.transaction(async (manager) => {
      const repo = manager.getRepository(TurmaHorarioAulaEntity);

      // Delete existing selections
      await repo.delete({ idTurmaFk: parentParams.turmaId });

      // Insert new selections
      for (const horarioAulaId of dto.horarioAulaIds) {
        const entity = new TurmaHorarioAulaEntity();
        entity.id = generateUuidV7();
        entity.idTurmaFk = parentParams.turmaId;
        entity.idHorarioAulaFk = horarioAulaId;
        (entity as any).turma = { id: parentParams.turmaId };
        (entity as any).horarioAula = { id: horarioAulaId };
        await manager.save(TurmaHorarioAulaEntity, entity);
      }
    });

    return this.findAll(_accessContext, parentParams);
  }
}
