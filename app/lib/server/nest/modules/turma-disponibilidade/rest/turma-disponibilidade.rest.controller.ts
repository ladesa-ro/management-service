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
    return this.turmaDisponibilidadeService.findAll(accessContext, dto) as any;
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
    return this.turmaDisponibilidadeService.findByIdStrict(accessContext, params) as any;
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
    return this.turmaDisponibilidadeService.create(accessContext, dto) as any;
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
    return this.turmaDisponibilidadeService.update(accessContext, {
      id: params.id,
      ...dto,
    }) as any;
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
    return this.turmaDisponibilidadeService.deleteOneById(accessContext, params);
  }
}
