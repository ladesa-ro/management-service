import { Controller, Delete, Get, Patch, Post, Query, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiaCalendarioService } from "../domain/dia-calendario.service";
import {
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioCreateInputDto,
  DiaCalendarioUpdateInputDto,
  DiaCalendarioFindOneInputDto,
} from "../dto";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista dias de calendario" })
  @ApiOkResponse({ type: DiaCalendarioListOutputDto })
  @ApiForbiddenResponse()
  async diaCalendarioFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiaCalendarioListInputDto,
  ): Promise<DiaCalendarioListOutputDto> {
    return this.diaCalendarioService.diaCalendarioFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um dia de calendario por ID" })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diaCalendarioFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.diaCalendarioService.diaCalendarioFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um dia de calendario" })
  @ApiCreatedResponse({ type: DiaCalendarioFindOneOutputDto })
  @ApiForbiddenResponse()
  async diaCalendarioCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.diaCalendarioService.diaCalendarioCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um dia de calendario" })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diaCalendarioUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputDto,
    @Body() dto: DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.diaCalendarioService.diaCalendarioUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um dia de calendario" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diaCalendarioDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputDto,
  ): Promise<boolean> {
    return this.diaCalendarioService.diaCalendarioDeleteOneById(accessContext, params);
  }
}
