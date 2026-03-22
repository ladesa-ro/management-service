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
import { DeclareDependency } from "@/domain/dependency-injection";
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
import { AccessContext, AccessContextHttp } from "@/server/access-context";
import {
  BlocoCreateInputRestDto,
  BlocoFindOneInputRestDto,
  BlocoFindOneOutputRestDto,
  BlocoListInputRestDto,
  BlocoListOutputRestDto,
  BlocoUpdateInputRestDto,
} from "./bloco.rest.dto";
import { BlocoRestMapper } from "./bloco.rest.mapper";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoRestController {
  constructor(
    @DeclareDependency(IBlocoListQueryHandler)
    private readonly listHandler: IBlocoListQueryHandler,
    @DeclareDependency(IBlocoFindOneQueryHandler)
    private readonly findOneHandler: IBlocoFindOneQueryHandler,
    @DeclareDependency(IBlocoCreateCommandHandler)
    private readonly createHandler: IBlocoCreateCommandHandler,
    @DeclareDependency(IBlocoUpdateCommandHandler)
    private readonly updateHandler: IBlocoUpdateCommandHandler,
    @DeclareDependency(IBlocoGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IBlocoGetImagemCapaQueryHandler,
    @DeclareDependency(IBlocoUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IBlocoUpdateImagemCapaCommandHandler,
    @DeclareDependency(IBlocoDeleteCommandHandler)
    private readonly deleteHandler: IBlocoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(BlocoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: BlocoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: BlocoListInputRestDto,
  ): Promise<BlocoListOutputRestDto> {
    const input = BlocoRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return BlocoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation(BlocoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const input = BlocoRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Bloco.entityName, input.id);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(BlocoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: BlocoCreateInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const input = BlocoRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation(BlocoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
    @Body() dto: BlocoUpdateInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const input = BlocoRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(BlocoGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ) {
    const result = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(result.stream, {
      type: result.mimeType,
      disposition: result.disposition,
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
    @AccessContextHttp() accessContext: AccessContext,
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
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = BlocoRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
