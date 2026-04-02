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
  DisciplinaCreateCommandMetadata,
  IDisciplinaCreateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-create.command.handler.interface";
import {
  DisciplinaDeleteCommandMetadata,
  IDisciplinaDeleteCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import {
  DisciplinaUpdateCommandMetadata,
  IDisciplinaUpdateCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update.command.handler.interface";
import {
  DisciplinaUpdateImagemCapaCommandMetadata,
  IDisciplinaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-update-imagem-capa.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import {
  DisciplinaFindOneQueryMetadata,
  IDisciplinaFindOneQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import {
  DisciplinaGetImagemCapaQueryMetadata,
  IDisciplinaGetImagemCapaQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-get-imagem-capa.query.handler.interface";
import {
  DisciplinaListQueryMetadata,
  IDisciplinaListQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  DisciplinaCreateInputRestDto,
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
  DisciplinaListInputRestDto,
  DisciplinaListOutputRestDto,
  DisciplinaUpdateInputRestDto,
} from "./disciplina.rest.dto";
import * as DisciplinaRestMapper from "./disciplina.rest.mapper";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaRestController {
  constructor(
    @Dep(IDisciplinaListQueryHandler)
    private readonly listHandler: IDisciplinaListQueryHandler,
    @Dep(IDisciplinaFindOneQueryHandler)
    private readonly findOneHandler: IDisciplinaFindOneQueryHandler,
    @Dep(IDisciplinaCreateCommandHandler)
    private readonly createHandler: IDisciplinaCreateCommandHandler,
    @Dep(IDisciplinaUpdateCommandHandler)
    private readonly updateHandler: IDisciplinaUpdateCommandHandler,
    @Dep(IDisciplinaGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IDisciplinaGetImagemCapaQueryHandler,
    @Dep(IDisciplinaUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IDisciplinaUpdateImagemCapaCommandHandler,
    @Dep(IDisciplinaDeleteCommandHandler)
    private readonly deleteHandler: IDisciplinaDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(DisciplinaListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DisciplinaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: DisciplinaListInputRestDto,
  ): Promise<DisciplinaListOutputRestDto> {
    const query = DisciplinaRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return DisciplinaRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(DisciplinaFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DisciplinaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
  ): Promise<DisciplinaFindOneOutputRestDto> {
    const query = DisciplinaRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Disciplina.entityName, query.id);
    return DisciplinaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(DisciplinaCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: DisciplinaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: DisciplinaCreateInputRestDto,
  ): Promise<DisciplinaFindOneOutputRestDto> {
    const command = DisciplinaRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return DisciplinaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(DisciplinaUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: DisciplinaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
    @Body() dto: DisciplinaUpdateInputRestDto,
  ): Promise<DisciplinaFindOneOutputRestDto> {
    const command = DisciplinaRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return DisciplinaRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(DisciplinaGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
  ) {
    const queryResult = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(DisciplinaUpdateImagemCapaCommandMetadata.swaggerMetadata)
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
    @Param() params: DisciplinaFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(DisciplinaDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
  ): Promise<boolean> {
    const query = DisciplinaRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
