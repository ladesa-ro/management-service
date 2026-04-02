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
import { AccessContextHttp } from "@/server/nest/access-context";
import {
  ITurmaDisponibilidadeDeactivateCommandHandler,
  ITurmaDisponibilidadeSaveCommandHandler,
  TurmaDisponibilidadeDeactivateCommandMetadata,
  TurmaDisponibilidadeSaveCommandMetadata,
} from "../domain/commands";
import {
  ITurmaDisponibilidadeFindAllActiveQueryHandler,
  ITurmaDisponibilidadeFindByWeekQueryHandler,
  TurmaDisponibilidadeFindAllActiveQueryMetadata,
  TurmaDisponibilidadeFindByWeekQueryMetadata,
} from "../domain/queries";
import {
  TurmaDisponibilidadeAllOutputRestDto,
  TurmaDisponibilidadeConfigIdParamsRestDto,
  TurmaDisponibilidadeFindByWeekQueryRestDto,
  TurmaDisponibilidadeParentParamsRestDto,
  TurmaDisponibilidadeSaveInputRestDto,
  TurmaDisponibilidadeWeekOutputRestDto,
} from "./turma-disponibilidade.rest.dto";
import * as TurmaDisponibilidadeRestMapper from "./turma-disponibilidade.rest.mapper";

@ApiTags("turmas-disponibilidade")
@Controller("/horarios/turmas/:id/disponibilidade")
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
      turmaId: parentParams.id,
    });

    return {
      configs: configs.map((c) => TurmaDisponibilidadeRestMapper.mapConfigToOutputWithId(c)),
    };
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
      turmaId: parentParams.id,
      semana: queryParams.semana,
    });

    if (!config) {
      return { configs: [] };
    }

    return { configs: [TurmaDisponibilidadeRestMapper.mapConfigToOutput(config)] };
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
      turmaId: parentParams.id,
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

    return {
      configs: savedConfigs.map((c) => TurmaDisponibilidadeRestMapper.mapConfigToOutput(c)),
    };
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
      turmaId: params.id,
      configId: params.configId,
    });
  }
}
