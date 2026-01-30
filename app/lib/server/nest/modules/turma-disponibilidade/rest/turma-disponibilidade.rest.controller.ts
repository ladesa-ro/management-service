import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { TurmaDisponibilidadeService } from "@/core/turma-disponibilidade";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
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
  @ApiOperation({ summary: "Lista turmas-disponibilidades" })
  @ApiOkResponse({ type: TurmaDisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async turmaDisponibilidadeFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaDisponibilidadeListInputDto,
  ): Promise<TurmaDisponibilidadeListOutputDto> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto) as any;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca uma turma-disponibilidade por ID" })
  @ApiOkResponse({ type: TurmaDisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaDisponibilidadeFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindByIdStrict(
      accessContext,
      params,
    ) as any;
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma turma-disponibilidade" })
  @ApiCreatedResponse({ type: TurmaDisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async turmaDisponibilidadeCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto) as any;
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza uma turma-disponibilidade" })
  @ApiOkResponse({ type: TurmaDisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaDisponibilidadeUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputDto,
    @Body() dto: TurmaDisponibilidadeUpdateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeUpdate(accessContext, {
      id: params.id,
      ...dto,
    }) as any;
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove uma turma-disponibilidade" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async turmaDisponibilidadeDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: TurmaDisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeDeleteOneById(
      accessContext,
      params,
    );
  }
}
