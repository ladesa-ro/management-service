import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { HorarioGeradoAulaService } from "../domain/horario-gerado-aula.service";
import {
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaUpdateInputDto,
  HorarioGeradoAulaFindOneInputDto,
} from "../dto";

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
    return this.horarioGeradoAulaService.horarioGeradoAulaUpdate(accessContext, { id: params.id, ...dto });
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
