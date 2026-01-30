import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "./dto";

@ApiTags("calendarios-letivos")
@Controller("/calendarios-letivos")
export class CalendarioLetivoController {
  constructor(private calendarioLetivoService: CalendarioLetivoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista calendarios letivos" })
  @ApiOkResponse({ type: CalendarioLetivoListOutputDto })
  @ApiForbiddenResponse()
  async calendarioLetivoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CalendarioLetivoListInputDto,
  ): Promise<CalendarioLetivoListOutputDto> {
    return this.calendarioLetivoService.calendarioLetivoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um calendario letivo por ID" })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async calendarioLetivoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.calendarioLetivoService.calendarioLetivoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um calendario letivo" })
  @ApiCreatedResponse({ type: CalendarioLetivoFindOneOutputDto })
  @ApiForbiddenResponse()
  async calendarioLetivoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.calendarioLetivoService.calendarioLetivoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um calendario letivo" })
  @ApiOkResponse({ type: CalendarioLetivoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async calendarioLetivoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputDto,
    @Body() dto: CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    return this.calendarioLetivoService.calendarioLetivoUpdate(accessContext, {
      id: params.id,
      ...dto,
    });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um calendario letivo" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async calendarioLetivoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CalendarioLetivoFindOneInputDto,
  ): Promise<boolean> {
    return this.calendarioLetivoService.calendarioLetivoDeleteOneById(accessContext, params);
  }
}
