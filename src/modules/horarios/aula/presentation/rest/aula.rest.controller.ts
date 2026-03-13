import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { AulaService } from "@/modules/horarios/aula/application/use-cases/aula.service";
import {
  AulaCreateInputRestDto,
  AulaFindOneInputRestDto,
  AulaFindOneOutputRestDto,
  AulaListInputRestDto,
  AulaListOutputRestDto,
  AulaUpdateInputRestDto,
} from "./aula.rest.dto";
import { AulaRestMapper } from "./aula.rest.mapper";

@ApiTags("aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista aulas", operationId: "aulaFindAll" })
  @ApiOkResponse({ type: AulaListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: AulaListInputRestDto,
  ): Promise<AulaListOutputRestDto> {
    const input = AulaRestMapper.toListInput(dto);
    const result = await this.aulaService.findAll(accessContext, input);
    return AulaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma aula por ID", operationId: "aulaFindById" })
  @ApiOkResponse({ type: AulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputRestDto,
  ): Promise<AulaFindOneOutputRestDto> {
    const input = AulaRestMapper.toFindOneInput(params);
    const result = await this.aulaService.findByIdStrict(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma aula", operationId: "aulaCreate" })
  @ApiCreatedResponse({ type: AulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AulaCreateInputRestDto,
  ): Promise<AulaFindOneOutputRestDto> {
    const input = AulaRestMapper.toCreateInput(dto);
    const result = await this.aulaService.create(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma aula", operationId: "aulaUpdate" })
  @ApiOkResponse({ type: AulaFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputRestDto,
    @Body() dto: AulaUpdateInputRestDto,
  ): Promise<AulaFindOneOutputRestDto> {
    const input = AulaRestMapper.toUpdateInput(params, dto);
    const result = await this.aulaService.update(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma aula", operationId: "aulaDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputRestDto,
  ): Promise<boolean> {
    const input = AulaRestMapper.toFindOneInput(params);
    return this.aulaService.deleteOneById(accessContext, input);
  }
}
