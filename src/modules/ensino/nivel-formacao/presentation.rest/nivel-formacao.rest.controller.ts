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
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  INivelFormacaoCreateCommandHandler,
  NivelFormacaoCreateCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import {
  INivelFormacaoDeleteCommandHandler,
  NivelFormacaoDeleteCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import {
  INivelFormacaoUpdateCommandHandler,
  NivelFormacaoUpdateCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import {
  INivelFormacaoUpdateImagemCapaCommandHandler,
  NivelFormacaoUpdateImagemCapaCommandMetadata,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update-imagem-capa.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import {
  INivelFormacaoFindOneQueryHandler,
  NivelFormacaoFindOneQueryMetadata,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import {
  INivelFormacaoGetImagemCapaQueryHandler,
  NivelFormacaoGetImagemCapaQueryMetadata,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-get-imagem-capa.query.handler.interface";
import {
  INivelFormacaoListQueryHandler,
  NivelFormacaoListQueryMetadata,
} from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  NivelFormacaoListInputRestDto,
  NivelFormacaoListOutputRestDto,
  NivelFormacaoUpdateInputRestDto,
} from "./nivel-formacao.rest.dto";
import * as NivelFormacaoRestMapper from "./nivel-formacao.rest.mapper";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoRestController {
  constructor(
    @DeclareDependency(INivelFormacaoListQueryHandler)
    private readonly listHandler: INivelFormacaoListQueryHandler,
    @DeclareDependency(INivelFormacaoFindOneQueryHandler)
    private readonly findOneHandler: INivelFormacaoFindOneQueryHandler,
    @DeclareDependency(INivelFormacaoCreateCommandHandler)
    private readonly createHandler: INivelFormacaoCreateCommandHandler,
    @DeclareDependency(INivelFormacaoUpdateCommandHandler)
    private readonly updateHandler: INivelFormacaoUpdateCommandHandler,
    @DeclareDependency(INivelFormacaoGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: INivelFormacaoGetImagemCapaQueryHandler,
    @DeclareDependency(INivelFormacaoUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: INivelFormacaoUpdateImagemCapaCommandHandler,
    @DeclareDependency(INivelFormacaoDeleteCommandHandler)
    private readonly deleteHandler: INivelFormacaoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(NivelFormacaoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: NivelFormacaoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: NivelFormacaoListInputRestDto,
  ): Promise<NivelFormacaoListOutputRestDto> {
    const query = NivelFormacaoRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return NivelFormacaoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(NivelFormacaoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const query = NivelFormacaoRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, NivelFormacao.entityName, query.id);
    return NivelFormacaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(NivelFormacaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: NivelFormacaoCreateInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const command = NivelFormacaoRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return NivelFormacaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(NivelFormacaoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
    @Body() dto: NivelFormacaoUpdateInputRestDto,
  ): Promise<NivelFormacaoFindOneOutputRestDto> {
    const command = NivelFormacaoRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return NivelFormacaoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(NivelFormacaoGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
  ) {
    const queryResult = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(NivelFormacaoUpdateImagemCapaCommandMetadata.swaggerMetadata)
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
    @Param() params: NivelFormacaoFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(NivelFormacaoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: NivelFormacaoFindOneInputRestDto,
  ): Promise<boolean> {
    const query = NivelFormacaoRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
