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
  DiarioBatchCreateCommandMetadata,
  IDiarioBatchCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-batch-create.command.handler.interface";
import {
  DiarioCreateCommandMetadata,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import {
  DiarioDeleteCommandMetadata,
  IDiarioDeleteCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import {
  DiarioUpdateCommandMetadata,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import {
  DiarioUpdateImagemCapaCommandMetadata,
  IDiarioUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update-imagem-capa.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import {
  DiarioFindOneQueryMetadata,
  IDiarioFindOneQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  DiarioGetImagemCapaQueryMetadata,
  IDiarioGetImagemCapaQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-get-imagem-capa.query.handler.interface";
import {
  DiarioListQueryMetadata,
  IDiarioListQueryHandler,
} from "@/modules/ensino/diario/domain/queries/diario-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  DiarioBatchCreateInputRestDto,
  DiarioCreateInputRestDto,
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
  DiarioListInputRestDto,
  DiarioListOutputRestDto,
  DiarioUpdateInputRestDto,
} from "./diario.rest.dto";
import * as DiarioRestMapper from "./diario.rest.mapper";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioRestController {
  constructor(
    @Dep(IDiarioListQueryHandler)
    private readonly listHandler: IDiarioListQueryHandler,
    @Dep(IDiarioFindOneQueryHandler)
    private readonly findOneHandler: IDiarioFindOneQueryHandler,
    @Dep(IDiarioCreateCommandHandler)
    private readonly createHandler: IDiarioCreateCommandHandler,
    @Dep(IDiarioBatchCreateCommandHandler)
    private readonly batchCreateHandler: IDiarioBatchCreateCommandHandler,
    @Dep(IDiarioUpdateCommandHandler)
    private readonly updateHandler: IDiarioUpdateCommandHandler,
    @Dep(IDiarioDeleteCommandHandler)
    private readonly deleteHandler: IDiarioDeleteCommandHandler,
    @Dep(IDiarioGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IDiarioGetImagemCapaQueryHandler,
    @Dep(IDiarioUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IDiarioUpdateImagemCapaCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(DiarioListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: DiarioListInputRestDto,
  ): Promise<DiarioListOutputRestDto> {
    const query = DiarioRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return DiarioRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(DiarioFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const query = DiarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Diario.entityName, query.id);
    return DiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/batch")
  @ApiOperation(DiarioBatchCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: [DiarioFindOneOutputRestDto] })
  @ApiForbiddenResponse()
  async batchCreate(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: DiarioBatchCreateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto[]> {
    const command = DiarioRestMapper.batchCreateInputDtoToCommand.map(dto);
    const results = await this.batchCreateHandler.execute(accessContext, command);
    return results.map((r) => DiarioRestMapper.findOneQueryResultToOutputDto.map(r));
  }

  @Post("/")
  @ApiOperation(DiarioCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: DiarioCreateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const command = DiarioRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return DiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(DiarioUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DiarioFindOneInputRestDto,
    @Body() dto: DiarioUpdateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const command = DiarioRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return DiarioRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(DiarioGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ) {
    const queryResult = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(DiarioUpdateImagemCapaCommandMetadata.swaggerMetadata)
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
    @Param() params: DiarioFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(DiarioDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<boolean> {
    const query = DiarioRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
