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
import { AccessContext, AccessContextHttp } from "@/modules/@core/contexto-acesso";
import { ProfessorIndisponibilidadeLegacyService } from "../professor-indisponibilidade.legacy.service";
import {
  ProfessorIndisponibilidadeCreateInputRestDto,
  ProfessorIndisponibilidadeCreatePerfilInputRestDto,
  ProfessorIndisponibilidadeFindOneInputRestDto,
  ProfessorIndisponibilidadeFindOneOutputRestDto,
  ProfessorIndisponibilidadeListByPerfilInputRestDto,
  ProfessorIndisponibilidadeListOutputRestDto,
  ProfessorIndisponibilidadeRRuleOutputRestDto,
  ProfessorIndisponibilidadeUpdateInputRestDto,
} from "./professor-indisponibilidade.rest.dto";

@ApiTags("indisponibilidades-professores")
@Controller("/indisponibilidades")
export class ProfessorIndisponibilidadeRestController {
  constructor(
    private readonly professorIndisponibilidadeService: ProfessorIndisponibilidadeLegacyService,
  ) {}

  @Get("/list/:idPerfilFk")
  @ApiOperation({
    summary: "Lista indisponibilidades de um professor por perfil",
    operationId: "professorIndisponibilidadeFindAllByPerfilId",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async listByPerfil(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeListByPerfilInputRestDto,
  ): Promise<ProfessorIndisponibilidadeListOutputRestDto> {
    return this.professorIndisponibilidadeService.ProfessorIndisponibilidadeListByPerfil(
      accessContext,
      params.idPerfilFk,
    );
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma indisponibilidade de professor por ID",
    operationId: "professorIndisponibilidadeFindById",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputRestDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    return this.professorIndisponibilidadeService.indisponibilidadeFindByIdSimple(
      accessContext,
      params.id,
    );
  }

  @Post("/:id_perfil/create")
  @ApiOperation({
    summary: "Cria uma indisponibilidade de professor",
    operationId: "professorIndisponibilidadeCreate",
  })
  @ApiCreatedResponse({ type: ProfessorIndisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeCreatePerfilInputRestDto,
    @Body() dto: ProfessorIndisponibilidadeCreateInputRestDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    return this.professorIndisponibilidadeService.createIndisponibilidade(accessContext, {
      ...dto,
      idPerfilFk: params.id_perfil,
    });
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma indisponibilidade de professor",
    operationId: "professorIndisponibilidadeUpdate",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputRestDto,
    @Body() dto: ProfessorIndisponibilidadeUpdateInputRestDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    return this.professorIndisponibilidadeService.indisponibilidadeUpdate(accessContext, {
      id: params.id,
      ...dto,
    });
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma indisponibilidade de professor",
    operationId: "professorIndisponibilidadeDeleteOneById",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputRestDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputRestDto> {
    if (!params.id) throw new BadRequestException();
    return this.professorIndisponibilidadeService.indisponibilidadeDelete(accessContext, params.id);
  }

  @Get("/rrule-indisponibilidade/:id")
  @ApiOperation({
    summary: "Busca a RRULE de uma indisponibilidade de professor por ID",
    operationId: "professorIndisponibilidadeGetRrule",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeRRuleOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findRRuleById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputRestDto,
  ): Promise<ProfessorIndisponibilidadeRRuleOutputRestDto> {
    return this.professorIndisponibilidadeService.ProfessorIndisponibilidadeRRuleFindOneById(
      accessContext,
      params.id,
    );
  }
}
