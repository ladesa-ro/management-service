import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DiarioService } from "@/core/diario/application/use-cases/diario.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "./diario.rest.dto";
import { DiarioRestMapper } from "./diario.rest.mapper";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioRestController {
  constructor(private diarioService: DiarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios" })
  @ApiOkResponse({ type: DiarioListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioListInputDto,
  ): Promise<DiarioListOutputDto> {
    const input = DiarioRestMapper.toListInput(dto);
    const result = await this.diarioService.diarioFindAll(accessContext, input);
    return DiarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um diario por ID" })
  @ApiOkResponse({ type: DiarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    const input = DiarioRestMapper.toFindOneInput(params);
    const result = await this.diarioService.diarioFindByIdStrict(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario" })
  @ApiCreatedResponse({ type: DiarioFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioCreateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    const input = DiarioRestMapper.toCreateInput(dto);
    const result = await this.diarioService.diarioCreate(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario" })
  @ApiOkResponse({ type: DiarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputDto,
    @Body() dto: DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    const input = DiarioRestMapper.toUpdateInput(params, dto);
    const result = await this.diarioService.diarioUpdate(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um diario" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputDto,
  ): Promise<boolean> {
    const input = DiarioRestMapper.toFindOneInput(params);
    return this.diarioService.diarioDeleteOneById(accessContext, input);
  }
}
