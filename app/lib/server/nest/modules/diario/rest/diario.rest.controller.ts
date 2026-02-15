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
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import {
  DiarioCreateInputRestDto,
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
  DiarioListInputRestDto,
  DiarioListOutputRestDto,
  DiarioUpdateInputRestDto,
} from "./diario.rest.dto";
import { DiarioRestMapper } from "./diario.rest.mapper";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioRestController {
  constructor(private diarioService: DiarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista diarios", operationId: "diarioFindAll" })
  @ApiOkResponse({ type: DiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: DiarioListInputRestDto,
  ): Promise<DiarioListOutputRestDto> {
    const input = DiarioRestMapper.toListInput(dto);
    const result = await this.diarioService.findAll(accessContext, input);
    return DiarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um diario por ID", operationId: "diarioFindById" })
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toFindOneInput(params);
    const result = await this.diarioService.findByIdStrict(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um diario", operationId: "diarioCreate" })
  @ApiCreatedResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: DiarioCreateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toCreateInput(dto);
    const result = await this.diarioService.create(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um diario", operationId: "diarioUpdate" })
  @ApiOkResponse({ type: DiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputRestDto,
    @Body() dto: DiarioUpdateInputRestDto,
  ): Promise<DiarioFindOneOutputRestDto> {
    const input = DiarioRestMapper.toUpdateInput(params, dto);
    const result = await this.diarioService.update(accessContext, input);
    return DiarioRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um diario", operationId: "diarioDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: DiarioFindOneInputRestDto,
  ): Promise<boolean> {
    const input = DiarioRestMapper.toFindOneInput(params);
    return this.diarioService.deleteOneById(accessContext, input);
  }
}
