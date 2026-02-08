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
import { ReservaRestMapper } from "./reserva.rest.mapper";

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
    const input = ReservaRestMapper.toListInput(dto);
    const result = await this.reservaService.findAll(accessContext, input);
    return ReservaRestMapper.toListOutputDto(result);
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
    const input = ReservaRestMapper.toFindOneInput(params);
    const result = await this.reservaService.findByIdStrict(accessContext, input);
    return ReservaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma reserva", operationId: "reservaCreate" })
  @ApiCreatedResponse({ type: ReservaFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto> {
    const input = ReservaRestMapper.toCreateInput(dto);
    const result = await this.reservaService.create(accessContext, input);
    return ReservaRestMapper.toFindOneOutputDto(result);
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
    const input = ReservaRestMapper.toUpdateInput(params, dto);
    const result = await this.reservaService.update(accessContext, input);
    return ReservaRestMapper.toFindOneOutputDto(result);
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
    const input = ReservaRestMapper.toFindOneInput(params);
    return this.reservaService.deleteOneById(accessContext, input);
  }
}
