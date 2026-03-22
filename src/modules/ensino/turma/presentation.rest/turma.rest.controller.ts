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
  StreamableFile,
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
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  ITurmaCreateCommandHandler,
  TurmaCreateCommandMetadata,
} from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import {
  ITurmaDeleteCommandHandler,
  TurmaDeleteCommandMetadata,
} from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import {
  ITurmaUpdateCommandHandler,
  TurmaUpdateCommandMetadata,
} from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import {
  ITurmaUpdateImagemCapaCommandHandler,
  TurmaUpdateImagemCapaCommandMetadata,
} from "@/modules/ensino/turma/domain/commands/turma-update-imagem-capa.command.handler.interface";
import {
  ITurmaFindOneQueryHandler,
  TurmaFindOneQueryMetadata,
} from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import {
  ITurmaGetImagemCapaQueryHandler,
  TurmaGetImagemCapaQueryMetadata,
} from "@/modules/ensino/turma/domain/queries/turma-get-imagem-capa.query.handler.interface";
import {
  ITurmaListQueryHandler,
  TurmaListQueryMetadata,
} from "@/modules/ensino/turma/domain/queries/turma-list.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import {
  IHorarioConsultaQueryHandler,
  TurmaHorarioSemanalQueryMetadata,
} from "@/modules/horarios/horario-consulta";
import {
  HorarioSemanalOutputRestDto,
  HorarioSemanalQueryParamsRestDto,
} from "@/modules/horarios/horario-consulta/presentation.rest";
import { AccessContextHttp } from "@/server/access-context";
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
    @DeclareDependency(ITurmaListQueryHandler)
    private readonly listHandler: ITurmaListQueryHandler,
    @DeclareDependency(ITurmaFindOneQueryHandler)
    private readonly findOneHandler: ITurmaFindOneQueryHandler,
    @DeclareDependency(ITurmaCreateCommandHandler)
    private readonly createHandler: ITurmaCreateCommandHandler,
    @DeclareDependency(ITurmaUpdateCommandHandler)
    private readonly updateHandler: ITurmaUpdateCommandHandler,
    @DeclareDependency(ITurmaGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: ITurmaGetImagemCapaQueryHandler,
    @DeclareDependency(ITurmaUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: ITurmaUpdateImagemCapaCommandHandler,
    @DeclareDependency(ITurmaDeleteCommandHandler)
    private readonly deleteHandler: ITurmaDeleteCommandHandler,
    @DeclareDependency(IHorarioConsultaQueryHandler)
    private readonly horarioConsultaHandler: IHorarioConsultaQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation(TurmaListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: TurmaListInputRestDto,
  ): Promise<TurmaListOutputRestDto> {
    const input = TurmaRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return TurmaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(TurmaFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaFindOneInputRestDto,
  ): Promise<TurmaFindOneOutputRestDto> {
    const input = TurmaRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Turma.entityName, input.id);
    return TurmaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(TurmaCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: TurmaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: TurmaCreateInputRestDto,
  ): Promise<TurmaFindOneOutputRestDto> {
    const input = TurmaRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return TurmaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(TurmaUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaFindOneInputRestDto,
    @Body() dto: TurmaUpdateInputRestDto,
  ): Promise<TurmaFindOneOutputRestDto> {
    const input = TurmaRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return TurmaRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/horario")
  @ApiOperation(TurmaHorarioSemanalQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioSemanalOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioSemanal(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaFindOneInputRestDto,
    @Query() queryParams: HorarioSemanalQueryParamsRestDto,
  ): Promise<HorarioSemanalOutputRestDto> {
    return this.horarioConsultaHandler.findTurmaHorarioSemanal(accessContext, {
      turmaId: params.id,
      semana: queryParams.semana,
    });
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(TurmaGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaFindOneInputRestDto,
  ) {
    const result = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(result.stream, {
      type: result.mimeType,
      disposition: result.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(TurmaUpdateImagemCapaCommandMetadata.swaggerMetadata)
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
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(TurmaDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaFindOneInputRestDto,
  ): Promise<boolean> {
    const input = TurmaRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
