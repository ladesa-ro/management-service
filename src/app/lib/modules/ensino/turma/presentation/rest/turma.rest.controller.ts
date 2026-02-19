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
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { Express } from "express";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { TurmaService } from "@/modules/ensino/turma/application/use-cases/turma.service";
import {
  TurmaCreateInputRestDto,
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
  TurmaListInputRestDto,
  TurmaListOutputRestDto,
  TurmaUpdateInputRestDto,
} from "./turma.rest.dto";
import { TurmaRestMapper } from "./turma.rest.mapper";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaRestController {
  constructor(private turmaService: TurmaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista turmas", operationId: "turmaFindAll" })
  @ApiOkResponse({ type: TurmaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaListInputRestDto,
  ): Promise<TurmaListOutputRestDto> {
    const input = TurmaRestMapper.toListInput(dto);
    const result = await this.turmaService.findAll(accessContext, input);
    return TurmaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma turma por ID", operationId: "turmaFindById" })
  @ApiOkResponse({ type: TurmaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputRestDto,
  ): Promise<TurmaFindOneOutputRestDto> {
    const input = TurmaRestMapper.toFindOneInput(params);
    const result = await this.turmaService.findByIdStrict(accessContext, input);
    return TurmaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma turma", operationId: "turmaCreate" })
  @ApiCreatedResponse({ type: TurmaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: TurmaCreateInputRestDto,
  ): Promise<TurmaFindOneOutputRestDto> {
    const input = TurmaRestMapper.toCreateInput(dto);
    const result = await this.turmaService.create(accessContext, input);
    return TurmaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma turma", operationId: "turmaUpdate" })
  @ApiOkResponse({ type: TurmaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputRestDto,
    @Body() dto: TurmaUpdateInputRestDto,
  ): Promise<TurmaFindOneOutputRestDto> {
    const input = TurmaRestMapper.toUpdateInput(params, dto);
    const result = await this.turmaService.update(accessContext, input);
    return TurmaRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Busca a imagem de capa de uma turma",
    operationId: "turmaGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputRestDto,
  ) {
    return this.turmaService.getImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define a imagem de capa de uma turma",
    operationId: "turmaUpdateImagemCapa",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor("file"))
  async updateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaFindOneInputRestDto,
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
    @Param() params: TurmaFindOneInputRestDto,
  ): Promise<boolean> {
    const input = TurmaRestMapper.toFindOneInput(params);
    return this.turmaService.deleteOneById(accessContext, input);
  }
}
