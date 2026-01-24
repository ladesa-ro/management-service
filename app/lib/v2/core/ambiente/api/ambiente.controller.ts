import { Controller, Delete, Get, Patch, Post, Put, Query, Body, Param, UploadedFile } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AmbienteService } from "../domain/ambiente.service";
import {
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteCreateInputDto,
  AmbienteUpdateInputDto,
  AmbienteFindOneInputDto,
} from "../dto";

@ApiTags("ambientes")
@Controller("/ambientes")
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista ambientes" })
  @ApiOkResponse({ type: AmbienteListOutputDto })
  @ApiForbiddenResponse()
  async ambienteFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: AmbienteListInputDto,
  ): Promise<AmbienteListOutputDto> {
    return this.ambienteService.ambienteFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um ambiente por ID" })
  @ApiOkResponse({ type: AmbienteFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ambienteFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.ambienteService.ambienteFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um ambiente" })
  @ApiCreatedResponse({ type: AmbienteFindOneOutputDto })
  @ApiForbiddenResponse()
  async ambienteCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AmbienteCreateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.ambienteService.ambienteCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um ambiente" })
  @ApiOkResponse({ type: AmbienteFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ambienteUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputDto,
    @Body() dto: AmbienteUpdateInputDto,
  ): Promise<AmbienteFindOneOutputDto> {
    return this.ambienteService.ambienteUpdate(accessContext, { id: params.id, ...dto });
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Obtem a imagem de capa de um ambiente" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ambienteGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputDto,
  ) {
    return this.ambienteService.ambienteGetImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define a imagem de capa de um ambiente" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ambienteUpdateImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ambienteService.ambienteUpdateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um ambiente" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async ambienteDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AmbienteFindOneInputDto,
  ): Promise<boolean> {
    return this.ambienteService.ambienteDeleteOneById(accessContext, params);
  }
}
