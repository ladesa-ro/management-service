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
import { AccessContext, AccessContextHttp } from "@/modules/@core/contexto-acesso";
import { CursoService } from "@/modules/ensino/curso";
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
  constructor(private cursoService: CursoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista cursos", operationId: "cursoFindAll" })
  @ApiOkResponse({ type: CursoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CursoListInputRestDto,
  ): Promise<CursoListOutputRestDto> {
    const input = CursoRestMapper.toListInput(dto);
    const result = await this.cursoService.findAll(accessContext, input as any);
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
    const result = await this.cursoService.findByIdStrict(accessContext, input as any);
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
    const result = await this.cursoService.create(accessContext, input as any);
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
    @Param() params: CursoFindOneInputRestDto,
  ) {
    return this.cursoService.getImagemCapa(accessContext, params.id);
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
    return this.cursoService.updateImagemCapa(accessContext, params, file);
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
    return this.cursoService.deleteOneById(accessContext, input);
  }
}
