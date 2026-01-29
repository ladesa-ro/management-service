import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/old/infrastructure/access-context";
import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "./dto";
import { DisponibilidadeService } from "@/v2/core/disponibilidade/application/use-cases/disponibilidade.service";
import { BaseCrudController } from "@/v2/core/shared";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController extends BaseCrudController<
  DisponibilidadeService,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeCreateInputDto,
  DisponibilidadeUpdateInputDto
> {
  constructor(disponibilidadeService: DisponibilidadeService) {
    super(disponibilidadeService);
  }

  @Get("/")
  @ApiOperation({ summary: "Lista disponibilidades" })
  @ApiOkResponse({ type: DisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async disponibilidadeFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DisponibilidadeListInputDto,
  ): Promise<DisponibilidadeListOutputDto> {
    return this.handleFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma disponibilidade por ID" })
  @ApiOkResponse({ type: DisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disponibilidadeFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.handleFindById(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma disponibilidade" })
  @ApiCreatedResponse({ type: DisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async disponibilidadeCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.handleCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma disponibilidade" })
  @ApiOkResponse({ type: DisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputDto,
    @Body() dto: DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.handleUpdate(accessContext, params, dto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma disponibilidade" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async disponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    return this.handleDelete(accessContext, params);
  }
}
