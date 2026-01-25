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
import { EventoService } from "@/v2/core/evento/application/use-cases/evento.service";
import {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
  EventoUpdateInputDto,
} from "./dto";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista eventos" })
  @ApiOkResponse({ type: EventoListOutputDto })
  @ApiForbiddenResponse()
  async eventoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EventoListInputDto,
  ): Promise<EventoListOutputDto> {
    return this.eventoService.eventoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um evento por ID" })
  @ApiOkResponse({ type: EventoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async eventoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EventoFindOneInputDto,
  ): Promise<EventoFindOneOutputDto> {
    return this.eventoService.eventoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um evento" })
  @ApiCreatedResponse({ type: EventoFindOneOutputDto })
  @ApiForbiddenResponse()
  async eventoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EventoCreateInputDto,
  ): Promise<EventoFindOneOutputDto> {
    return this.eventoService.eventoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um evento" })
  @ApiOkResponse({ type: EventoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async eventoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EventoFindOneInputDto,
    @Body() dto: EventoUpdateInputDto,
  ): Promise<EventoFindOneOutputDto> {
    return this.eventoService.eventoUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um evento" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async eventoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EventoFindOneInputDto,
  ): Promise<boolean> {
    return this.eventoService.eventoDeleteOneById(accessContext, params);
  }
}
