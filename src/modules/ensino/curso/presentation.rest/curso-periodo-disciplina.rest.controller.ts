import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import { ICursoPeriodoDisciplinaRepository } from "../domain/repositories";
import { CursoPeriodoDisciplinaEntity } from "../infrastructure.database/typeorm/curso-periodo-disciplina.typeorm.entity";
import {
  CursoPeriodoDisciplinaBulkReplaceInputRestDto,
  CursoPeriodoDisciplinaListOutputRestDto,
  CursoPeriodoDisciplinaOutputPeriodoRestDto,
  CursoPeriodoDisciplinaParentParamsRestDto,
} from "./curso-periodo-disciplina.rest.dto";

@ApiTags("cursos")
@Controller("/cursos/:cursoId/disciplinas-por-periodo")
export class CursoPeriodoDisciplinaRestController {
  constructor(
    @DeclareDependency(ICursoPeriodoDisciplinaRepository)
    private readonly cursoPeriodoDisciplinaRepository: ICursoPeriodoDisciplinaRepository,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista disciplinas por periodo de um curso",
    operationId: "cursoDisciplinasPorPeriodoFindAll",
  })
  @ApiOkResponse({ type: CursoPeriodoDisciplinaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: CursoPeriodoDisciplinaParentParamsRestDto,
  ): Promise<CursoPeriodoDisciplinaListOutputRestDto> {
    const entries = await this.cursoPeriodoDisciplinaRepository.findByCursoId(parentParams.cursoId);

    // Group by periodo
    const periodoMap = new Map<number, CursoPeriodoDisciplinaOutputPeriodoRestDto>();

    for (const entry of entries) {
      let periodo = periodoMap.get(entry.numeroPeriodo);
      if (!periodo) {
        periodo = { numeroPeriodo: entry.numeroPeriodo, disciplinas: [] };
        periodoMap.set(entry.numeroPeriodo, periodo);
      }
      periodo.disciplinas.push({
        id: entry.id,
        disciplinaId: entry.idDisciplinaFk,
        disciplinaNome: entry.disciplina?.nome ?? null,
        cargaHoraria: entry.cargaHoraria,
      });
    }

    return {
      data: Array.from(periodoMap.values()).sort((a, b) => a.numeroPeriodo - b.numeroPeriodo),
    };
  }

  @Put("/")
  @ApiOperation({
    summary: "Substitui disciplinas por periodo de um curso",
    operationId: "cursoDisciplinasPorPeriodoBulkReplace",
  })
  @ApiOkResponse({ type: CursoPeriodoDisciplinaListOutputRestDto })
  @ApiForbiddenResponse()
  async bulkReplace(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() parentParams: CursoPeriodoDisciplinaParentParamsRestDto,
    @Body() dto: CursoPeriodoDisciplinaBulkReplaceInputRestDto,
  ): Promise<CursoPeriodoDisciplinaListOutputRestDto> {
    const cursoId = parentParams.cursoId;

    await this.cursoPeriodoDisciplinaRepository.deleteByCursoId(cursoId);

    for (const periodoItem of dto.periodos) {
      for (const discItem of periodoItem.disciplinas) {
        const entity = new CursoPeriodoDisciplinaEntity();
        entity.id = generateUuidV7();
        entity.idCursoFk = cursoId;
        entity.numeroPeriodo = periodoItem.numeroPeriodo;
        entity.idDisciplinaFk = discItem.disciplinaId;
        entity.cargaHoraria = discItem.cargaHoraria ?? null;
        await this.cursoPeriodoDisciplinaRepository.save(entity);
      }
    }

    return this.findAll(_accessContext, parentParams);
  }
}
