import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AulaService } from "@/v2/core/aula/application/use-cases/aula.service";
import {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "./dto";

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
    return this.aulaService.aulaFindAll(accessContext, dto);
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
    return this.aulaService.aulaFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma aula" })
  @ApiCreatedResponse({ type: AulaFindOneOutputDto })
  @ApiForbiddenResponse()
  async aulaCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AulaCreateInputDto,
  ): Promise<AulaFindOneOutputDto> {
    return this.aulaService.aulaCreate(accessContext, dto);
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
    return this.aulaService.aulaUpdate(accessContext, { id: params.id, ...dto });
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
    return this.aulaService.aulaDeleteOneById(accessContext, params);
  }
}
