import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisponibilidadeService } from "@/v2/core/disponibilidade/application/use-cases/disponibilidade.service";
import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "./dto";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista disponibilidades" })
  @ApiOkResponse({ type: DisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async disponibilidadeFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DisponibilidadeListInputDto,
  ): Promise<DisponibilidadeListOutputDto> {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto);
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
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma disponibilidade" })
  @ApiCreatedResponse({ type: DisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async disponibilidadeCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
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
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, { id: params.id, ...dto });
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
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, params);
  }
}
