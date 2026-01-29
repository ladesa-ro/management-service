import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/old/infrastructure/access-context";
import { GradeHorarioOfertaFormacaoService } from "@/v2/core/grade-horario-oferta-formacao/application/use-cases/grade-horario-oferta-formacao.service";
import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "./dto";

@ApiTags("grades-horarios-ofertas-formacoes")
@Controller("/grades-horarios-ofertas-formacoes")
export class GradeHorarioOfertaFormacaoController {
  constructor(private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista grades horarios de ofertas de formacoes" })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async gradeHorarioOfertaFormacaoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: GradeHorarioOfertaFormacaoListInputDto,
  ): Promise<GradeHorarioOfertaFormacaoListOutputDto> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindAll(
      accessContext,
      dto,
    );
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma grade horario de oferta de formacao por ID" })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async gradeHorarioOfertaFormacaoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdStrict(
      accessContext,
      params,
    );
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma grade horario de oferta de formacao" })
  @ApiCreatedResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async gradeHorarioOfertaFormacaoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoCreate(
      accessContext,
      dto,
    );
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma grade horario de oferta de formacao" })
  @ApiOkResponse({ type: GradeHorarioOfertaFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async gradeHorarioOfertaFormacaoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputDto,
    @Body() dto: GradeHorarioOfertaFormacaoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoUpdate(accessContext, {
      id: params.id,
      ...dto,
    });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma grade horario de oferta de formacao" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async gradeHorarioOfertaFormacaoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoDeleteOneById(
      accessContext,
      params,
    );
  }
}
