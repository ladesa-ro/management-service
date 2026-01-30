import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "./dto";

@ApiTags("campi")
@Controller("/campi")
export class CampusController {
  constructor(private campusService: CampusService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista campi" })
  @ApiOkResponse({ type: CampusListOutputDto })
  @ApiForbiddenResponse()
  async campusFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CampusListInputDto,
  ): Promise<CampusListOutputDto> {
    return this.campusService.campusFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um campus por ID" })
  @ApiOkResponse({ type: CampusFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async campusFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputDto,
  ): Promise<CampusFindOneOutputDto> {
    return this.campusService.campusFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um campus" })
  @ApiCreatedResponse({ type: CampusFindOneOutputDto })
  @ApiForbiddenResponse()
  async campusCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CampusCreateInputDto,
  ): Promise<CampusFindOneOutputDto> {
    return this.campusService.campusCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um campus" })
  @ApiOkResponse({ type: CampusFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async campusUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputDto,
    @Body() dto: CampusUpdateInputDto,
  ): Promise<CampusFindOneOutputDto> {
    return this.campusService.campusUpdate(accessContext, { id: params.id, ...dto });
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um campus" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async campusDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputDto,
  ): Promise<boolean> {
    return this.campusService.campusDeleteOneById(accessContext, params);
  }
}
