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
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { ICursoDeleteCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { ICursoUpdateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import { ICursoUpdateImagemCapaCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update-imagem-capa.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import { ICursoGetImagemCapaQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-get-imagem-capa.query.handler.interface";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import {
  CursoCreateInputRestDto,
  CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
  CursoListInputRestDto,
  CursoListOutputRestDto,
  CursoUpdateInputRestDto,
} from "./curso.rest.dto";
import { CursoRestMapper } from "./curso.rest.mapper";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoRestController {
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cursos", operationId: "cursoFindAll" })
  @ApiOkResponse({ type: CursoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CursoListInputRestDto,
  ): Promise<CursoListOutputRestDto> {
    const input = CursoRestMapper.toListInput(dto);
    const listHandler = this.container.get<ICursoListQueryHandler>(ICursoListQueryHandler);
    const result = await listHandler.execute(accessContext, input);
    return CursoRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um curso por ID", operationId: "cursoFindById" })
  @ApiOkResponse({ type: CursoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputRestDto,
  ): Promise<CursoFindOneOutputRestDto> {
    const input = CursoRestMapper.toFindOneInput(params);
    const findOneHandler = this.container.get<ICursoFindOneQueryHandler>(ICursoFindOneQueryHandler);
    const result = await findOneHandler.execute(accessContext, input);
    ensureExists(result, Curso.entityName, input.id);
    return CursoRestMapper.toFindOneOutputDto(result as any);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um curso", operationId: "cursoCreate" })
  @ApiCreatedResponse({ type: CursoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CursoCreateInputRestDto,
  ): Promise<CursoFindOneOutputRestDto> {
    const input = CursoRestMapper.toCreateInput(dto);
    const createHandler = this.container.get<ICursoCreateCommandHandler>(
      ICursoCreateCommandHandler,
    );
    const result = await createHandler.execute(accessContext, input);
    return CursoRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um curso", operationId: "cursoUpdate" })
  @ApiOkResponse({ type: CursoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputRestDto,
    @Body() dto: CursoUpdateInputRestDto,
  ): Promise<CursoFindOneOutputRestDto> {
    const input = CursoRestMapper.toUpdateInput(params, dto);
    const updateHandler = this.container.get<ICursoUpdateCommandHandler>(
      ICursoUpdateCommandHandler,
    );
    const result = await updateHandler.execute(accessContext, input);
    return CursoRestMapper.toFindOneOutputDto(result as any);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca imagem de capa de um curso", operationId: "cursoGetImagemCapa" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputRestDto,
  ) {
    const getImagemCapaHandler = this.container.get<ICursoGetImagemCapaQueryHandler>(
      ICursoGetImagemCapaQueryHandler,
    );
    return getImagemCapaHandler.execute(accessContext, { id: params.id });
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define imagem de capa de um curso",
    operationId: "cursoUpdateImagemCapa",
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
    @Param() params: CursoFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    const updateImagemCapaHandler = this.container.get<ICursoUpdateImagemCapaCommandHandler>(
      ICursoUpdateImagemCapaCommandHandler,
    );
    return updateImagemCapaHandler.execute(accessContext, { dto: params, file });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um curso", operationId: "cursoDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = CursoRestMapper.toFindOneInput(params);
    const deleteHandler = this.container.get<ICursoDeleteCommandHandler>(
      ICursoDeleteCommandHandler,
    );
    return deleteHandler.execute(accessContext, input);
  }
}
