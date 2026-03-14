import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { EstagiarioService } from "@/modules/estagio/estagiario/application/use-cases/estagiario.service";
import {
  EstagiarioCreateInputRestDto,
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";
import { EstagiarioRestMapper } from "./estagiario.rest.mapper";

@ApiTags("estagiarios")
@Controller("/estagiarios")
export class EstagiarioRestController {
  constructor(private estagiarioService: EstagiarioService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista estagiários", operationId: "estagiarioFindAll" })
  @ApiOkResponse({ type: EstagiarioListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: EstagiarioListInputRestDto,
  ): Promise<EstagiarioListOutputRestDto> {
    const input = EstagiarioRestMapper.toListInput(dto);
    const result = await this.estagiarioService.findAll(accessContext, input);
    return EstagiarioRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um estagiário por ID", operationId: "estagiarioFindById" })
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toFindOneInput(params);
    const result = await this.estagiarioService.findByIdStrict(accessContext, input);
    return EstagiarioRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um estagiário", operationId: "estagiarioCreate" })
  @ApiBody({ type: EstagiarioCreateInputRestDto })
  @ApiCreatedResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: EstagiarioCreateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toCreateInput(dto);
    const result = await this.estagiarioService.create(accessContext, input);
    return EstagiarioRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um estagiário", operationId: "estagiarioUpdate" })
  @ApiBody({ type: EstagiarioUpdateInputRestDto })
  @ApiOkResponse({ type: EstagiarioFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
    @Body() dto: EstagiarioUpdateInputRestDto,
  ): Promise<EstagiarioFindOneOutputRestDto> {
    const input = EstagiarioRestMapper.toUpdateInput(dto);
    const result = await this.estagiarioService.update(accessContext, params.id, input);
    return EstagiarioRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Deleta um estagiário", operationId: "estagiarioDelete" })
  @ApiOkResponse({ description: "Estagiário deletado com sucesso" })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: EstagiarioFindOneInputRestDto,
  ): Promise<{ message: string }> {
    await this.estagiarioService.delete(accessContext, params.id);
    return { message: "Estagiário deletado com sucesso" };
  }
}
