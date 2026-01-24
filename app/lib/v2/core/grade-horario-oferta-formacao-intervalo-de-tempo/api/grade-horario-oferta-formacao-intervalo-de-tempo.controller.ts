import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "../domain/grade-horario-oferta-formacao-intervalo-de-tempo.service";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
} from "../dto";

@ApiTags("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@Controller("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoController {
  constructor(private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista grades horarios de ofertas de formacoes intervalos de tempo" })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto })
  @ApiForbiddenResponse()
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma grade horario de oferta de formacao intervalo de tempo por ID" })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma grade horario de oferta de formacao intervalo de tempo" })
  @ApiCreatedResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto })
  @ApiForbiddenResponse()
  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma grade horario de oferta de formacao intervalo de tempo" })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
    @Body() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma grade horario de oferta de formacao intervalo de tempo" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  ): Promise<boolean> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext, params);
  }
}
