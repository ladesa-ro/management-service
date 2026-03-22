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
import { AccessContextHttp } from "@/server/access-context";
import {
  DisciplinaCreateInputRestDto,
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
  DisciplinaListInputRestDto,
  DisciplinaListOutputRestDto,
  DisciplinaUpdateInputRestDto,
} from "./disciplina.rest.dto";
import { DisciplinaRestMapper } from "./disciplina.rest.mapper";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaRestController {
  constructor(
    @DeclareDependency(IDisciplinaListQueryHandler)
    private readonly listHandler: IDisciplinaListQueryHandler,
    @DeclareDependency(IDisciplinaFindOneQueryHandler)
    private readonly findOneHandler: IDisciplinaFindOneQueryHandler,
    @DeclareDependency(IDisciplinaCreateCommandHandler)
    private readonly createHandler: IDisciplinaCreateCommandHandler,
    @DeclareDependency(IDisciplinaUpdateCommandHandler)
    private readonly updateHandler: IDisciplinaUpdateCommandHandler,
    @DeclareDependency(IDisciplinaGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IDisciplinaGetImagemCapaQueryHandler,
    @DeclareDependency(IDisciplinaUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IDisciplinaUpdateImagemCapaCommandHandler,
    @DeclareDependency(IDisciplinaDeleteCommandHandler)
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
    const input = DisciplinaRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input);
    return DisciplinaRestMapper.toListOutputDto(result);
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
    const input = DisciplinaRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute(accessContext, input);
    ensureExists(result, Disciplina.entityName, input.id);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation(DisciplinaCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: DisciplinaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: DisciplinaCreateInputRestDto,
  ): Promise<DisciplinaFindOneOutputRestDto> {
    const input = DisciplinaRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute(accessContext, input);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
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
    const input = DisciplinaRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute(accessContext, input);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
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
    const result = await this.getImagemCapaHandler.execute(accessContext, { id: params.id });
    return new StreamableFile(result.stream, {
      type: result.mimeType,
      disposition: result.disposition,
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
    const input = DisciplinaRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute(accessContext, input);
  }
}
