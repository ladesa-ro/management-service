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
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import { ProfessorIndisponibilidadeLegacyService } from "../professor-indisponibilidade.legacy.service";
import {
  ProfessorIndisponibilidadeCreateInputDto,
  ProfessorIndisponibilidadeCreatePerfilInputDto,
  ProfessorIndisponibilidadeFindOneInputDto,
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListByPerfilInputDto,
  ProfessorIndisponibilidadeListOutputDto,
  ProfessorIndisponibilidadeRRuleOutputDto,
  ProfessorIndisponibilidadeUpdateInputDto,
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
  @ApiOkResponse({ type: ProfessorIndisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async listByPerfil(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeListByPerfilInputDto,
  ): Promise<ProfessorIndisponibilidadeListOutputDto> {
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
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
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
  @ApiCreatedResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
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
  @ApiOperation({
    summary: "Atualiza uma indisponibilidade de professor",
    operationId: "professorIndisponibilidadeUpdate",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
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
  @ApiOperation({
    summary: "Remove uma indisponibilidade de professor",
    operationId: "professorIndisponibilidadeDeleteOneById",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeFindOneOutputDto> {
    if (!params.id) throw new BadRequestException();
    return this.professorIndisponibilidadeService.indisponibilidadeDelete(accessContext, params.id);
  }

  @Get("/rrule-indisponibilidade/:id")
  @ApiOperation({
    summary: "Busca a RRULE de uma indisponibilidade de professor por ID",
    operationId: "professorIndisponibilidadeGetRrule",
  })
  @ApiOkResponse({ type: ProfessorIndisponibilidadeRRuleOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findRRuleById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ProfessorIndisponibilidadeFindOneInputDto,
  ): Promise<ProfessorIndisponibilidadeRRuleOutputDto> {
    return this.professorIndisponibilidadeService.ProfessorIndisponibilidadeRRuleFindOneById(
      accessContext,
      params.id,
    );
  }
}
