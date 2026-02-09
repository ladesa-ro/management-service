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
import { DisciplinaService } from "@/modules/disciplina/application/use-cases/disciplina.service";
import {
  DisciplinaCreateInputRestDto,
  DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
  DisciplinaListInputRestDto,
  DisciplinaListOutputRestDto,
  DisciplinaUpdateInputRestDto,
} from "./disciplina.rest.dto";
import { DisciplinaRestMapper } from "./disciplina.rest.mapper";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaRestController {
  constructor(private disciplinaService: DisciplinaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista disciplinas", operationId: "disciplinaFindAll" })
  @ApiOkResponse({ type: DisciplinaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DisciplinaListInputRestDto,
  ): Promise<DisciplinaListOutputRestDto> {
    const input = DisciplinaRestMapper.toListInput(dto);
    const result = await this.disciplinaService.findAll(accessContext, input);
    return DisciplinaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma disciplina por ID", operationId: "disciplinaFindById" })
  @ApiOkResponse({ type: DisciplinaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
  ): Promise<DisciplinaFindOneOutputRestDto> {
    const input = DisciplinaRestMapper.toFindOneInput(params);
    const result = await this.disciplinaService.findByIdStrict(accessContext, input);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma disciplina", operationId: "disciplinaCreate" })
  @ApiCreatedResponse({ type: DisciplinaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DisciplinaCreateInputRestDto,
  ): Promise<DisciplinaFindOneOutputRestDto> {
    const input = DisciplinaRestMapper.toCreateInput(dto);
    const result = await this.disciplinaService.create(accessContext, input);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma disciplina", operationId: "disciplinaUpdate" })
  @ApiOkResponse({ type: DisciplinaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
    @Body() dto: DisciplinaUpdateInputRestDto,
  ): Promise<DisciplinaFindOneOutputRestDto> {
    const input = DisciplinaRestMapper.toUpdateInput(params, dto);
    const result = await this.disciplinaService.update(accessContext, input);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({
    summary: "Busca imagem de capa de uma disciplina",
    operationId: "disciplinaGetImagemCapa",
  })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async getImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
  ) {
    return this.disciplinaService.getImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({
    summary: "Define imagem de capa de uma disciplina",
    operationId: "disciplinaUpdateImagemCapa",
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
    @Param() params: DisciplinaFindOneInputRestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return this.disciplinaService.updateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma disciplina", operationId: "disciplinaDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DisciplinaRestMapper.toFindOneInput(params);
    return this.disciplinaService.deleteOneById(accessContext, input);
  }
}
