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
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
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
    @DeclareDependency(IAmbienteListQueryHandler)
    private readonly listHandler: IAmbienteListQueryHandler,
    @DeclareDependency(IAmbienteFindOneQueryHandler)
    private readonly findOneHandler: IAmbienteFindOneQueryHandler,
    @DeclareDependency(IAmbienteCreateCommandHandler)
    private readonly createHandler: IAmbienteCreateCommandHandler,
    @DeclareDependency(IAmbienteUpdateCommandHandler)
    private readonly updateHandler: IAmbienteUpdateCommandHandler,
    @DeclareDependency(IAmbienteGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IAmbienteGetImagemCapaQueryHandler,
    @DeclareDependency(IAmbienteUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IAmbienteUpdateImagemCapaCommandHandler,
    @DeclareDependency(IAmbienteDeleteCommandHandler)
    private readonly deleteHandler: IAmbienteDeleteCommandHandler,
  ) {}

  @Get("/disponiveis")
  @ApiOperation({ summary: "Lista ambientes disponiveis", operationId: "ambienteListDisponiveis" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async listDisponiveis(@AccessContextHttp() _accessContext: AccessContext) {
    // Placeholder: returns empty array
    return { data: [] };
  }

  @Get("/")
  @ApiOperation({ summary: "Lista ambientes", operationId: "ambienteFindAll" })
  @ApiOkResponse({ type: AmbienteListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: AmbienteListInputRestDto,
  ): Promise<AmbienteListOutputRestDto> {
    const input = AmbienteRestMapper.toListInput(dto);
    const result = await this.listHandler.execute(accessContext, input as any);
    return AmbienteRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id/disponibilidade")
  @ApiOperation({
    summary: "Grade de disponibilidade de um ambiente",
    operationId: "ambienteGetDisponibilidade",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getDisponibilidade(
    @AccessContextHttp() _accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputRestDto,
  ) {
    // Placeholder: returns empty availability grid
    return { data: [], ambienteId: params.id };
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
    const result = await this.findOneHandler.execute(accessContext, input as any);
    ensureExists(result, Ambiente.entityName, input.id);
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
    const result = await this.createHandler.execute(accessContext, input as any);
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
    const result = await this.updateHandler.execute(accessContext, input as any);
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
    return this.getImagemCapaHandler.execute(accessContext, { id: params.id });
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
    return this.updateImagemCapaHandler.execute(accessContext, { dto: params, file });
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
    return this.deleteHandler.execute(accessContext, input as any);
  }
}
