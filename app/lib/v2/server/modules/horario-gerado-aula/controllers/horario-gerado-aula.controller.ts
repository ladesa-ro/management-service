import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { HorarioGeradoAulaService } from "@/v2/core/horario-gerado-aula/application/use-cases/horario-gerado-aula.service";
import {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "@/v2/adapters/in/http/horario-gerado-aula/dto";

@ApiTags("horarios-gerados-aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaController {
  constructor(private horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista horarios gerados de aula" })
  @ApiOkResponse({ type: HorarioGeradoAulaListOutputDto })
  @ApiForbiddenResponse()
  async horarioGeradoAulaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: HorarioGeradoAulaListInputDto,
  ): Promise<HorarioGeradoAulaListOutputDto> {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um horario gerado de aula por ID" })
  @ApiOkResponse({ type: HorarioGeradoAulaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioGeradoAulaFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoAulaFindOneInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto> {
    return this.horarioGeradoAulaService.horarioGeradoAulaFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um horario gerado de aula" })
  @ApiCreatedResponse({ type: HorarioGeradoAulaFindOneOutputDto })
  @ApiForbiddenResponse()
  async horarioGeradoAulaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto> {
    return this.horarioGeradoAulaService.horarioGeradoAulaCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um horario gerado de aula" })
  @ApiOkResponse({ type: HorarioGeradoAulaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioGeradoAulaUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoAulaFindOneInputDto,
    @Body() dto: HorarioGeradoAulaUpdateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto> {
    return this.horarioGeradoAulaService.HorarioGeradoAulaUpdate(accessContext, {
      id: params.id,
      ...dto,
    });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um horario gerado de aula" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioGeradoAulaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoAulaFindOneInputDto,
  ): Promise<boolean> {
    return this.horarioGeradoAulaService.horarioGeradoAulaDeleteOneById(accessContext, params);
  }
}
