import { Controller, Delete, Get, Patch, Post, Put, Query, Body, Param, UploadedFile } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import type { Express } from "express";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaService } from "../domain/turma.service";
import {
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaCreateInputDto,
  TurmaUpdateInputDto,
  TurmaFindOneInputDto,
} from "../dto";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista turmas" })
  @ApiOkResponse({ type: TurmaListOutputDto })
  @ApiForbiddenResponse()
  async turmaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaListInputDto,
  ): Promise<TurmaListOutputDto> {
    return this.turmaService.turmaFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma turma por ID" })
  @ApiOkResponse({ type: TurmaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.turmaService.turmaFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma turma" })
  @ApiCreatedResponse({ type: TurmaFindOneOutputDto })
  @ApiForbiddenResponse()
  async turmaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: TurmaCreateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.turmaService.turmaCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma turma" })
  @ApiOkResponse({ type: TurmaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
    @Body() dto: TurmaUpdateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.turmaService.turmaUpdate(accessContext, { id: params.id, ...dto });
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca a imagem de capa de uma turma" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
  ) {
    return this.turmaService.turmaGetImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define a imagem de capa de uma turma" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.turmaService.turmaUpdateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma turma" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
  ): Promise<boolean> {
    return this.turmaService.turmaDeleteOneById(accessContext, params);
  }
}
