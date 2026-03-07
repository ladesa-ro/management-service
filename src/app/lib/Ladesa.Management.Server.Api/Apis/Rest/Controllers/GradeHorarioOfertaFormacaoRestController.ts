import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  AccessContext,
  AccessContextHttp,
} from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { GradeHorarioOfertaFormacaoService } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import {
  GradeHorarioOfertaFormacaoCreateInputRestDto,
  GradeHorarioOfertaFormacaoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoListInputRestDto,
  GradeHorarioOfertaFormacaoListOutputRestDto,
  GradeHorarioOfertaFormacaoUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/GradeHorarioOfertaFormacaoRestDto";
import { GradeHorarioOfertaFormacaoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/GradeHorarioOfertaFormacaoRestMapper";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoRestController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista grades horarios de ofertas de formacoes",
    operationId: "gradeHorarioOfertaFormacaoFindAll",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: GradeHorarioOfertaFormacaoListInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoListOutputRestDto> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toListInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoService.findAll(accessContext, input);
    return GradeHorarioOfertaFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma grade horario de oferta de formacao por ID",
    operationId: "gradeHorarioOfertaFormacaoFindById",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputRestDto> {
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
  @ApiCreatedResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: GradeHorarioOfertaFormacaoCreateInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputRestDto> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toCreateInput(dto);
    const result = await this.gradeHorarioOfertaFormacaoService.create(accessContext, input);
    return GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma grade horario de oferta de formacao",
    operationId: "gradeHorarioOfertaFormacaoUpdate",
  })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputRestDto,
    @Body() dto: GradeHorarioOfertaFormacaoUpdateInputRestDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputRestDto> {
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
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = GradeHorarioOfertaFormacaoRestMapper.toFindOneInput(params);
    return this.gradeHorarioOfertaFormacaoService.deleteOneById(accessContext, input);
  }
}
