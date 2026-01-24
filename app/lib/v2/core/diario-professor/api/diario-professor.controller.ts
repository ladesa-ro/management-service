import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioProfessorService } from "../domain/diario-professor.service";
import {
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorCreateInputDto,
  DiarioProfessorUpdateInputDto,
  DiarioProfessorFindOneInputDto,
} from "../dto";

@ApiTags("diarios-professores")
@Controller("/diarios-professores")
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios professores" })
  @ApiOkResponse({ type: DiarioProfessorListOutputDto })
  @ApiForbiddenResponse()
  async diarioProfessorFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioProfessorListInputDto,
  ): Promise<DiarioProfessorListOutputDto> {
    return this.diarioProfessorService.diarioProfessorFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um diario professor por ID" })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioProfessorFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario professor" })
  @ApiCreatedResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  async diarioProfessorCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioProfessorCreateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.diarioProfessorService.diarioProfessorCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario professor" })
  @ApiOkResponse({ type: DiarioProfessorFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioProfessorUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
    @Body() dto: DiarioProfessorUpdateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.diarioProfessorService.diarioProfessorUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um diario professor" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioProfessorDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioProfessorFindOneInputDto,
  ): Promise<boolean> {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(accessContext, params);
  }
}
