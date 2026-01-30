import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CampusService } from "@/core/campus";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "./campus.rest.dto";
import { CampusRestMapper } from "./campus.rest.mapper";

@ApiTags("campi")
@Controller("/campi")
export class CampusRestController {
  constructor(private campusService: CampusService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista campi" })
  @ApiOkResponse({ type: CampusListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CampusListInputDto,
  ): Promise<CampusListOutputDto> {
    const input = CampusRestMapper.toListInput(dto);
    const result = await this.campusService.campusFindAll(accessContext, input);
    return CampusRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um campus por ID" })
  @ApiOkResponse({ type: CampusFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputDto,
  ): Promise<CampusFindOneOutputDto> {
    const input = CampusRestMapper.toFindOneInput(params);
    const result = await this.campusService.campusFindByIdStrict(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um campus" })
  @ApiCreatedResponse({ type: CampusFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CampusCreateInputDto,
  ): Promise<CampusFindOneOutputDto> {
    const input = CampusRestMapper.toCreateInput(dto);
    const result = await this.campusService.campusCreate(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um campus" })
  @ApiOkResponse({ type: CampusFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputDto,
    @Body() dto: CampusUpdateInputDto,
  ): Promise<CampusFindOneOutputDto> {
    const input = CampusRestMapper.toUpdateInput(params, dto);
    const result = await this.campusService.campusUpdate(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um campus" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputDto,
  ): Promise<boolean> {
    const input = CampusRestMapper.toFindOneInput(params);
    return this.campusService.campusDeleteOneById(accessContext, input);
  }
}
