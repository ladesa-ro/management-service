import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import {
  DiarioPreferenciaAgrupamento,
  type IDiarioPreferenciaAgrupamento,
} from "@/modules/ensino/diario-preferencia-agrupamento";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "../dtos";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  type IDiarioPreferenciaAgrupamentoRepositoryPort,
} from "../ports/out";

@Injectable()
export class DiarioPreferenciaAgrupamentoService extends BaseCrudService<
  IDiarioPreferenciaAgrupamento,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto
> {
  protected readonly resourceName = "DiarioPreferenciaAgrupamento";
  protected readonly createAction = "diario_preferencia_agrupamento:create";
  protected readonly updateAction = "diario_preferencia_agrupamento:update";
  protected readonly deleteAction = "diario_preferencia_agrupamento:delete";

  constructor(
    @Inject(DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT)
    protected readonly repository: IDiarioPreferenciaAgrupamentoRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoCreateInputDto,
  ): Promise<Partial<PersistInput<IDiarioPreferenciaAgrupamento>>> {
    let diarioRef: { id: string } | undefined;
    if (dto.diario) {
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);
      diarioRef = { id: diario.id };
    }

    let intervaloRef: { id: string } | undefined;
    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      intervaloRef = { id: intervalo!.id };
    }

    const domain = DiarioPreferenciaAgrupamento.criar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diario: diarioRef!,
      intervaloDeTempo: intervaloRef!,
    });
    return {
      ...domain,
      ...(diarioRef ? { diario: diarioRef } : {}),
      ...(intervaloRef ? { intervaloDeTempo: intervaloRef } : {}),
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto,
    current: DiarioPreferenciaAgrupamentoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IDiarioPreferenciaAgrupamento>>> {
    const domain = DiarioPreferenciaAgrupamento.fromData(current);
    domain.atualizar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    });
    const result: Partial<PersistInput<IDiarioPreferenciaAgrupamento>> = {
      diaSemanaIso: domain.diaSemanaIso,
      aulasSeguidas: domain.aulasSeguidas,
      dataInicio: domain.dataInicio,
      dataFim: domain.dataFim,
    };

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);
      result.diario = { id: diario.id };
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );
      result.intervaloDeTempo = { id: intervaloDeTempo!.id };
    }

    return result;
  }
}
