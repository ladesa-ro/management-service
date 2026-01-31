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
import { DisciplinaService } from "@/modules/disciplina/application/use-cases/disciplina.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "./disciplina.rest.dto";
import { DisciplinaRestMapper } from "./disciplina.rest.mapper";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaRestController {
  constructor(private disciplinaService: DisciplinaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista disciplinas", operationId: "disciplinaFindAll" })
  @ApiOkResponse({ type: DisciplinaListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DisciplinaListInputDto,
  ): Promise<DisciplinaListOutputDto> {
    const input = DisciplinaRestMapper.toListInput(dto);
    const result = await this.disciplinaService.findAll(accessContext, input);
    return DisciplinaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma disciplina por ID", operationId: "disciplinaFindById" })
  @ApiOkResponse({ type: DisciplinaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    const input = DisciplinaRestMapper.toFindOneInput(params);
    const result = await this.disciplinaService.findByIdStrict(accessContext, input);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma disciplina", operationId: "disciplinaCreate" })
  @ApiCreatedResponse({ type: DisciplinaFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    const input = DisciplinaRestMapper.toCreateInput(dto);
    const result = await this.disciplinaService.create(accessContext, input);
    return DisciplinaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma disciplina", operationId: "disciplinaUpdate" })
  @ApiOkResponse({ type: DisciplinaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputDto,
    @Body() dto: DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
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
    @Param() params: DisciplinaFindOneInputDto,
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
    @Param() params: DisciplinaFindOneInputDto,
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
    @Param() params: DisciplinaFindOneInputDto,
  ): Promise<boolean> {
    const input = DisciplinaRestMapper.toFindOneInput(params);
    return this.disciplinaService.deleteOneById(accessContext, input);
  }
}
