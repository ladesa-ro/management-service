import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AulaService } from "@/core/aula/application/use-cases/aula.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "./aula.rest.dto";
import { AulaRestMapper } from "./aula.rest.mapper";

@ApiTags("aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista aulas" })
  @ApiOkResponse({ type: AulaListOutputDto })
  @ApiForbiddenResponse()
  async aulaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: AulaListInputDto,
  ): Promise<AulaListOutputDto> {
    const input = AulaRestMapper.toListInput(dto);
    const result = await this.aulaService.aulaFindAll(accessContext, input);
    return AulaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma aula por ID" })
  @ApiOkResponse({ type: AulaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async aulaFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputDto,
  ): Promise<AulaFindOneOutputDto> {
    const input = AulaRestMapper.toFindOneInput(params);
    const result = await this.aulaService.aulaFindByIdStrict(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma aula" })
  @ApiCreatedResponse({ type: AulaFindOneOutputDto })
  @ApiForbiddenResponse()
  async aulaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AulaCreateInputDto,
  ): Promise<AulaFindOneOutputDto> {
    const input = AulaRestMapper.toCreateInput(dto);
    const result = await this.aulaService.aulaCreate(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma aula" })
  @ApiOkResponse({ type: AulaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async aulaUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputDto,
    @Body() dto: AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto> {
    const input = AulaRestMapper.toUpdateInput(params, dto);
    const result = await this.aulaService.aulaUpdate(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma aula" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async aulaDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputDto,
  ): Promise<boolean> {
    const input = AulaRestMapper.toFindOneInput(params);
    return this.aulaService.aulaDeleteOneById(accessContext, input);
  }
}
