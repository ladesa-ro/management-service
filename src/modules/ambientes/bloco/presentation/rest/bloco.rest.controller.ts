import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
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
  constructor(
    @Inject(IBlocoListQueryHandler) private readonly listHandler: IBlocoListQueryHandler,
    @Inject(IBlocoFindOneQueryHandler) private readonly findOneHandler: IBlocoFindOneQueryHandler,
    @Inject(IBlocoCreateCommandHandler) private readonly createHandler: IBlocoCreateCommandHandler,
    @Inject(IBlocoUpdateCommandHandler) private readonly updateHandler: IBlocoUpdateCommandHandler,
    @Inject(IBlocoDeleteCommandHandler) private readonly deleteHandler: IBlocoDeleteCommandHandler,
    @Inject(IBlocoUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IBlocoUpdateImagemCapaCommandHandler,
    @Inject(IBlocoGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IBlocoGetImagemCapaQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista blocos", operationId: "blocoFindAll" })
  @ApiOkResponse({ type: BlocoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: BlocoListInputRestDto,
  ): Promise<BlocoListOutputRestDto> {
    const input = BlocoRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
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
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    if (!result) {
      throw new ResourceNotFoundError("Bloco", input.id);
    }
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
    const result = await this.createHandler.execute({ accessContext, dto: input });
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
    const result = await this.updateHandler.execute({ accessContext, dto: input });
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
    return this.getImagemCapaHandler.execute({ accessContext, id: params.id });
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
    return this.updateImagemCapaHandler.execute({ accessContext, dto: params, file });
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
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
