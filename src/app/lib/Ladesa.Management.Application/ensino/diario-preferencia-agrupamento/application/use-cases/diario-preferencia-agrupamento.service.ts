import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { DiarioService } from "@/Ladesa.Management.Application/ensino/diario/application/use-cases/diario.service";
import { DiarioPreferenciaAgrupamento } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento";
import { IntervaloDeTempoService } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "../dtos";
import { IDiarioPreferenciaAgrupamentoRepository } from "../ports/out";

@Injectable()
export class DiarioPreferenciaAgrupamentoService extends BaseCrudService<
  DiarioPreferenciaAgrupamento,
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
    @Inject(IDiarioPreferenciaAgrupamentoRepository)
    protected readonly repository: IDiarioPreferenciaAgrupamentoRepository,
    private readonly diarioService: DiarioService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoCreateInputDto,
  ): Promise<Partial<PersistInput<DiarioPreferenciaAgrupamento>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto,
    current: DiarioPreferenciaAgrupamentoFindOneOutputDto,
  ): Promise<Partial<PersistInput<DiarioPreferenciaAgrupamento>>> {
    const domain = DiarioPreferenciaAgrupamento.fromData({
      ...current,
      diarioId: current.diario.id,
      intervaloDeTempoId: current.intervaloDeTempo.id,
    } as unknown as DiarioPreferenciaAgrupamento);
    domain.atualizar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    });
    const result: Partial<PersistInput<DiarioPreferenciaAgrupamento>> = {
      diaSemanaIso: domain.diaSemanaIso,
      aulasSeguidas: domain.aulasSeguidas,
      dataInicio: domain.dataInicio,
      dataFim: domain.dataFim,
    };

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);
      result.diarioId = diario.id;
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );
      result.intervaloDeTempoId = intervaloDeTempo!.id;
    }

    return result;
  }
}
