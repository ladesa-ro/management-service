import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoService } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.rest.dto";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper } from "./grade-horario-oferta-formacao-intervalo-de-tempo.rest.mapper";

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
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toListInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.findAll(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toListOutputDto(result);
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
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toFindOneInput(params);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.findByIdStrict(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toFindOneOutputDto(result);
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
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toCreateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.create(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toFindOneOutputDto(result);
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
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toUpdateInput(params, dto);
    const result = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.update(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toFindOneOutputDto(result);
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
    const input = GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toFindOneInput(params);
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoService.deleteOneById(
      accessContext,
      input,
    );
  }
}
