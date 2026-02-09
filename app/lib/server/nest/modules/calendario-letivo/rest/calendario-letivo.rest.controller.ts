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
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import {
  CalendarioLetivoCreateInputRestDto,
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
  CalendarioLetivoListInputRestDto,
  CalendarioLetivoListOutputRestDto,
  CalendarioLetivoUpdateInputRestDto,
} from "./calendario-letivo.rest.dto";
import { CalendarioLetivoRestMapper } from "./calendario-letivo.rest.mapper";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoRestController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista calendarios letivos", operationId: "calendarioLetivoFindAll" })
  @ApiOkResponse({ type: CalendarioLetivoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CalendarioLetivoListInputRestDto,
  ): Promise<CalendarioLetivoListOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toListInput(dto);
    const result = await this.calendarioLetivoService.findAll(accessContext, input);
    return CalendarioLetivoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um calendario letivo por ID",
    operationId: "calendarioLetivoFindById",
  })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    const result = await this.calendarioLetivoService.findByIdStrict(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um calendario letivo", operationId: "calendarioLetivoCreate" })
  @ApiCreatedResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CalendarioLetivoCreateInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toCreateInput(dto);
    const result = await this.calendarioLetivoService.create(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um calendario letivo", operationId: "calendarioLetivoUpdate" })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
    @Body() dto: CalendarioLetivoUpdateInputRestDto,
  ): Promise<CalendarioLetivoFindOneOutputRestDto> {
    const input = CalendarioLetivoRestMapper.toUpdateInput(params, dto);
    const result = await this.calendarioLetivoService.update(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um calendario letivo",
    operationId: "calendarioLetivoDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputRestDto,
  ): Promise<boolean> {
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    return this.calendarioLetivoService.deleteOneById(accessContext, input);
  }
}
