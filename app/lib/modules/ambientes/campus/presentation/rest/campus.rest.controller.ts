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
import { CampusService } from "@/modules/ambientes/campus";
import {
  CampusCreateInputRestDto,
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
  CampusListInputRestDto,
  CampusListOutputRestDto,
  CampusUpdateInputRestDto,
} from "./campus.rest.dto";
import { CampusRestMapper } from "./campus.rest.mapper";

@ApiTags("campi")
@Controller("/campi")
export class CampusRestController {
  constructor(private campusService: CampusService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista campi", operationId: "campusFindAll" })
  @ApiOkResponse({ type: CampusListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: CampusListInputRestDto,
  ): Promise<CampusListOutputRestDto> {
    const input = CampusRestMapper.toListInput(dto);
    const result = await this.campusService.findAll(accessContext, input);
    return CampusRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um campus por ID", operationId: "campusFindById" })
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toFindOneInput(params);
    const result = await this.campusService.findByIdStrict(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um campus", operationId: "campusCreate" })
  @ApiCreatedResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: CampusCreateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toCreateInput(dto);
    const result = await this.campusService.create(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um campus", operationId: "campusUpdate" })
  @ApiOkResponse({ type: CampusFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
    @Body() dto: CampusUpdateInputRestDto,
  ): Promise<CampusFindOneOutputRestDto> {
    const input = CampusRestMapper.toUpdateInput(params, dto);
    const result = await this.campusService.update(accessContext, input);
    return CampusRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um campus", operationId: "campusDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: CampusFindOneInputRestDto,
  ): Promise<boolean> {
    const input = CampusRestMapper.toFindOneInput(params);
    return this.campusService.deleteOneById(accessContext, input);
  }
}
