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
import { EtapaService } from "@/modules/ensino/etapa";
import {
  EtapaCreateInputRestDto,
  EtapaFindOneInputRestDto,
  EtapaFindOneOutputRestDto,
  EtapaListInputRestDto,
  EtapaListOutputRestDto,
  EtapaUpdateInputRestDto,
} from "./etapa.rest.dto";
import { EtapaRestMapper } from "./etapa.rest.mapper";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaRestController {
  constructor(private readonly etapaService: EtapaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista etapas", operationId: "etapaFindAll" })
  @ApiOkResponse({ type: EtapaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EtapaListInputRestDto,
  ): Promise<EtapaListOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreListInput(dto);
    const result = await this.etapaService.findAll(accessContext, coreInput);
    return EtapaRestMapper.toRestListOutput(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma etapa por ID", operationId: "etapaFindById" })
  @ApiOkResponse({ type: EtapaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputRestDto,
  ): Promise<EtapaFindOneOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreFindOneInput(params);
    const result = await this.etapaService.findByIdStrict(accessContext, coreInput);
    return EtapaRestMapper.toRestFindOneOutput(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma etapa", operationId: "etapaCreate" })
  @ApiCreatedResponse({ type: EtapaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EtapaCreateInputRestDto,
  ): Promise<EtapaFindOneOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreCreateInput(dto);
    const result = await this.etapaService.create(accessContext, coreInput);
    return EtapaRestMapper.toRestFindOneOutput(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma etapa", operationId: "etapaUpdate" })
  @ApiOkResponse({ type: EtapaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputRestDto,
    @Body() dto: EtapaUpdateInputRestDto,
  ): Promise<EtapaFindOneOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreFindOneInput(params);
    const coreUpdateInput = EtapaRestMapper.toCoreUpdateInput(dto);
    const result = await this.etapaService.update(accessContext, {
      ...coreInput,
      ...coreUpdateInput,
    });
    return EtapaRestMapper.toRestFindOneOutput(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma etapa", operationId: "etapaDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputRestDto,
  ): Promise<boolean> {
    const coreInput = EtapaRestMapper.toCoreFindOneInput(params);
    return this.etapaService.deleteOneById(accessContext, coreInput);
  }
}
