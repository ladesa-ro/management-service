import { Controller, Get, HttpCode, HttpStatus, Query, Res } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import { IRelatorioRepository } from "../domain/repositories";

@ApiTags("relatorios")
@Controller("/relatorios")
export class RelatorioRestController {
  constructor(
    @DeclareDependency(IRelatorioRepository)
    private readonly relatorioRepository: IRelatorioRepository,
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
    const data = await this.relatorioRepository.findAulasMinistradas({
      perfilId,
      turmaId,
      disciplinaId,
      cursoId,
      periodo,
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
