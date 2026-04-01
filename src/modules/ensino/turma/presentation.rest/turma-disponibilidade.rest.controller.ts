import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  ITurmaDisponibilidadeSaveCommandHandler,
  TurmaDisponibilidadeSaveCommandMetadata,
} from "@/modules/horarios/turma-disponibilidade/domain/commands";
import {
  ITurmaDisponibilidadeFindByWeekQueryHandler,
  TurmaDisponibilidadeFindByWeekQueryMetadata,
} from "@/modules/horarios/turma-disponibilidade/domain/queries";
import type { TurmaDisponibilidadeConfiguracao } from "@/modules/horarios/turma-disponibilidade/domain/turma-disponibilidade";
import { AccessContextHttp } from "@/server/nest/access-context";
import type { TurmaDisponibilidadeConfigOutputRestDto } from "./turma-disponibilidade.rest.dto";
import {
  TurmaDisponibilidadeFindByWeekQueryRestDto,
  TurmaDisponibilidadeParentParamsRestDto,
  TurmaDisponibilidadeSaveInputRestDto,
  TurmaDisponibilidadeWeekOutputRestDto,
} from "./turma-disponibilidade.rest.dto";

@ApiTags("turmas")
@Controller("/turmas/:turmaId/disponibilidade")
export class TurmaDisponibilidadeRestController {
  constructor(
    @DeclareDependency(ITurmaDisponibilidadeFindByWeekQueryHandler)
    private readonly findByWeekHandler: ITurmaDisponibilidadeFindByWeekQueryHandler,
    @DeclareDependency(ITurmaDisponibilidadeSaveCommandHandler)
    private readonly saveHandler: ITurmaDisponibilidadeSaveCommandHandler,
  ) {}

  @Get("/")
  @ApiOperation(TurmaDisponibilidadeFindByWeekQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaDisponibilidadeWeekOutputRestDto })
  @ApiForbiddenResponse()
  async findByWeek(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: TurmaDisponibilidadeParentParamsRestDto,
    @Query() queryParams: TurmaDisponibilidadeFindByWeekQueryRestDto,
  ): Promise<TurmaDisponibilidadeWeekOutputRestDto> {
    const config = await this.findByWeekHandler.execute(accessContext, {
      turmaId: parentParams.turmaId,
      semana: queryParams.semana,
    });

    if (!config) {
      return { configs: [] };
    }

    return { configs: [this.mapConfigToOutput(config)] };
  }

  @Put("/")
  @ApiOperation(TurmaDisponibilidadeSaveCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaDisponibilidadeWeekOutputRestDto })
  @ApiForbiddenResponse()
  async save(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: TurmaDisponibilidadeParentParamsRestDto,
    @Body() dto: TurmaDisponibilidadeSaveInputRestDto,
  ): Promise<TurmaDisponibilidadeWeekOutputRestDto> {
    const savedConfigs = await this.saveHandler.execute(accessContext, {
      turmaId: parentParams.turmaId,
      configs: dto.configs.map((c) => ({
        dataInicio: c.data_inicio,
        dataFim: c.data_fim,
        horarios: c.horarios.map((h) => ({
          diaSemana: h.dia_semana,
          intervalos: h.intervalos,
        })),
      })),
    });

    return { configs: savedConfigs.map((c) => this.mapConfigToOutput(c)) };
  }

  private mapConfigToOutput(
    config: TurmaDisponibilidadeConfiguracao,
  ): TurmaDisponibilidadeConfigOutputRestDto {
    const diasMap = new Map<number, { inicio: string; fim: string }[]>();

    for (const item of config.horarios) {
      const intervalos = diasMap.get(item.diaSemana) ?? [];
      intervalos.push({ inicio: item.inicio, fim: item.fim });
      diasMap.set(item.diaSemana, intervalos);
    }

    const horarios = Array.from(diasMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([diaSemana, intervalos]) => ({
        dia_semana: diaSemana,
        intervalos: intervalos.sort((a, b) => a.inicio.localeCompare(b.inicio)),
      }));

    return {
      data_inicio: config.dataInicio,
      data_fim: config.dataFim,
      horarios,
    };
  }
}
