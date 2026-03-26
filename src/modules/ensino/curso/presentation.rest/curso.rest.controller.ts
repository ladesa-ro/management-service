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
  CursoCreateCommandMetadata,
  ICursoCreateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import {
  CursoDeleteCommandMetadata,
  ICursoDeleteCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import {
  CursoUpdateCommandMetadata,
  ICursoUpdateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import {
  CursoUpdateImagemCapaCommandMetadata,
  ICursoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update-imagem-capa.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import {
  CursoFindOneQueryMetadata,
  ICursoFindOneQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import {
  CursoGetImagemCapaQueryMetadata,
  ICursoGetImagemCapaQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-get-imagem-capa.query.handler.interface";
import {
  CursoListQueryMetadata,
  ICursoListQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  CursoCreateInputRestDto,
  CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
  CursoListInputRestDto,
  CursoListOutputRestDto,
  CursoUpdateInputRestDto,
} from "./curso.rest.dto";
import * as CursoRestMapper from "./curso.rest.mapper";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoRestController {
  constructor(
    @DeclareDependency(ICursoListQueryHandler)
    private readonly listHandler: ICursoListQueryHandler,
    @DeclareDependency(ICursoFindOneQueryHandler)
    private readonly findOneHandler: ICursoFindOneQueryHandler,
    @DeclareDependency(ICursoCreateCommandHandler)
    private readonly createHandler: ICursoCreateCommandHandler,
    @DeclareDependency(ICursoUpdateCommandHandler)
    private readonly updateHandler: ICursoUpdateCommandHandler,
    @DeclareDependency(ICursoGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: ICursoGetImagemCapaQueryHandler,
    @DeclareDependency(ICursoUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: ICursoUpdateImagemCapaCommandHandler,
    @DeclareDependency(ICursoDeleteCommandHandler)
    private readonly deleteHandler: ICursoDeleteCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(CursoListQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CursoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: IAccessContext,
    @Query() dto: CursoListInputRestDto,
  ): Promise<CursoListOutputRestDto> {
    const input = CursoRestMapper.toListInput.map(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return CursoRestMapper.toListOutput(result);
  }

  @Get("/:id")
  @ApiOperation(CursoFindOneQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CursoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CursoFindOneInputRestDto,
  ): Promise<CursoFindOneOutputRestDto> {
    const input = CursoRestMapper.toFindOneInput.map(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Curso.entityName, input.id);
    return CursoRestMapper.toFindOneOutput.map(result);
  }

  @Post("/")
  @ApiOperation(CursoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: CursoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: CursoCreateInputRestDto,
  ): Promise<CursoFindOneOutputRestDto> {
    const input = CursoRestMapper.toCreateInput.map(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return CursoRestMapper.toFindOneOutput.map(result);
  }

  @Patch("/:id")
  @ApiOperation(CursoUpdateCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: CursoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CursoFindOneInputRestDto,
    @Body() dto: CursoUpdateInputRestDto,
  ): Promise<CursoFindOneOutputRestDto> {
    const input = CursoRestMapper.toUpdateInput.map({ params, dto });
    const result = await this.updateHandler.execute(accessContext, input);
    return CursoRestMapper.toFindOneOutput.map(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation(CursoGetImagemCapaQueryMetadata.swaggerMetadata)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CursoFindOneInputRestDto,
  ) {
    const result = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(result.stream, {
      type: result.mimeType,
      disposition: result.disposition,
    });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation(CursoUpdateImagemCapaCommandMetadata.swaggerMetadata)
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { file: { type: "string", format: "binary" } },
      required: ["file"],
    },
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor("file"))
  async updateImagemCapa(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CursoFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation(CursoDeleteCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: CursoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = CursoRestMapper.toFindOneInput.map(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
