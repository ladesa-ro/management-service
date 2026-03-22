import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { CalendarioAgendamentoEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { AccessContextHttp } from "@/server/access-context";
import { ITurmaEventoRepository } from "../domain/repositories";
import {
  TurmaEventoCreateInputRestDto,
  TurmaEventoFindOneOutputRestDto,
  TurmaEventoItemParamsRestDto,
  TurmaEventoListOutputRestDto,
  TurmaEventoParentParamsRestDto,
  TurmaEventoUpdateInputRestDto,
} from "./turma-evento.rest.dto";

@ApiTags("turmas")
@Controller("/turmas/:turmaId/eventos")
export class TurmaEventoRestController {
  constructor(
    @DeclareDependency(ITurmaEventoRepository)
    private readonly turmaEventoRepository: ITurmaEventoRepository,
  ) {}

  @Get("/")
  @ApiOperation({ summary: "Lista eventos da turma", operationId: "turmaEventoFindAll" })
  @ApiOkResponse({ type: TurmaEventoListOutputRestDto })
  @ApiForbiddenResponse()
  async findAll(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() parentParams: TurmaEventoParentParamsRestDto,
  ): Promise<TurmaEventoListOutputRestDto> {
    const eventos = await this.turmaEventoRepository.findEventosByTurmaId(parentParams.turmaId);

    return {
      data: eventos.map((e) => this.toOutputDto(e)),
    };
  }

  @Post("/")
  @ApiOperation({ summary: "Cria evento escopado a turma", operationId: "turmaEventoCreate" })
  @ApiCreatedResponse({ type: TurmaEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() parentParams: TurmaEventoParentParamsRestDto,
    @Body() dto: TurmaEventoCreateInputRestDto,
  ): Promise<TurmaEventoFindOneOutputRestDto> {
    const evento = await this.turmaEventoRepository.createEvento(parentParams.turmaId, {
      nome: dto.nome,
      dataInicio: new Date(dto.dataInicio),
      dataFim: dto.dataFim ? new Date(dto.dataFim) : null,
      diaInteiro: dto.diaInteiro,
      horarioInicio: dto.horarioInicio ?? "00:00:00",
      horarioFim: dto.horarioFim ?? "23:59:59",
      cor: dto.cor ?? null,
      repeticao: dto.repeticao ?? null,
    });

    return this.toOutputDto(evento);
  }

  @Patch("/:eventoId")
  @ApiOperation({ summary: "Atualiza evento da turma", operationId: "turmaEventoUpdate" })
  @ApiOkResponse({ type: TurmaEventoFindOneOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async update(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: TurmaEventoItemParamsRestDto,
    @Body() dto: TurmaEventoUpdateInputRestDto,
  ): Promise<TurmaEventoFindOneOutputRestDto> {
    const entity = await this.turmaEventoRepository.updateEvento(params.eventoId, {
      nome: dto.nome,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diaInteiro: dto.diaInteiro,
      horarioInicio: dto.horarioInicio,
      horarioFim: dto.horarioFim,
      cor: dto.cor,
      repeticao: dto.repeticao,
    });

    return this.toOutputDto(entity);
  }

  @Delete("/:eventoId")
  @ApiOperation({ summary: "Remove evento da turma", operationId: "turmaEventoDelete" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async delete(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: TurmaEventoItemParamsRestDto,
  ): Promise<boolean> {
    await this.turmaEventoRepository.deleteEventoForTurma(params.eventoId, params.turmaId);
    return true;
  }

  private toOutputDto(entity: CalendarioAgendamentoEntity): TurmaEventoFindOneOutputRestDto {
    return {
      id: entity.id,
      nome: entity.nome,
      dataInicio:
        entity.dataInicio instanceof Date
          ? entity.dataInicio.toISOString().split("T")[0]
          : String(entity.dataInicio),
      dataFim:
        entity.dataFim instanceof Date
          ? entity.dataFim.toISOString().split("T")[0]
          : entity.dataFim
            ? String(entity.dataFim)
            : null,
      diaInteiro: entity.diaInteiro,
      horarioInicio: entity.horarioInicio,
      horarioFim: entity.horarioFim,
      cor: entity.cor,
      repeticao: entity.repeticao,
      status: entity.status,
    };
  }
}
