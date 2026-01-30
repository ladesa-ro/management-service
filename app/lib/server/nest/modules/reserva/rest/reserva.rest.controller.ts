import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ReservaService } from "@/core/reserva";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "./reserva.rest.dto";

@ApiTags("reservas")
@Controller("/reservas")
export class ReservaRestController {
  constructor(private reservaService: ReservaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista reservas" })
  @ApiOkResponse({ type: ReservaListOutputDto })
  @ApiForbiddenResponse()
  async reservaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: ReservaListInputDto,
  ): Promise<ReservaListOutputDto> {
    return this.reservaService.reservaFindAll(accessContext, dto) as any;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma reserva por ID" })
  @ApiOkResponse({ type: ReservaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async reservaFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ReservaFindOneInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.reservaService.reservaFindByIdStrict(accessContext, params) as any;
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma reserva" })
  @ApiCreatedResponse({ type: ReservaFindOneOutputDto })
  @ApiForbiddenResponse()
  async reservaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.reservaService.reservaCreate(accessContext, dto) as any;
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma reserva" })
  @ApiOkResponse({ type: ReservaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async reservaUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ReservaFindOneInputDto,
    @Body() dto: ReservaUpdateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.reservaService.reservaUpdate(accessContext, { id: params.id, ...dto }) as any;
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma reserva" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async reservaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ReservaFindOneInputDto,
  ): Promise<boolean> {
    return this.reservaService.reservaDeleteOneById(accessContext, params);
  }
}
