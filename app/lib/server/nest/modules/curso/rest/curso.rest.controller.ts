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
import { CursoService } from "@/core/curso";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "./curso.rest.dto";
import { CursoRestMapper } from "./curso.rest.mapper";

@ApiTags("cursos")
@Controller("/cursos")
export class CursoRestController {
  constructor(private cursoService: CursoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cursos", operationId: "cursoFindAll" })
  @ApiOkResponse({ type: CursoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CursoListInputDto,
  ): Promise<CursoListOutputDto> {
    const input = CursoRestMapper.toListInput(dto);
    const result = await this.cursoService.findAll(accessContext, input as any);
    return CursoRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um curso por ID", operationId: "cursoFindById" })
  @ApiOkResponse({ type: CursoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
  ): Promise<CursoFindOneOutputDto> {
    const input = CursoRestMapper.toFindOneInput(params);
    const result = await this.cursoService.findByIdStrict(accessContext, input as any);
    return CursoRestMapper.toFindOneOutputDto(result as any);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um curso", operationId: "cursoCreate" })
  @ApiCreatedResponse({ type: CursoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CursoCreateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    const input = CursoRestMapper.toCreateInput(dto);
    const result = await this.cursoService.create(accessContext, input as any);
    return CursoRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um curso", operationId: "cursoUpdate" })
  @ApiOkResponse({ type: CursoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
    @Body() dto: CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    const input = CursoRestMapper.toUpdateInput(params, dto);
    const result = await this.cursoService.update(accessContext, input as any);
    return CursoRestMapper.toFindOneOutputDto(result as any);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca imagem de capa de um curso", operationId: "cursoGetImagemCapa" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
  ) {
    return this.cursoService.getImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define imagem de capa de um curso", operationId: "cursoUpdateImagemCapa" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async updateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.cursoService.updateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um curso", operationId: "cursoDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CursoFindOneInputDto,
  ): Promise<boolean> {
    const input = CursoRestMapper.toFindOneInput(params);
    return this.cursoService.deleteOneById(accessContext, input);
  }
}
