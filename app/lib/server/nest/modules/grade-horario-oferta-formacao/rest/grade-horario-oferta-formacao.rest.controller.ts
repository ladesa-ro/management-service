import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { GradeHorarioOfertaFormacaoService } from "@/modules/grade-horario-oferta-formacao";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "./grade-horario-oferta-formacao.rest.dto";

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
    return this.gradeHorarioOfertaFormacaoService.findAll(
      accessContext,
      dto as any,
    ) as unknown as Promise<GradeHorarioOfertaFormacaoListOutputDto>;
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
    return this.gradeHorarioOfertaFormacaoService.findByIdStrict(
      accessContext,
      params as any,
    ) as unknown as Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;
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
    return this.gradeHorarioOfertaFormacaoService.create(
      accessContext,
      dto as any,
    ) as unknown as Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;
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
    return this.gradeHorarioOfertaFormacaoService.update(accessContext, {
      id: params.id,
      ...dto,
    } as any) as unknown as Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;
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
    return this.gradeHorarioOfertaFormacaoService.deleteOneById(accessContext, params as any);
  }
}
