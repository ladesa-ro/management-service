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
import { TurmaDisponibilidadeService } from "@/modules/ensino/turma-disponibilidade";
import {
  TurmaDisponibilidadeCreateInputRestDto,
  TurmaDisponibilidadeFindOneInputRestDto,
  TurmaDisponibilidadeFindOneOutputRestDto,
  TurmaDisponibilidadeListInputRestDto,
  TurmaDisponibilidadeListOutputRestDto,
  TurmaDisponibilidadeUpdateInputRestDto,
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
  @ApiOkResponse({ type: TurmaDisponibilidadeListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaDisponibilidadeListInputRestDto,
  ): Promise<TurmaDisponibilidadeListOutputRestDto> {
    const input = TurmaDisponibilidadeRestMapper.toListInput(dto);
    const result = await this.turmaDisponibilidadeService.findAll(accessContext, input);
    return TurmaDisponibilidadeRestMapper.toListOutputDto(result);
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Busca uma turma-disponibilidade por ID",
    operationId: "turmaDisponibilidadeFindById",
  })
  @ApiOkResponse({ type: TurmaDisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async findById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputRestDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputRestDto> {
    const input = TurmaDisponibilidadeRestMapper.toFindOneInput(params);
    const result = await this.turmaDisponibilidadeService.findByIdStrict(accessContext, input);
    return TurmaDisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Post("/")
  @ApiOperation({
    summary: "Cria uma turma-disponibilidade",
    operationId: "turmaDisponibilidadeCreate",
  })
  @ApiCreatedResponse({ type: TurmaDisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: TurmaDisponibilidadeCreateInputRestDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputRestDto> {
    const input = TurmaDisponibilidadeRestMapper.toCreateInput(dto);
    const result = await this.turmaDisponibilidadeService.create(accessContext, input);
    return TurmaDisponibilidadeRestMapper.toFindOneOutputDto(result);
  }

  @Patch("/:id")
  @ApiOperation({
    summary: "Atualiza uma turma-disponibilidade",
    operationId: "turmaDisponibilidadeUpdate",
  })
  @ApiOkResponse({ type: TurmaDisponibilidadeFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputRestDto,
    @Body() dto: TurmaDisponibilidadeUpdateInputRestDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputRestDto> {
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
    @Param() params: TurmaDisponibilidadeFindOneInputRestDto,
  ): Promise<boolean> {
    const input = TurmaDisponibilidadeRestMapper.toFindOneInput(params);
    return this.turmaDisponibilidadeService.deleteOneById(accessContext, input);
  }
}
