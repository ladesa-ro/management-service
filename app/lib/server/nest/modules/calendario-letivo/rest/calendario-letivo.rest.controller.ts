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
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "./calendario-letivo.rest.dto";
import { CalendarioLetivoRestMapper } from "./calendario-letivo.rest.mapper";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoRestController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista calendarios letivos", operationId: "calendarioLetivoFindAll" })
  @ApiOkResponse({ type: CalendarioLetivoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CalendarioLetivoListInputDto,
  ): Promise<CalendarioLetivoListOutputDto> {
    const input = CalendarioLetivoRestMapper.toListInput(dto);
    const result = await this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, input);
    return CalendarioLetivoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um calendario letivo por ID",
    operationId: "calendarioLetivoFindById",
  })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    const result = await this.calendarioLetivoService.calendarioLetivoFindByIdStrict(
      accessContext,
      input,
    );
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um calendario letivo", operationId: "calendarioLetivoCreate" })
  @ApiCreatedResponse({ type: CalendarioLetivoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const input = CalendarioLetivoRestMapper.toCreateInput(dto);
    const result = await this.calendarioLetivoService.calendarioLetivoCreate(accessContext, input);
    return CalendarioLetivoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um calendario letivo", operationId: "calendarioLetivoUpdate" })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputDto,
    @Body() dto: CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const input = CalendarioLetivoRestMapper.toUpdateInput(params, dto);
    const result = await this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, input);
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
    @Param() params: CalendarioLetivoFindOneInputDto,
  ): Promise<boolean> {
    const input = CalendarioLetivoRestMapper.toFindOneInput(params);
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, input);
  }
}
