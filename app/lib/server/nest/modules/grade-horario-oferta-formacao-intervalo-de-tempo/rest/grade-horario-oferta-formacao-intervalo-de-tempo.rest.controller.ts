import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/core/grade-horario-oferta-formacao-intervalo-de-tempo";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.rest.dto";

@ApiTags("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@Controller("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoRestController {
  constructor(
    private gradeHorarioOfertaFormacaoIntervaloDeTempoService: GradeHorarioOfertaFormacaoIntervaloDeTempoService,
  ) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista grades horarios de ofertas de formacoes intervalos de tempo",
    operationId: "gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
      accessContext,
      dto,
    ) as unknown as Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto>;
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma grade horario de oferta de formacao intervalo de tempo por ID",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(
      accessContext,
      params,
    ) as unknown as Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto>;
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria uma grade horario de oferta de formacao intervalo de tempo",
    operationId: "gradeHorarioOfertaFormacaoIntervaloDeTempoCreate",
  })
  @ApiCreatedResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
      accessContext,
      dto as any,
    ) as unknown as Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto>;
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma grade horario de oferta de formacao intervalo de tempo",
    operationId: "gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
    @Body() dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
      accessContext,
      { id: params.id, ...dto } as any,
    ) as unknown as Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto>;
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma grade horario de oferta de formacao intervalo de tempo",
    operationId: "gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
  ): Promise<boolean> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
      accessContext,
      params,
    );
  }
}
