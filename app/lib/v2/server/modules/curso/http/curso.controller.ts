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
import { AccessContext, AccessContextHttp } from "@/old/infrastructure/access-context";
import { CursoService } from "@/v2/core/curso/application/use-cases/curso.service";
import {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "./dto";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoController {
  constructor(private cursoService: CursoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cursos" })
  @ApiOkResponse({ type: CursoListOutputDto })
  @ApiForbiddenResponse()
  async cursoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CursoListInputDto,
  ): Promise<CursoListOutputDto> {
    return this.cursoService.cursoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um curso por ID" })
  @ApiOkResponse({ type: CursoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async cursoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
  ): Promise<CursoFindOneOutputDto> {
    return this.cursoService.cursoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um curso" })
  @ApiCreatedResponse({ type: CursoFindOneOutputDto })
  @ApiForbiddenResponse()
  async cursoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CursoCreateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    return this.cursoService.cursoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um curso" })
  @ApiOkResponse({ type: CursoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async cursoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
    @Body() dto: CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    return this.cursoService.cursoUpdate(accessContext, { id: params.id, ...dto });
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca imagem de capa de um curso" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async cursoGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
  ) {
    return this.cursoService.cursoGetImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define imagem de capa de um curso" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async cursoImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.cursoService.cursoUpdateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um curso" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async cursoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
  ): Promise<boolean> {
    return this.cursoService.cursoDeleteOneById(accessContext, params);
  }
}
