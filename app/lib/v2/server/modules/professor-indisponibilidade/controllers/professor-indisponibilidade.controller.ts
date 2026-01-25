import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ProfessorIndisponibilidadeService } from "@/v2/core/professor-indisponibilidade/application/use-cases/professor-indisponibilidade.service";
import {
  ProfessorIndisponibilidadeCreateInputDto,
  ProfessorIndisponibilidadeCreatePerfilInputDto,
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListByPerfilInputDto,
  ProfessorIndisponibilidadeListOutputDto,
  ProfessorIndisponibilidadeRRuleOutputDto,
  ProfessorIndisponibilidadeUpdateInputDto,
} from "@/v2/adapters/in/http/professor-indisponibilidade/dto";

@ApiTags("indisponibilidades-professores")
@Controller("/indisponibilidades")
export class ProfessorIndisponibilidadeController {
  constructor(
    private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeService,
  ) {}

  @Get("/list/:idPerfilFk")
  @ApiOperation({ summary: "Lista indisponibilidades de um professor por perfil" })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async professorIndisponibilidadeListById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeListByPerfilInputDto,
  ): Promise<ProfessorIndisponibilidadeListOutputDto> {
    return this.professorIndisponibilidadeService.ProfessorIndisponibilidadeListByPerfil(
      accessContext,
      params.idPerfilFk,
    );
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma indisponibilidade de professor por ID" })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async professorIndisponibilidadeFindOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    return this.professorIndisponibilidadeService.indisponibilidadeFindByIdSimple(
      accessContext,
      params.id,
    );
  }

  @Post("/:id_perfil/create")
  @ApiOperation({ summary: "Cria uma indisponibilidade de professor" })
  @ApiCreatedResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async professorIndisponibilidadeCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeCreatePerfilInputDto,
    @Body() dto: ProfessorIndisponibilidadeCreateInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    return this.professorIndisponibilidadeService.createIndisponibilidade(accessContext, {
      ...dto,
      idPerfilFk: params.id_perfil,
    });
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma indisponibilidade de professor" })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async professorIndisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputDto,
    @Body() dto: ProfessorIndisponibilidadeUpdateInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    return this.professorIndisponibilidadeService.indisponibilidadeUpdate(accessContext, {
      id: params.id,
      ...dto,
    });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma indisponibilidade de professor" })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async professorIndisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    if (!params.id) throw new BadRequestException();
    return this.professorIndisponibilidadeService.indisponibilidadeDelete(accessContext, params.id);
  }

  @Get("/rrule-indisponibilidade/:id")
  @ApiOperation({ summary: "Busca a RRULE de uma indisponibilidade de professor por ID" })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeRRuleOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async professorIndisponibilidadeRRuleFindOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeRRuleOutputDto> {
    return this.professorIndisponibilidadeService.ProfessorIndisponibilidadeRRuleFindOneById(
      accessContext,
      params.id,
    );
  }
}
