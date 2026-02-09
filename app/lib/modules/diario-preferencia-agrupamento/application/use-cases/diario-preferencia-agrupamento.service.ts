import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { DiarioService } from "@/modules/diario/application/use-cases/diario.service";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/modules/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
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
  DiarioPreferenciaAgrupamentoEntity,
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
  protected readonly createFields = [
    "diaSemanaIso",
    "aulasSeguidas",
    "dataInicio",
    "dataFim",
  ] as const;
  protected readonly updateFields = [
    "diaSemanaIso",
    "aulasSeguidas",
    "dataInicio",
    "dataFim",
  ] as const;

  constructor(
    @Inject(DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT)
    protected readonly repository: IDiarioPreferenciaAgrupamentoRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiarioPreferenciaAgrupamentoEntity,
    dto: DiarioPreferenciaAgrupamentoCreateInputDto,
  ): Promise<void> {
    if (dto.diario) {
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);
      this.repository.merge(entity, { diario: { id: diario.id } });
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      this.repository.merge(entity, { intervaloDeTempo: { id: intervalo!.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: DiarioPreferenciaAgrupamentoEntity,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);
      this.repository.merge(entity, { diario: { id: diario.id } });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );
      this.repository.merge(entity, { intervaloDeTempo: { id: intervaloDeTempo!.id } });
    }
  }
}
