import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { HorarioGeradoService } from "../domain/horario-gerado.service";
import {
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoCreateInputDto,
  HorarioGeradoUpdateInputDto,
  HorarioGeradoFindOneInputDto,
} from "../dto";

@ApiTags("horarios-gerados")
@Controller("/horarios-gerados")
export class HorarioGeradoController {
  constructor(private horarioGeradoService: HorarioGeradoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista horarios gerados" })
  @ApiOkResponse({ type: HorarioGeradoListOutputDto })
  @ApiForbiddenResponse()
  async horarioGeradoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: HorarioGeradoListInputDto,
  ): Promise<HorarioGeradoListOutputDto> {
    return this.horarioGeradoService.horarioGeradoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um horario gerado por ID" })
  @ApiOkResponse({ type: HorarioGeradoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioGeradoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoFindOneInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um horario gerado" })
  @ApiCreatedResponse({ type: HorarioGeradoFindOneOutputDto })
  @ApiForbiddenResponse()
  async horarioGeradoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: HorarioGeradoCreateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.horarioGeradoService.horarioGeradoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um horario gerado" })
  @ApiOkResponse({ type: HorarioGeradoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioGeradoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoFindOneInputDto,
    @Body() dto: HorarioGeradoUpdateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.horarioGeradoService.horarioGeradoUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um horario gerado" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async horarioGeradoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoFindOneInputDto,
  ): Promise<boolean> {
    return this.horarioGeradoService.horarioGeradoDeleteOneById(accessContext, params);
  }
}
