import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { EventoService } from "@/core/evento";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
  EventoUpdateInputDto,
} from "./evento.rest.dto";

@ApiTags("eventos")
@Controller("/eventos")
export class EventoRestController {
  constructor(private eventoService: EventoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista eventos", operationId: "eventoFindAll" })
  @ApiOkResponse({ type: EventoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EventoListInputDto,
  ): Promise<EventoListOutputDto> {
    return this.eventoService.findAll(accessContext, dto) as any;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um evento por ID", operationId: "eventoFindById" })
  @ApiOkResponse({ type: EventoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EventoFindOneInputDto,
  ): Promise<EventoFindOneOutputDto> {
    return this.eventoService.findByIdStrict(accessContext, params) as any;
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um evento", operationId: "eventoCreate" })
  @ApiCreatedResponse({ type: EventoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EventoCreateInputDto,
  ): Promise<EventoFindOneOutputDto> {
    return this.eventoService.create(accessContext, dto) as any;
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um evento", operationId: "eventoUpdate" })
  @ApiOkResponse({ type: EventoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EventoFindOneInputDto,
    @Body() dto: EventoUpdateInputDto,
  ): Promise<EventoFindOneOutputDto> {
    return this.eventoService.update(accessContext, { id: params.id, ...dto }) as any;
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um evento", operationId: "eventoDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EventoFindOneInputDto,
  ): Promise<boolean> {
    return this.eventoService.deleteOneById(accessContext, params);
  }
}
