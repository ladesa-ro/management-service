import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { EtapaService } from "@/core/etapa";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
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
  @ApiOperation({ summary: "Lista etapas" })
  @ApiOkResponse({ type: EtapaListOutputRestDto })
  @ApiForbiddenResponse()
  async etapaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EtapaListInputRestDto,
  ): Promise<EtapaListOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreListInput(dto);
    const result = await this.etapaService.etapaFindAll(accessContext, coreInput);
    return EtapaRestMapper.toRestListOutput(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma etapa por ID" })
  @ApiOkResponse({ type: EtapaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async etapaFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputRestDto,
  ): Promise<EtapaFindOneOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreFindOneInput(params);
    const result = await this.etapaService.etapaFindByIdStrict(accessContext, coreInput);
    return EtapaRestMapper.toRestFindOneOutput(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma etapa" })
  @ApiCreatedResponse({ type: EtapaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async etapaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EtapaCreateInputRestDto,
  ): Promise<EtapaFindOneOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreCreateInput(dto);
    const result = await this.etapaService.etapaCreate(accessContext, coreInput);
    return EtapaRestMapper.toRestFindOneOutput(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma etapa" })
  @ApiOkResponse({ type: EtapaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async etapaUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputRestDto,
    @Body() dto: EtapaUpdateInputRestDto,
  ): Promise<EtapaFindOneOutputRestDto> {
    const coreInput = EtapaRestMapper.toCoreFindOneInput(params);
    const coreUpdateInput = EtapaRestMapper.toCoreUpdateInput(dto);
    const result = await this.etapaService.etapaUpdate(accessContext, {
      ...coreInput,
      ...coreUpdateInput,
    });
    return EtapaRestMapper.toRestFindOneOutput(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma etapa" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async etapaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EtapaFindOneInputRestDto,
  ): Promise<boolean> {
    const coreInput = EtapaRestMapper.toCoreFindOneInput(params);
    return this.etapaService.etapaDeleteOneById(accessContext, coreInput);
  }
}
