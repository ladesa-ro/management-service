import { Controller, Get, HttpCode, HttpStatus, Query, Res } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DiarioProfessorEntity } from "@/modules/ensino/diario/infrastructure.database/typeorm/diario-professor.typeorm.entity";

@ApiTags("relatorios")
@Controller("/relatorios")
export class RelatorioRestController {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  @Get("/aulas-ministradas")
  @ApiOperation({
    summary: "Relatorio de aulas ministradas (JSON)",
    operationId: "relatorioAulasMinistradas",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async aulasMinistradas(
    @AccessContextHttp() _accessContext: AccessContext,
    @Query("perfilId") perfilId?: string,
    @Query("turmaId") turmaId?: string,
    @Query("disciplinaId") disciplinaId?: string,
    @Query("cursoId") cursoId?: string,
    @Query("periodo") periodo?: string,
  ) {
    const qb = this.appTypeormConnection
      .getRepository(DiarioProfessorEntity)
      .createQueryBuilder("dp")
      .leftJoinAndSelect("dp.diario", "diario")
      .leftJoinAndSelect("dp.perfil", "perfil")
      .leftJoinAndSelect("perfil.usuario", "usuario")
      .leftJoinAndSelect("diario.disciplina", "disciplina")
      .leftJoinAndSelect("diario.turma", "turma")
      .leftJoinAndSelect("turma.curso", "curso")
      .leftJoinAndSelect("diario.calendarioLetivo", "calendarioLetivo")
      .where("dp.date_deleted IS NULL")
      .andWhere("diario.date_deleted IS NULL")
      .andWhere("diario.ativo = true");

    if (perfilId) {
      qb.andWhere("dp.id_perfil_fk = :perfilId", { perfilId });
    }
    if (turmaId) {
      qb.andWhere("diario.id_turma_fk = :turmaId", { turmaId });
    }
    if (disciplinaId) {
      qb.andWhere("diario.id_disciplina_fk = :disciplinaId", { disciplinaId });
    }
    if (cursoId) {
      qb.andWhere("turma.id_curso_fk = :cursoId", { cursoId });
    }
    if (periodo) {
      qb.andWhere("turma.periodo = :periodo", { periodo });
    }

    const entries = await qb.getMany();

    const data = entries.map((dp) => {
      const diario = dp.diario;
      return {
        diarioId: diario?.id,
        professorNome: (dp.perfil as any)?.usuario?.nome ?? null,
        perfilId: (dp.perfil as any)?.id ?? null,
        disciplinaNome: (diario?.disciplina as any)?.nome ?? null,
        disciplinaId: (diario?.disciplina as any)?.id ?? null,
        turmaPeriodo: (diario?.turma as any)?.periodo ?? null,
        turmaNome: (diario?.turma as any)?.nome ?? null,
        turmaId: (diario?.turma as any)?.id ?? null,
        cursoNome: (diario?.turma as any)?.curso?.nome ?? null,
        cursoId: (diario?.turma as any)?.curso?.id ?? null,
        calendarioLetivoNome: (diario?.calendarioLetivo as any)?.nome ?? null,
        calendarioLetivoAno: (diario?.calendarioLetivo as any)?.ano ?? null,
        ativo: diario?.ativo ?? false,
      };
    });

    return { data };
  }

  @Get("/aulas-ministradas/pdf")
  @ApiOperation({
    summary: "Relatorio de aulas ministradas (PDF)",
    operationId: "relatorioAulasMinistradasPdf",
  })
  @ApiForbiddenResponse()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  async aulasMinistradsPdf(
    @AccessContextHttp() _accessContext: AccessContext,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.NOT_IMPLEMENTED).json({
      statusCode: HttpStatus.NOT_IMPLEMENTED,
      message: "Geração de PDF ainda não implementada.",
    });
  }
}
