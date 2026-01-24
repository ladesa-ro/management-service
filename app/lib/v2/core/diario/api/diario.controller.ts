import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioService } from "../domain/diario.service";
import {
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioCreateInputDto,
  DiarioUpdateInputDto,
  DiarioFindOneInputDto,
} from "../dto";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios" })
  @ApiOkResponse({ type: DiarioListOutputDto })
  @ApiForbiddenResponse()
  async diarioFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioListInputDto,
  ): Promise<DiarioListOutputDto> {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um diario por ID" })
  @ApiOkResponse({ type: DiarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    return this.diarioService.diarioFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario" })
  @ApiCreatedResponse({ type: DiarioFindOneOutputDto })
  @ApiForbiddenResponse()
  async diarioCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioCreateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario" })
  @ApiOkResponse({ type: DiarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputDto,
    @Body() dto: DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    return this.diarioService.diarioUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um diario" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diarioDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputDto,
  ): Promise<boolean> {
    return this.diarioService.diarioDeleteOneById(accessContext, params);
  }
}
