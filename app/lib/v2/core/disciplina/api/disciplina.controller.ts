import { Controller, Delete, Get, Patch, Post, Put, Query, Body, Param, UploadedFile } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisciplinaService } from "../domain/disciplina.service";
import {
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaCreateInputDto,
  DisciplinaUpdateInputDto,
  DisciplinaFindOneInputDto,
} from "../dto";

@ApiTags("disciplinas")
@Controller("/disciplinas")
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista disciplinas" })
  @ApiOkResponse({ type: DisciplinaListOutputDto })
  @ApiForbiddenResponse()
  async disciplinaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DisciplinaListInputDto,
  ): Promise<DisciplinaListOutputDto> {
    return this.disciplinaService.disciplinaFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma disciplina por ID" })
  @ApiOkResponse({ type: DisciplinaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disciplinaFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.disciplinaService.disciplinaFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma disciplina" })
  @ApiCreatedResponse({ type: DisciplinaFindOneOutputDto })
  @ApiForbiddenResponse()
  async disciplinaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.disciplinaService.disciplinaCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma disciplina" })
  @ApiOkResponse({ type: DisciplinaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disciplinaUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputDto,
    @Body() dto: DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.disciplinaService.disciplinaUpdate(accessContext, { id: params.id, ...dto });
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Busca imagem de capa de uma disciplina" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disciplinaGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputDto,
  ) {
    return this.disciplinaService.disciplinaGetImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define imagem de capa de uma disciplina" })
  @ApiOkResponse({ type: DisciplinaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disciplinaImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DisciplinaFindOneOutputDto> {
    return this.disciplinaService.disciplinaUpdateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma disciplina" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disciplinaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisciplinaFindOneInputDto,
  ): Promise<boolean> {
    return this.disciplinaService.disciplinaDeleteOneById(accessContext, params);
  }
}
