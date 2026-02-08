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
import { GradeHorarioOfertaFormacaoService } from "@/modules/grade-horario-oferta-formacao";
import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "./grade-horario-oferta-formacao.rest.dto";
import { GradeHorarioOfertaFormacaoRestMapper } from "./grade-horario-oferta-formacao.rest.mapper";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoRestController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista grades horarios de ofertas de formacoes",
    operationId: "gradeHorarioOfertaFormacaoFindAll",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: GradeHorarioOfertaFormacaoListInputDto,
  ): Promise<GradeHorarioOfertaFormacaoListOutputDto> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toListInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoService.findAll(accessContext, input);
    return GradeHorarioOfertaFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma grade horario de oferta de formacao por ID",
    operationId: "gradeHorarioOfertaFormacaoFindById",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toFindOneInput(params);
    const result = await this.gradeHorarioOfertaFormacaoService.findByIdStrict(
      accessContext,
      input,
    );
    return GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria uma grade horario de oferta de formacao",
    operationId: "gradeHorarioOfertaFormacaoCreate",
  })
  @ApiCreatedResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toCreateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoService.create(accessContext, input);
    return GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma grade horario de oferta de formacao",
    operationId: "gradeHorarioOfertaFormacaoUpdate",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputDto,
    @Body() dto: GradeHorarioOfertaFormacaoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toUpdateInput(params, dto);
    const result = await this.gradeHorarioOfertaFormacaoService.update(accessContext, input);
    return GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma grade horario de oferta de formacao",
    operationId: "gradeHorarioOfertaFormacaoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toFindOneInput(params);
    return this.gradeHorarioOfertaFormacaoService.deleteOneById(accessContext, input);
  }
}
