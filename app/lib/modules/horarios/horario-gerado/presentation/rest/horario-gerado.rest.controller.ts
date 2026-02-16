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
import { HorarioGeradoService } from "@/modules/horarios/horario-gerado";
import {
  HorarioGeradoCreateInputRestDto,
  HorarioGeradoFindOneInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
  HorarioGeradoListInputRestDto,
  HorarioGeradoListOutputRestDto,
  HorarioGeradoUpdateInputRestDto,
} from "./horario-gerado.rest.dto";
import { HorarioGeradoRestMapper } from "./horario-gerado.rest.mapper";

@ApiTags("horarios-gerados")
@Controller("/horarios-gerados")
export class HorarioGeradoRestController {
  constructor(private readonly horarioGeradoService: HorarioGeradoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista horarios gerados", operationId: "horarioGeradoFindAll" })
  @ApiOkResponse({ type: HorarioGeradoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: HorarioGeradoListInputRestDto,
  ): Promise<HorarioGeradoListOutputRestDto> {
    const coreInput = HorarioGeradoRestMapper.toCoreListInput(dto);
    const result = await this.horarioGeradoService.findAll(accessContext, coreInput);
    return HorarioGeradoRestMapper.toRestListOutput(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um horario gerado por ID", operationId: "horarioGeradoFindById" })
  @ApiOkResponse({ type: HorarioGeradoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoFindOneInputRestDto,
  ): Promise<HorarioGeradoFindOneOutputRestDto> {
    const coreInput = HorarioGeradoRestMapper.toCoreFindOneInput(params);
    const result = await this.horarioGeradoService.findByIdStrict(accessContext, coreInput);
    return HorarioGeradoRestMapper.toRestFindOneOutput(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um horario gerado", operationId: "horarioGeradoCreate" })
  @ApiCreatedResponse({ type: HorarioGeradoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: HorarioGeradoCreateInputRestDto,
  ): Promise<HorarioGeradoFindOneOutputRestDto> {
    const coreInput = HorarioGeradoRestMapper.toCoreCreateInput(dto);
    const result = await this.horarioGeradoService.create(accessContext, coreInput);
    return HorarioGeradoRestMapper.toRestFindOneOutput(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um horario gerado", operationId: "horarioGeradoUpdate" })
  @ApiOkResponse({ type: HorarioGeradoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoFindOneInputRestDto,
    @Body() dto: HorarioGeradoUpdateInputRestDto,
  ): Promise<HorarioGeradoFindOneOutputRestDto> {
    const coreInput = HorarioGeradoRestMapper.toCoreFindOneInput(params);
    const coreUpdateInput = HorarioGeradoRestMapper.toCoreUpdateInput(dto);
    const result = await this.horarioGeradoService.update(accessContext, {
      ...coreInput,
      ...coreUpdateInput,
    });
    return HorarioGeradoRestMapper.toRestFindOneOutput(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um horario gerado", operationId: "horarioGeradoDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: HorarioGeradoFindOneInputRestDto,
  ): Promise<boolean> {
    const coreInput = HorarioGeradoRestMapper.toCoreFindOneInput(params);
    return this.horarioGeradoService.deleteOneById(accessContext, coreInput);
  }
}
