import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { NivelFormacaoService } from "@/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "./nivel-formacao.rest.dto";
import { NivelFormacaoRestMapper } from "./nivel-formacao.rest.mapper";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoRestController {
  constructor(private nivelFormacaoService: NivelFormacaoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista niveis de formacao", operationId: "nivelFormacaoFindAll" })
  @ApiOkResponse({ type: NivelFormacaoListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: NivelFormacaoListInputDto,
  ): Promise<NivelFormacaoListOutputDto> {
    const input = NivelFormacaoRestMapper.toListInput(dto);
    const result = await this.nivelFormacaoService.findAll(accessContext, input);
    return NivelFormacaoRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um nivel de formacao por ID", operationId: "nivelFormacaoFindById" })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const input = NivelFormacaoRestMapper.toFindOneInput(params);
    const result = await this.nivelFormacaoService.findByIdStrict(accessContext, input);
    return NivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um nivel de formacao", operationId: "nivelFormacaoCreate" })
  @ApiCreatedResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const input = NivelFormacaoRestMapper.toCreateInput(dto);
    const result = await this.nivelFormacaoService.create(accessContext, input);
    return NivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um nivel de formacao", operationId: "nivelFormacaoUpdate" })
  @ApiOkResponse({ type: NivelFormacaoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
    @Body() dto: NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    const findOneInput = NivelFormacaoRestMapper.toFindOneInput(params);
    const updateInput = NivelFormacaoRestMapper.toUpdateInput(dto);
    const result = await this.nivelFormacaoService.update(accessContext, {
      ...findOneInput,
      ...updateInput,
    });
    return NivelFormacaoRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um nivel de formacao", operationId: "nivelFormacaoDeleteOneById" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: NivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    const input = NivelFormacaoRestMapper.toFindOneInput(params);
    return this.nivelFormacaoService.deleteOneById(accessContext, input);
  }
}
