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
import { AulaService } from "@/modules/aula/application/use-cases/aula.service";
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
  @ApiOperation({ summary: "Lista aulas", operationId: "aulaFindAll" })
  @ApiOkResponse({ type: AulaListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: AulaListInputDto,
  ): Promise<AulaListOutputDto> {
    const input = AulaRestMapper.toListInput(dto);
    const result = await this.aulaService.findAll(accessContext, input);
    return AulaRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma aula por ID", operationId: "aulaFindById" })
  @ApiOkResponse({ type: AulaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputDto,
  ): Promise<AulaFindOneOutputDto> {
    const input = AulaRestMapper.toFindOneInput(params);
    const result = await this.aulaService.findByIdStrict(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma aula", operationId: "aulaCreate" })
  @ApiCreatedResponse({ type: AulaFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AulaCreateInputDto,
  ): Promise<AulaFindOneOutputDto> {
    const input = AulaRestMapper.toCreateInput(dto);
    const result = await this.aulaService.create(accessContext, input);
    return AulaRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma aula", operationId: "aulaUpdate" })
  @ApiOkResponse({ type: AulaFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: AulaFindOneInputDto,
    @Body() dto: AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto> {
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
    @Param() params: AulaFindOneInputDto,
  ): Promise<boolean> {
    const input = AulaRestMapper.toFindOneInput(params);
    return this.aulaService.deleteOneById(accessContext, input);
  }
}
