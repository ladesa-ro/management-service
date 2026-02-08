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
import { TurmaDisponibilidadeService } from "@/modules/turma-disponibilidade";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "./turma-disponibilidade.rest.dto";
import { TurmaDisponibilidadeRestMapper } from "./turma-disponibilidade.rest.mapper";

@ApiTags("turmas-disponibilidades")
@Controller("/turmas-disponibilidades")
export class TurmaDisponibilidadeRestController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Get("/")
  @ApiOperation({
    summary: "Lista turmas-disponibilidades",
    operationId: "turmaDisponibilidadeFindAll",
  })
  @ApiOkResponse({ type: TurmaDisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaDisponibilidadeListInputDto,
  ): Promise<TurmaDisponibilidadeListOutputDto> {
    const input = TurmaDisponibilidadeRestMapper.toListInput(dto);
    const result = await this.turmaDisponibilidadeService.findAll(accessContext, input);
    return TurmaDisponibilidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma turma-disponibilidade por ID",
    operationId: "turmaDisponibilidadeFindById",
  })
  @ApiOkResponse({ type: TurmaDisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const input = TurmaDisponibilidadeRestMapper.toFindOneInput(params);
    const result = await this.turmaDisponibilidadeService.findByIdStrict(accessContext, input);
    return TurmaDisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria uma turma-disponibilidade",
    operationId: "turmaDisponibilidadeCreate",
  })
  @ApiCreatedResponse({ type: TurmaDisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const input = TurmaDisponibilidadeRestMapper.toCreateInput(dto);
    const result = await this.turmaDisponibilidadeService.create(accessContext, input);
    return TurmaDisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma turma-disponibilidade",
    operationId: "turmaDisponibilidadeUpdate",
  })
  @ApiOkResponse({ type: TurmaDisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputDto,
    @Body() dto: TurmaDisponibilidadeUpdateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const input = TurmaDisponibilidadeRestMapper.toUpdateInput(params, dto);
    const result = await this.turmaDisponibilidadeService.update(accessContext, input);
    return TurmaDisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Remove uma turma-disponibilidade",
    operationId: "turmaDisponibilidadeDeleteOneById",
  })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    const input = TurmaDisponibilidadeRestMapper.toFindOneInput(params);
    return this.turmaDisponibilidadeService.deleteOneById(accessContext, input);
  }
}
