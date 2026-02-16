import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@core/contexto-acesso";
import { HorarioGeradoAulaService } from "@/modules/horarios/horario-gerado-aula";
import {
  HorarioGeradoAulaCreateInputRestDto,
  HorarioGeradoAulaFindOneInputRestDto,
  HorarioGeradoAulaFindOneOutputRestDto,
  HorarioGeradoAulaListInputRestDto,
  HorarioGeradoAulaListOutputRestDto,
  HorarioGeradoAulaUpdateInputRestDto,
} from "./horario-gerado-aula.rest.dto";
import { HorarioGeradoAulaRestMapper } from "./horario-gerado-aula.rest.mapper";

@ApiTags("horarios-gerados-aula")
@Controller("/horarios-gerados-aula")
export class HorarioGeradoAulaRestController {
  constructor(private readonly horarioGeradoAulaService: HorarioGeradoAulaService) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista horarios gerados de aula",
    operationId: "horarioGeradoAulaFindAll",
  })
  @ApiOkResponse({ type: HorarioGeradoAulaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: HorarioGeradoAulaListInputRestDto,
  ): Promise<HorarioGeradoAulaListOutputRestDto> {
    const coreInput = HorarioGeradoAulaRestMapper.toCoreListInput(dto);
    const result = await this.horarioGeradoAulaService.findAll(accessContext, coreInput);
    return HorarioGeradoAulaRestMapper.toRestListOutput(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca um horario gerado de aula por ID",
    operationId: "horarioGeradoAulaFindById",
  })
  @ApiOkResponse({ type: HorarioGeradoAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoAulaFindOneInputRestDto,
  ): Promise<HorarioGeradoAulaFindOneOutputRestDto> {
    const coreInput = HorarioGeradoAulaRestMapper.toCoreFindOneInput(params);
    const result = await this.horarioGeradoAulaService.findByIdStrict(accessContext, coreInput);
    return HorarioGeradoAulaRestMapper.toRestFindOneOutput(result);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria um horario gerado de aula",
    operationId: "horarioGeradoAulaCreate",
  })
  @ApiCreatedResponse({ type: HorarioGeradoAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: HorarioGeradoAulaCreateInputRestDto,
  ): Promise<HorarioGeradoAulaFindOneOutputRestDto> {
    const coreInput = HorarioGeradoAulaRestMapper.toCoreCreateInput(dto);
    const result = await this.horarioGeradoAulaService.create(accessContext, coreInput);
    return HorarioGeradoAulaRestMapper.toRestFindOneOutput(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza um horario gerado de aula",
    operationId: "horarioGeradoAulaUpdate",
  })
  @ApiOkResponse({ type: HorarioGeradoAulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoAulaFindOneInputRestDto,
    @Body() dto: HorarioGeradoAulaUpdateInputRestDto,
  ): Promise<HorarioGeradoAulaFindOneOutputRestDto> {
    const coreInput = HorarioGeradoAulaRestMapper.toCoreFindOneInput(params);
    const coreUpdateInput = HorarioGeradoAulaRestMapper.toCoreUpdateInput(dto);
    const result = await this.horarioGeradoAulaService.update(accessContext, {
      ...coreInput,
      ...coreUpdateInput,
    });
    return HorarioGeradoAulaRestMapper.toRestFindOneOutput(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove um horario gerado de aula",
    operationId: "horarioGeradoAulaDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoAulaFindOneInputRestDto,
  ): Promise<boolean> {
    const coreInput = HorarioGeradoAulaRestMapper.toCoreFindOneInput(params);
    return this.horarioGeradoAulaService.deleteOneById(accessContext, coreInput);
  }
}
