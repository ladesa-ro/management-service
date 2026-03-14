import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { ResourceNotFoundError } from "@/modules/@shared";
import { ITurmaCreateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import { ITurmaDeleteCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import { ITurmaUpdateCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import { ITurmaUpdateImagemCapaCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-update-imagem-capa.command.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ITurmaGetImagemCapaQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-get-imagem-capa.query.handler.interface";
import { ITurmaListQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
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
  constructor(
    @Inject(ITurmaListQueryHandler) private readonly listHandler: ITurmaListQueryHandler,
    @Inject(ITurmaFindOneQueryHandler) private readonly findOneHandler: ITurmaFindOneQueryHandler,
    @Inject(ITurmaCreateCommandHandler) private readonly createHandler: ITurmaCreateCommandHandler,
    @Inject(ITurmaUpdateCommandHandler) private readonly updateHandler: ITurmaUpdateCommandHandler,
    @Inject(ITurmaDeleteCommandHandler) private readonly deleteHandler: ITurmaDeleteCommandHandler,
    @Inject(ITurmaUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: ITurmaUpdateImagemCapaCommandHandler,
    @Inject(ITurmaGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: ITurmaGetImagemCapaQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista turmas", operationId: "turmaFindAll" })
  @ApiOkResponse({ type: TurmaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaListInputRestDto,
  ): Promise<TurmaListOutputRestDto> {
    const input = TurmaRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
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
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    if (!result) {
      throw new ResourceNotFoundError("Turma", input.id);
    }
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
    const result = await this.createHandler.execute({ accessContext, dto: input });
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
    const result = await this.updateHandler.execute({ accessContext, dto: input });
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
    return this.getImagemCapaHandler.execute({ accessContext, id: params.id });
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
    return this.updateImagemCapaHandler.execute({ accessContext, dto: params, file });
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
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
