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
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import { IBlocoCreateCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import { IBlocoDeleteCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import { IBlocoUpdateCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import { IBlocoUpdateImagemCapaCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-update-imagem-capa.command.handler.interface";
import { IBlocoFindOneQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-find-one.query.handler.interface";
import { IBlocoGetImagemCapaQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-get-imagem-capa.query.handler.interface";
import { IBlocoListQueryHandler } from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.handler.interface";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista blocos", operationId: "blocoFindAll" })
  @ApiOkResponse({ type: BlocoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: BlocoListInputRestDto,
  ): Promise<BlocoListOutputRestDto> {
    const input = BlocoRestMapper.toListInput(dto);
    const listHandler = this.container.get<IBlocoListQueryHandler>(IBlocoListQueryHandler);
    const result = await listHandler.execute({ accessContext, dto: input });
    return BlocoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um bloco por ID", operationId: "blocoFindById" })
  @ApiOkResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const input = BlocoRestMapper.toFindOneInput(params);
    const findOneHandler = this.container.get<IBlocoFindOneQueryHandler>(IBlocoFindOneQueryHandler);
    const result = await findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, Bloco.entityName, input.id);
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um bloco", operationId: "blocoCreate" })
  @ApiCreatedResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: BlocoCreateInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const input = BlocoRestMapper.toCreateInput(dto);
    const createHandler = this.container.get<IBlocoCreateCommandHandler>(
      IBlocoCreateCommandHandler,
    );
    const result = await createHandler.execute({ accessContext, dto: input });
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um bloco", operationId: "blocoUpdate" })
  @ApiOkResponse({ type: BlocoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
    @Body() dto: BlocoUpdateInputRestDto,
  ): Promise<BlocoFindOneOutputRestDto> {
    const input = BlocoRestMapper.toUpdateInput(params, dto);
    const updateHandler = this.container.get<IBlocoUpdateCommandHandler>(
      IBlocoUpdateCommandHandler,
    );
    const result = await updateHandler.execute({ accessContext, dto: input });
    return BlocoRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Obtem a imagem de capa de um bloco",
    operationId: "blocoGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ) {
    const getImagemCapaHandler = this.container.get<IBlocoGetImagemCapaQueryHandler>(
      IBlocoGetImagemCapaQueryHandler,
    );
    return getImagemCapaHandler.execute({ accessContext, id: params.id });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define a imagem de capa de um bloco",
    operationId: "blocoUpdateImagemCapa",
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
    @Param() params: BlocoFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    const updateImagemCapaHandler = this.container.get<IBlocoUpdateImagemCapaCommandHandler>(
      IBlocoUpdateImagemCapaCommandHandler,
    );
    return updateImagemCapaHandler.execute({ accessContext, dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um bloco", operationId: "blocoDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = BlocoRestMapper.toFindOneInput(params);
    const deleteHandler = this.container.get<IBlocoDeleteCommandHandler>(
      IBlocoDeleteCommandHandler,
    );
    return deleteHandler.execute({ accessContext, dto: input });
  }
}
