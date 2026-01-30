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
} from "./usuario.rest.dto";
import { UsuarioRestMapper } from "./usuario.rest.mapper";

@ApiTags("usuarios")
@Controller("/usuarios")
export class UsuarioRestController {
  constructor(private usuarioService: UsuarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista usuarios" })
  @ApiOkResponse({ type: UsuarioListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: UsuarioListInputDto,
  ): Promise<UsuarioListOutputDto> {
    const input = UsuarioRestMapper.toListInput(dto);
    const result = await this.usuarioService.usuarioFindAll(accessContext, input);
    return UsuarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um usuario por ID" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.usuarioService.usuarioFindByIdStrict(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/ensino")
  @ApiOperation({ summary: "Busca dados de ensino de um usuario" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.usuarioService.usuarioEnsinoById(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um usuario" })
  @ApiCreatedResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioRestMapper.toCreateInput(dto);
    const result = await this.usuarioService.usuarioCreate(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um usuario" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
    @Body() dto: UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioRestMapper.toUpdateInput(params, dto);
    const result = await this.usuarioService.usuarioUpdate(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca imagem de capa de um usuario" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
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
  async updateImagemCapa(
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
  async getImagemPerfil(
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
  async updateImagemPerfil(
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
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<boolean> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    return this.usuarioService.usuarioDeleteOneById(accessContext, input);
  }
}
