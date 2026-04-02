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
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import {
  IHorarioConsultaQueryHandler,
  TurmaHorarioSemanalQueryMetadata,
} from "@/modules/calendario/horario-consulta";
import {
  HorarioSemanalOutputRestDto,
  HorarioSemanalQueryParamsRestDto,
} from "@/modules/calendario/horario-consulta/presentation.rest";
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
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  TurmaCreateInputRestDto,
  TurmaFindOneInputRestDto,
  TurmaFindOneOutputRestDto,
  TurmaListInputRestDto,
  TurmaListOutputRestDto,
  TurmaUpdateInputRestDto,
} from "./turma.rest.dto";
import * as TurmaRestMapper from "./turma.rest.mapper";

@ApiTags("turmas")
@Controller("/turmas")
export class TurmaRestController {
  constructor(
    @Dep(ITurmaListQueryHandler)
    private readonly listHandler: ITurmaListQueryHandler,
    @Dep(ITurmaFindOneQueryHandler)
    private readonly findOneHandler: ITurmaFindOneQueryHandler,
    @Dep(ITurmaCreateCommandHandler)
    private readonly createHandler: ITurmaCreateCommandHandler,
    @Dep(ITurmaUpdateCommandHandler)
    private readonly updateHandler: ITurmaUpdateCommandHandler,
    @Dep(ITurmaGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: ITurmaGetImagemCapaQueryHandler,
    @Dep(ITurmaUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: ITurmaUpdateImagemCapaCommandHandler,
    @Dep(ITurmaDeleteCommandHandler)
    private readonly deleteHandler: ITurmaDeleteCommandHandler,
    @Dep(IHorarioConsultaQueryHandler)
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
    const query = TurmaRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return TurmaRestMapper.listQueryResultToListOutputDto(queryResult);
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
    const query = TurmaRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Turma.entityName, query.id);
    return TurmaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(TurmaCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: TurmaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: TurmaCreateInputRestDto,
  ): Promise<TurmaFindOneOutputRestDto> {
    const command = TurmaRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return TurmaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
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
    const command = TurmaRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return TurmaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
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
    const queryResult = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
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
    const query = TurmaRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
