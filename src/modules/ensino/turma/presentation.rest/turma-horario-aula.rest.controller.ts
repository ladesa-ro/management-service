import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { ITurmaHorarioAulaRepository } from "@/modules/horarios/turma-horario-aula/domain/repositories";
import {
  TurmaHorarioAulaBulkReplaceCommandMetadata,
  TurmaHorarioAulaFindAllQueryMetadata,
} from "@/modules/horarios/turma-horario-aula/domain/turma-horario-aula.query.metadata";
import { AccessContextHttp } from "@/server/nest/access-context";
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
    const items = await this.turmaHorarioAulaRepository.findItemsByTurmaId(parentParams.turmaId);

    return {
      data: items.map((item) => ({ inicio: item.inicio, fim: item.fim })),
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
    await this.turmaHorarioAulaRepository.replaceItems(
      parentParams.turmaId,
      dto.horarios.map((h) => ({ inicio: h.inicio, fim: h.fim })),
    );

    return this.findAll(_accessContext, parentParams);
  }
}
