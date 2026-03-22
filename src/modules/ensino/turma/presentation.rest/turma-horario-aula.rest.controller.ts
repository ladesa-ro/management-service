import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ITurmaHorarioAulaRepository } from "@/modules/horarios/turma-horario-aula/domain/repositories";
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
    @DeclareDependency(ITurmaHorarioAulaRepository)
    private readonly turmaHorarioAulaRepository: ITurmaHorarioAulaRepository,
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
    const entries = await this.turmaHorarioAulaRepository.findByTurmaId(parentParams.turmaId);

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
    await this.turmaHorarioAulaRepository.deleteByTurmaId(parentParams.turmaId);

    for (const horarioAulaId of dto.horarioAulaIds) {
      const entity = new TurmaHorarioAulaEntity();
      entity.id = generateUuidV7();
      entity.idTurmaFk = parentParams.turmaId;
      entity.idHorarioAulaFk = horarioAulaId;
      await this.turmaHorarioAulaRepository.save(entity);
    }

    return this.findAll(_accessContext, parentParams);
  }
}
