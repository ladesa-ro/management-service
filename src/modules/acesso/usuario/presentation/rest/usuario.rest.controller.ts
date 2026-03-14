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
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { IUsuarioDeleteCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import { IUsuarioUpdateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import { IUsuarioUpdateImagemCapaCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-capa.command.handler.interface";
import { IUsuarioUpdateImagemPerfilCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-perfil.command.handler.interface";
import { IUsuarioEnsinoQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { IUsuarioFindOneQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.handler.interface";
import { IUsuarioGetImagemCapaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-capa.query.handler.interface";
import { IUsuarioGetImagemPerfilQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-get-imagem-perfil.query.handler.interface";
import { IUsuarioListQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-list.query.handler.interface";
import {
  UsuarioCreateInputRestDto,
  UsuarioEnsinoOutputRestDto,
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
  UsuarioListInputRestDto,
  UsuarioListOutputRestDto,
  UsuarioUpdateInputRestDto,
} from "./usuario.rest.dto";
import { UsuarioRestMapper } from "./usuario.rest.mapper";

@ApiTags("usuarios")
@Controller("/usuarios")
export class UsuarioRestController {
  constructor(
    @Inject(IUsuarioListQueryHandler)
    private readonly listHandler: IUsuarioListQueryHandler,
    @Inject(IUsuarioFindOneQueryHandler)
    private readonly findOneHandler: IUsuarioFindOneQueryHandler,
    @Inject(IUsuarioEnsinoQueryHandler)
    private readonly ensinoHandler: IUsuarioEnsinoQueryHandler,
    @Inject(IUsuarioGetImagemCapaQueryHandler)
    private readonly getImagemCapaHandler: IUsuarioGetImagemCapaQueryHandler,
    @Inject(IUsuarioGetImagemPerfilQueryHandler)
    private readonly getImagemPerfilHandler: IUsuarioGetImagemPerfilQueryHandler,
    @Inject(IUsuarioCreateCommandHandler)
    private readonly createHandler: IUsuarioCreateCommandHandler,
    @Inject(IUsuarioUpdateCommandHandler)
    private readonly updateHandler: IUsuarioUpdateCommandHandler,
    @Inject(IUsuarioDeleteCommandHandler)
    private readonly deleteHandler: IUsuarioDeleteCommandHandler,
    @Inject(IUsuarioUpdateImagemCapaCommandHandler)
    private readonly updateImagemCapaHandler: IUsuarioUpdateImagemCapaCommandHandler,
    @Inject(IUsuarioUpdateImagemPerfilCommandHandler)
    private readonly updateImagemPerfilHandler: IUsuarioUpdateImagemPerfilCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista usuarios", operationId: "usuarioFindAll" })
  @ApiOkResponse({ type: UsuarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: UsuarioListInputRestDto,
  ): Promise<UsuarioListOutputRestDto> {
    const input = UsuarioRestMapper.toListInput(dto);
    const result = await this.listHandler.execute({ accessContext, dto: input });
    return UsuarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um usuario por ID", operationId: "usuarioFindById" })
  @ApiOkResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.findOneHandler.execute({ accessContext, dto: input });
    ensureExists(result, "Usuario", input.id);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/ensino")
  @ApiOperation({
    summary: "Busca dados de ensino de um usuario (disciplinas, cursos e turmas onde leciona)",
    operationId: "usuarioEnsinoById",
  })
  @ApiOkResponse({ type: UsuarioEnsinoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<UsuarioEnsinoOutputRestDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.ensinoHandler.execute({ accessContext, dto: input });
    return UsuarioRestMapper.toEnsinoOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um usuario", operationId: "usuarioCreate" })
  @ApiCreatedResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: UsuarioCreateInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const input = UsuarioRestMapper.toCreateInput(dto);
    const result = await this.createHandler.execute({ accessContext, dto: input });
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um usuario", operationId: "usuarioUpdate" })
  @ApiOkResponse({ type: UsuarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @Body() dto: UsuarioUpdateInputRestDto,
  ): Promise<UsuarioFindOneOutputRestDto> {
    const input = UsuarioRestMapper.toUpdateInput(params, dto);
    const result = await this.updateHandler.execute({ accessContext, dto: input });
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Busca imagem de capa de um usuario",
    operationId: "usuarioGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ) {
    return this.getImagemCapaHandler.execute({ accessContext, id: params.id });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define imagem de capa de um usuario",
    operationId: "usuarioUpdateImagemCapa",
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
    @Param() params: UsuarioFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemCapaHandler.execute({ accessContext, dto: params, file });
  }

  @Get("/:id/imagem/perfil")
  @ApiOperation({
    summary: "Busca imagem de perfil de um usuario",
    operationId: "usuarioGetImagemPerfil",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemPerfil(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ) {
    return this.getImagemPerfilHandler.execute({ accessContext, id: params.id });
  }

  @Put("/:id/imagem/perfil")
  @ApiOperation({
    summary: "Define imagem de perfil de um usuario",
    operationId: "usuarioUpdateImagemPerfil",
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
  async updateImagemPerfil(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.updateImagemPerfilHandler.execute({ accessContext, dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um usuario", operationId: "usuarioDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputRestDto,
  ): Promise<boolean> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    return this.deleteHandler.execute({ accessContext, dto: input });
  }
}
