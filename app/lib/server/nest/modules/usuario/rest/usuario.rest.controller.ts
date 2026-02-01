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
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { UsuarioService } from "@/modules/usuario/application/use-cases/usuario.service";
import {
  UsuarioCreateInputDto,
  UsuarioEnsinoOutputDto,
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
  @ApiOperation({ summary: "Lista usuarios", operationId: "usuarioFindAll" })
  @ApiOkResponse({ type: UsuarioListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: UsuarioListInputDto,
  ): Promise<UsuarioListOutputDto> {
    const input = UsuarioRestMapper.toListInput(dto);
    const result = await this.usuarioService.findAll(accessContext, input);
    return UsuarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um usuario por ID", operationId: "usuarioFindById" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.usuarioService.findByIdStrict(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/ensino")
  @ApiOperation({
    summary: "Busca dados de ensino de um usuario (disciplinas, cursos e turmas onde leciona)",
    operationId: "usuarioEnsinoById",
  })
  @ApiOkResponse({ type: UsuarioEnsinoOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ensinoById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<UsuarioEnsinoOutputDto> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    const result = await this.usuarioService.usuarioEnsinoById(accessContext, input);
    return UsuarioRestMapper.toEnsinoOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um usuario", operationId: "usuarioCreate" })
  @ApiCreatedResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioRestMapper.toCreateInput(dto);
    const result = await this.usuarioService.create(accessContext, input);
    return UsuarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um usuario", operationId: "usuarioUpdate" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
    @Body() dto: UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto> {
    const input = UsuarioRestMapper.toUpdateInput(params, dto);
    const result = await this.usuarioService.update(accessContext, input);
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
    @Param() params: UsuarioFindOneInputDto,
  ) {
    return this.usuarioService.getImagemCapa(accessContext, params.id);
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
    @Param() params: UsuarioFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.usuarioService.updateImagemCapa(accessContext, params, file);
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
    @Param() params: UsuarioFindOneInputDto,
  ) {
    return this.usuarioService.getImagemPerfil(accessContext, params.id);
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
    @Param() params: UsuarioFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.usuarioService.updateImagemPerfil(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um usuario", operationId: "usuarioDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: UsuarioFindOneInputDto,
  ): Promise<boolean> {
    const input = UsuarioRestMapper.toFindOneInput(params);
    return this.usuarioService.deleteOneById(accessContext, input);
  }
}
