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
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { UsuarioService } from "@/core/usuario/application/use-cases/usuario.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  UsuarioCreateInputDto,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
  UsuarioUpdateInputDto,
} from "./dto";

@ApiTags("usuarios")
@Controller("/usuarios")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista usuarios" })
  @ApiOkResponse({ type: UsuarioListOutputDto })
  @ApiForbiddenResponse()
  async usuarioFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: UsuarioListInputDto,
  ): Promise<UsuarioListOutputDto> {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um usuario por ID" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, params);
  }

  @Get("/:id/ensino")
  @ApiOperation({ summary: "Busca dados de ensino de um usuario" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioEnsinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    return this.usuarioService.usuarioEnsinoById(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um usuario" })
  @ApiCreatedResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  async usuarioCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um usuario" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
    @Body() dto: UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    return this.usuarioService.usuarioUpdate(accessContext, { id: params.id, ...dto });
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca imagem de capa de um usuario" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define imagem de capa de um usuario" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.usuarioService.usuarioUpdateImagemCapa(accessContext, params, file);
  }

  @Get("/:id/imagem/perfil")
  @ApiOperation({ summary: "Busca imagem de perfil de um usuario" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioGetImagemPerfil(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, params.id);
  }

  @Put("/:id/imagem/perfil")
  @ApiOperation({ summary: "Define imagem de perfil de um usuario" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioImagemPerfilSave(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um usuario" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async usuarioDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<boolean> {
    return this.usuarioService.usuarioDeleteOneById(accessContext, params);
  }
}
