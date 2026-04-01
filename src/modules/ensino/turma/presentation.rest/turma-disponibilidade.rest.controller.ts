import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import {
  ITurmaDisponibilidadeDeactivateCommandHandler,
  ITurmaDisponibilidadeSaveCommandHandler,
  TurmaDisponibilidadeDeactivateCommandMetadata,
  TurmaDisponibilidadeSaveCommandMetadata,
} from "@/modules/horarios/turma-disponibilidade/domain/commands";
import {
  ITurmaDisponibilidadeFindAllActiveQueryHandler,
  ITurmaDisponibilidadeFindByWeekQueryHandler,
  TurmaDisponibilidadeFindAllActiveQueryMetadata,
  TurmaDisponibilidadeFindByWeekQueryMetadata,
} from "@/modules/horarios/turma-disponibilidade/domain/queries";
import type { TurmaDisponibilidadeConfiguracao } from "@/modules/horarios/turma-disponibilidade/domain/turma-disponibilidade";
import { AccessContextHttp } from "@/server/nest/access-context";
import type {
  TurmaDisponibilidadeConfigOutputRestDto,
  TurmaDisponibilidadeConfigWithIdOutputRestDto,
} from "./turma-disponibilidade.rest.dto";
import {
  TurmaDisponibilidadeAllOutputRestDto,
  TurmaDisponibilidadeConfigIdParamsRestDto,
  TurmaDisponibilidadeFindByWeekQueryRestDto,
  TurmaDisponibilidadeParentParamsRestDto,
  TurmaDisponibilidadeSaveInputRestDto,
  TurmaDisponibilidadeWeekOutputRestDto,
} from "./turma-disponibilidade.rest.dto";

@ApiTags("turmas")
@Controller("/turmas/:turmaId/disponibilidade")
export class TurmaDisponibilidadeRestController {
  constructor(
    @DeclareDependency(ITurmaDisponibilidadeFindAllActiveQueryHandler)
    private readonly findAllActiveHandler: ITurmaDisponibilidadeFindAllActiveQueryHandler,
    @DeclareDependency(ITurmaDisponibilidadeFindByWeekQueryHandler)
    private readonly findByWeekHandler: ITurmaDisponibilidadeFindByWeekQueryHandler,
    @DeclareDependency(ITurmaDisponibilidadeSaveCommandHandler)
    private readonly saveHandler: ITurmaDisponibilidadeSaveCommandHandler,
    @DeclareDependency(ITurmaDisponibilidadeDeactivateCommandHandler)
    private readonly deactivateHandler: ITurmaDisponibilidadeDeactivateCommandHandler,
  ) {}

  @Get("/all")
  @ApiOperation(TurmaDisponibilidadeFindAllActiveQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: TurmaDisponibilidadeAllOutputRestDto })
  @ApiForbiddenResponse()
  async findAllActive(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() parentParams: TurmaDisponibilidadeParentParamsRestDto,
  ): Promise<TurmaDisponibilidadeAllOutputRestDto> {
    const configs = await this.findAllActiveHandler.execute(accessContext, {
      turmaId: parentParams.turmaId,
    });

    return { configs: configs.map((c) => this.mapConfigToOutputWithId(c)) };
  }

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
        identificadorExternoGradeHoraria: c.identificador_externo_grade_horaria ?? null,
        horarios: c.horarios.map((h) => ({
          diaSemana: h.dia_semana,
          intervalos: h.intervalos,
        })),
      })),
    });

    return { configs: savedConfigs.map((c) => this.mapConfigToOutput(c)) };
  }

  @Delete("/:configId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(TurmaDisponibilidadeDeactivateCommandMetadata.swaggerMetadata)
  @ApiNoContentResponse({ description: "Configuracao desativada com sucesso" })
  @ApiForbiddenResponse()
  async deactivate(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: TurmaDisponibilidadeConfigIdParamsRestDto,
  ): Promise<void> {
    await this.deactivateHandler.execute(accessContext, {
      turmaId: params.turmaId,
      configId: params.configId,
    });
  }

  private mapConfigToOutputWithId(
    config: TurmaDisponibilidadeConfiguracao,
  ): TurmaDisponibilidadeConfigWithIdOutputRestDto {
    return {
      id: config.id,
      ...this.mapConfigToOutput(config),
    };
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
      identificador_externo_grade_horaria: config.identificadorExternoGradeHoraria ?? null,
      horarios,
    };
  }
}
