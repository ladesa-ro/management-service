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
import { DiaCalendarioService } from "@/modules/horarios/dia-calendario/application/use-cases/dia-calendario.service";
import {
  DiaCalendarioCreateInputRestDto,
  DiaCalendarioFindOneInputRestDto,
  DiaCalendarioFindOneOutputRestDto,
  DiaCalendarioListInputRestDto,
  DiaCalendarioListOutputRestDto,
  DiaCalendarioUpdateInputRestDto,
} from "./dia-calendario.rest.dto";
import { DiaCalendarioRestMapper } from "./dia-calendario.rest.mapper";

@ApiTags("dias-calendarios")
@Controller("/dias-calendario")
export class DiaCalendarioRestController {
  constructor(private diaCalendarioService: DiaCalendarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista dias de calendario", operationId: "diaCalendarioFindAll" })
  @ApiOkResponse({ type: DiaCalendarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiaCalendarioListInputRestDto,
  ): Promise<DiaCalendarioListOutputRestDto> {
    const input = DiaCalendarioRestMapper.toListInput(dto);
    const result = await this.diaCalendarioService.findAll(accessContext, input as any);
    return DiaCalendarioRestMapper.toListOutputDto(result as any);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um dia de calendario por ID",
    operationId: "diaCalendarioFindById",
  })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputRestDto,
  ): Promise<DiaCalendarioFindOneOutputRestDto> {
    const input = DiaCalendarioRestMapper.toFindOneInput(params);
    const result = await this.diaCalendarioService.findByIdStrict(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um dia de calendario", operationId: "diaCalendarioCreate" })
  @ApiCreatedResponse({ type: DiaCalendarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiaCalendarioCreateInputRestDto,
  ): Promise<DiaCalendarioFindOneOutputRestDto> {
    const input = DiaCalendarioRestMapper.toCreateInput(dto);
    const result = await this.diaCalendarioService.create(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um dia de calendario", operationId: "diaCalendarioUpdate" })
  @ApiOkResponse({ type: DiaCalendarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputRestDto,
    @Body() dto: DiaCalendarioUpdateInputRestDto,
  ): Promise<DiaCalendarioFindOneOutputRestDto> {
    const input = DiaCalendarioRestMapper.toUpdateInput(params, dto);
    const result = await this.diaCalendarioService.update(accessContext, input as any);
    return DiaCalendarioRestMapper.toFindOneOutputDto(result as any);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um dia de calendario",
    operationId: "diaCalendarioDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiaCalendarioFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DiaCalendarioRestMapper.toFindOneInput(params);
    return this.diaCalendarioService.deleteOneById(accessContext, input as any);
  }
}
