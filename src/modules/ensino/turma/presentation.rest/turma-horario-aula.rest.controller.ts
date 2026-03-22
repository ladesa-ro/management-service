import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { ITurmaHorarioAulaRepository } from "@/modules/horarios/turma-horario-aula/domain/repositories";
import {
  TurmaHorarioAulaBulkReplaceCommandMetadata,
  TurmaHorarioAulaFindAllQueryMetadata,
} from "@/modules/horarios/turma-horario-aula/domain/turma-horario-aula.query.metadata";
import { AccessContextHttp } from "@/server/access-context";
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
  @ApiOperation(TurmaHorarioAulaFindAllQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaHorarioAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() parentParams: TurmaHorarioAulaParentParamsRestDto,
  ): Promise<TurmaHorarioAulaListOutputRestDto> {
    const entries = await this.turmaHorarioAulaRepository.findByTurmaId(parentParams.turmaId);

    return {
      data: entries.map((e) => ({
        id: e.id,
        horarioAulaId: e.horarioAula?.id,
        inicio: e.horarioAula?.inicio ?? "",
        fim: e.horarioAula?.fim ?? "",
      })),
    };
  }

  @Put("/")
  @ApiOperation(TurmaHorarioAulaBulkReplaceCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaHorarioAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() parentParams: TurmaHorarioAulaParentParamsRestDto,
    @Body() dto: TurmaHorarioAulaBulkReplaceInputRestDto,
  ): Promise<TurmaHorarioAulaListOutputRestDto> {
    await this.turmaHorarioAulaRepository.deleteByTurmaId(parentParams.turmaId);

    for (const horarioAulaId of dto.horarioAulaIds) {
      await this.turmaHorarioAulaRepository.save({
        id: generateUuidV7(),
        turma: { id: parentParams.turmaId },
        horarioAula: { id: horarioAulaId },
      });
    }

    return this.findAll(_accessContext, parentParams);
  }
}
