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
import { ReservaService } from "@/modules/reserva";
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
  @ApiOperation({ summary: "Lista reservas", operationId: "reservaFindAll" })
  @ApiOkResponse({ type: ReservaListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: ReservaListInputDto,
  ): Promise<ReservaListOutputDto> {
    return this.reservaService.findAll(accessContext, dto) as any;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma reserva por ID", operationId: "reservaFindById" })
  @ApiOkResponse({ type: ReservaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ReservaFindOneInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.reservaService.findByIdStrict(accessContext, params) as any;
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma reserva", operationId: "reservaCreate" })
  @ApiCreatedResponse({ type: ReservaFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.reservaService.create(accessContext, dto) as any;
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma reserva", operationId: "reservaUpdate" })
  @ApiOkResponse({ type: ReservaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ReservaFindOneInputDto,
    @Body() dto: ReservaUpdateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    return this.reservaService.update(accessContext, { id: params.id, ...dto }) as any;
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma reserva", operationId: "reservaDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: ReservaFindOneInputDto,
  ): Promise<boolean> {
    return this.reservaService.deleteOneById(accessContext, params);
  }
}
