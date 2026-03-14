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
import { ensureExists } from "@/modules/@shared";
import { IAmbienteCreateCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-create.command.handler.interface";
import { IAmbienteDeleteCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import { IAmbienteUpdateCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import { IAmbienteUpdateImagemCapaCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-update-imagem-capa.command.handler.interface";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { IAmbienteGetImagemCapaQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-get-imagem-capa.query.handler.interface";
import { IAmbienteListQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.handler.interface";
import {
  AmbienteCreateInputRestDto,
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
  AmbienteListInputRestDto,
  AmbienteListOutputRestDto,
  AmbienteUpdateInputRestDto,
} from "./ambiente.rest.dto";
import { AmbienteRestMapper } from "./ambiente.rest.mapper";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteRestController {
  constructor(
    @Inject(IAmbienteListQueryHandler) private readonly listHandler: IAmbienteListQueryHandler,
    @Inject(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @Inject(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @Inject(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @Inject(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
    @Inject(IAmbienteUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IAmbienteUpdateImagemCapaCommandHandler,
    @Inject(IAmbienteGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IAmbienteGetImagemCapaQueryHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ambientes", operationId: "ambienteFindAll" })
  @ApiOkResponse({ type: AmbienteListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: AmbienteListInputRestDto,
  ): Promise<AmbienteListOutputRestDto> {
    const input = AmbienteRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input as any });
    return AmbienteRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um ambiente por ID", operationId: "ambienteFindById" })
  @ApiOkResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const input = AmbienteRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input as any });
    ensureExists(result, "Ambiente", input.id);
    return AmbienteRestMapper.toFindOneOutputDto(result as any);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um ambiente", operationId: "ambienteCreate" })
  @ApiCreatedResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AmbienteCreateInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const input = AmbienteRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input as any });
    return AmbienteRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um ambiente", operationId: "ambienteUpdate" })
  @ApiOkResponse({ type: AmbienteFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
    @Body() dto: AmbienteUpdateInputRestDto,
  ): Promise<AmbienteFindOneOutputRestDto> {
    const input = AmbienteRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input as any });
    return AmbienteRestMapper.toFindOneOutputDto(result as any);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Obtem a imagem de capa de um ambiente",
    operationId: "ambienteGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ) {
    return this.getImagemCapaHandler.execute({ accessContext, id: params.id });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define a imagem de capa de um ambiente",
    operationId: "ambienteUpdateImagemCapa",
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
    @Param() params: AmbienteFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute({ accessContext, dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um ambiente", operationId: "ambienteDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ): Promise<boolean> {
    const input = AmbienteRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute({ accessContext, dto: input as any });
  }
}
