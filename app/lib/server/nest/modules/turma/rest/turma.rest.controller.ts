import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { Express } from "express";
import { TurmaService } from "@/core/turma/application/use-cases/turma.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "./turma.rest.dto";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaRestController {
  constructor(private turmaService: TurmaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista turmas", operationId: "turmaFindAll" })
  @ApiOkResponse({ type: TurmaListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaListInputDto,
  ): Promise<TurmaListOutputDto> {
    return this.turmaService.findAll(accessContext, dto as any) as any;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma turma por ID", operationId: "turmaFindById" })
  @ApiOkResponse({ type: TurmaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.turmaService.findByIdStrict(accessContext, params) as any;
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma turma", operationId: "turmaCreate" })
  @ApiCreatedResponse({ type: TurmaFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: TurmaCreateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.turmaService.create(accessContext, dto as any) as any;
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma turma", operationId: "turmaUpdate" })
  @ApiOkResponse({ type: TurmaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
    @Body() dto: TurmaUpdateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    return this.turmaService.update(accessContext, { id: params.id, ...dto } as any) as any;
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca a imagem de capa de uma turma", operationId: "turmaGetImagemCapa" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
  ) {
    return this.turmaService.getImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define a imagem de capa de uma turma", operationId: "turmaUpdateImagemCapa" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async updateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.turmaService.updateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma turma", operationId: "turmaDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputDto,
  ): Promise<boolean> {
    return this.turmaService.deleteOneById(accessContext, params);
  }
}
