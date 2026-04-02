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
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import {
  BlocoCreateCommandMetadata,
  IBlocoCreateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import {
  BlocoDeleteCommandMetadata,
  IBlocoDeleteCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import {
  BlocoUpdateCommandMetadata,
  IBlocoUpdateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import {
  BlocoUpdateImagemCapaCommandMetadata,
  IBlocoUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update-imagem-capa.command.handler.interface";
import {
  BlocoFindOneQueryMetadata,
  IBlocoFindOneQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import {
  BlocoGetImagemCapaQueryMetadata,
  IBlocoGetImagemCapaQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-get-imagem-capa.query.handler.interface";
import {
  BlocoListQueryMetadata,
  IBlocoListQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  BlocoCreateInputRestDto,
  BlocoFindOneInputRestDto,
  BlocoFindOneOutputRestDto,
  BlocoListInputRestDto,
  BlocoListOutputRestDto,
  BlocoUpdateInputRestDto,
} from "./bloco.rest.dto";
import * as BlocoRestMapper from "./bloco.rest.mapper";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoRestController {
  constructor(
    @Dep(IBlocoListQueryHandler)
    private readonly listHandler: IBlocoListQueryHandler,
    @Dep(IBlocoFindOneQueryHandler)
    private readonly findOneHandler: IBlocoFindOneQueryHandler,
    @Dep(IBlocoCreateCommandHandler)
    private readonly createHandler: IBlocoCreateCommandHandler,
    @Dep(IBlocoUpdateCommandHandler)
    private readonly updateHandler: IBlocoUpdateCommandHandler,
    @Dep(IBlocoGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IBlocoGetImagemCapaQueryHandler,
    @Dep(IBlocoUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IBlocoUpdateImagemCapaCommandHandler,
    @Dep(IBlocoDeleteCommandHandler)
    private readonly deleteHandler: IBlocoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(BlocoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: BlocoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: BlocoListInputRestDto,
  ): Promise<BlocoListOutputRestDto> {
    const query = BlocoRestMapper.listInputDtoToListQuery.map(dto);
    const queryResult = await this.listHandler.execute(accessContext, query);
    return BlocoRestMapper.listQueryResultToListOutputDto(queryResult);
  }

  @Get("/:id")
  @ApiOperation(BlocoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const query = BlocoRestMapper.findOneInputDtoToFindOneQuery.map(params);
    const queryResult = await this.findOneHandler.execute(accessContext, query);
    ensureExists(queryResult, Bloco.entityName, query.id);
    return BlocoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Post("/")
  @ApiOperation(BlocoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: BlocoCreateInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const command = BlocoRestMapper.createInputDtoToCreateCommand.map(dto);
    const queryResult = await this.createHandler.execute(accessContext, command);
    return BlocoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Patch("/:id")
  @ApiOperation(BlocoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: BlocoFindOneInputRestDto,
    @Body() dto: BlocoUpdateInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const command = BlocoRestMapper.updateInputDtoToUpdateCommand.map({ params, dto });
    const queryResult = await this.updateHandler.execute(accessContext, command);
    return BlocoRestMapper.findOneQueryResultToOutputDto.map(queryResult);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(BlocoGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ) {
    const queryResult = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(queryResult.stream, {
      type: queryResult.mimeType,
      disposition: queryResult.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(BlocoUpdateImagemCapaCommandMetadata.swaggerMetadata)
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
    @Param() params: BlocoFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(BlocoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ): Promise<boolean> {
    const query = BlocoRestMapper.findOneInputDtoToFindOneQuery.map(params);
    return this.deleteHandler.execute(accessContext, query);
  }
}
