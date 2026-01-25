import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { TurmaDisponibilidadeService } from "@/v2/core/turma-disponibilidade/application/use-cases/turma-disponibilidade.service";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "@/v2/adapters/in/http/turma-disponibilidade/dto";

@ApiTags("turmas-disponibilidades")
@Controller("/turmas-disponibilidades")
export class TurmaDisponibilidadeController {
  constructor(private turmaDisponibilidadeService: TurmaDisponibilidadeService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista turmas-disponibilidades" })
  @ApiOkResponse({ type: TurmaDisponibilidadeListOutputDto })
  @ApiForbiddenResponse()
  async turmaDisponibilidadeFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: TurmaDisponibilidadeListInputDto,
  ): Promise<TurmaDisponibilidadeListOutputDto> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeFindAll(accessContext, dto);
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
    );
  }

  @Post("/")
  @ApiOperation({ summary: "Cria uma turma-disponibilidade" })
  @ApiCreatedResponse({ type: TurmaDisponibilidadeFindOneOutputDto })
  @ApiForbiddenResponse()
  async turmaDisponibilidadeCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    return this.turmaDisponibilidadeService.turmaDisponibilidadeCreate(accessContext, dto);
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
    });
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
