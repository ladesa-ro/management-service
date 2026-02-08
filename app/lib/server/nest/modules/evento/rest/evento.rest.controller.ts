import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { EventoService } from "@/modules/evento";
import {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
  EventoUpdateInputDto,
} from "./evento.rest.dto";
import { EventoRestMapper } from "./evento.rest.mapper";

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
    const input = EventoRestMapper.toListInput(dto);
    const result = await this.eventoService.findAll(accessContext, input);
    return EventoRestMapper.toListOutputDto(result);
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
    const input = EventoRestMapper.toFindOneInput(params);
    const result = await this.eventoService.findByIdStrict(accessContext, input);
    return EventoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um evento", operationId: "eventoCreate" })
  @ApiCreatedResponse({ type: EventoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EventoCreateInputDto,
  ): Promise<EventoFindOneOutputDto> {
    const input = EventoRestMapper.toCreateInput(dto);
    const result = await this.eventoService.create(accessContext, input);
    return EventoRestMapper.toFindOneOutputDto(result);
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
    const input = EventoRestMapper.toUpdateInput(params, dto);
    const result = await this.eventoService.update(accessContext, input);
    return EventoRestMapper.toFindOneOutputDto(result);
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
    const input = EventoRestMapper.toFindOneInput(params);
    return this.eventoService.deleteOneById(accessContext, input);
  }
}
