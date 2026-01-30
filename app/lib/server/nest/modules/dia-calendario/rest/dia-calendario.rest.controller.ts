import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DiaCalendarioService } from "@/core/dia-calendario/application/use-cases/dia-calendario.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "./dia-calendario.rest.dto";
import { DiaCalendarioRestMapper } from "./dia-calendario.rest.mapper";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioRestController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista dias de calendario" })
  @ApiOkResponse({ type: DiaCalendarioListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiaCalendarioListInputDto,
  ): Promise<DiaCalendarioListOutputDto> {
    const input = DiaCalendarioRestMapper.toListInput(dto);
    const result = await this.diaCalendarioService.findAll(accessContext, input as any);
    return DiaCalendarioRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um dia de calendario por ID" })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const input = DiaCalendarioRestMapper.toFindOneInput(params);
    const result = await this.diaCalendarioService.findByIdStrict(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um dia de calendario" })
  @ApiCreatedResponse({ type: DiaCalendarioFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const input = DiaCalendarioRestMapper.toCreateInput(dto);
    const result = await this.diaCalendarioService.create(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um dia de calendario" })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputDto,
    @Body() dto: DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const input = DiaCalendarioRestMapper.toUpdateInput(params, dto);
    const result = await this.diaCalendarioService.update(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um dia de calendario" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputDto,
  ): Promise<boolean> {
    const input = DiaCalendarioRestMapper.toFindOneInput(params);
    return this.diaCalendarioService.deleteOneById(accessContext, input as any);
  }
}
