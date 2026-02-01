import { Inject, Injectable } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import { DiarioService } from "@/modules/diario/application/use-cases/diario.service";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/modules/diario-preferencia-agrupamento/infrastructure/persistence/typeorm";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type {
  DiarioPreferenciaAgrupamentoCreateInput,
  DiarioPreferenciaAgrupamentoFindOneInput,
  DiarioPreferenciaAgrupamentoFindOneOutput,
  DiarioPreferenciaAgrupamentoListInput,
  DiarioPreferenciaAgrupamentoListOutput,
  DiarioPreferenciaAgrupamentoUpdateInput,
} from "../dtos";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  type IDiarioPreferenciaAgrupamentoRepositoryPort,
} from "../ports/out";

// ============================================================================

const aliasDiarioPreferenciaAgrupamento = "diario_preferencia_agrupamento";

// ============================================================================

@Injectable()
export class DiarioPreferenciaAgrupamentoService {
  constructor(
    @Inject(DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT)
    private readonly diarioPreferenciaAgrupamentoRepository: IDiarioPreferenciaAgrupamentoRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {}

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoListOutput> {
    return this.diarioPreferenciaAgrupamentoRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    return this.diarioPreferenciaAgrupamentoRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput> {
    const diarioPreferenciaAgrupamento = await this.findById(accessContext, dto, selection);

    if (!diarioPreferenciaAgrupamento) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", dto.id);
    }

    return diarioPreferenciaAgrupamento;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    return this.diarioPreferenciaAgrupamentoRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput> {
    const diarioPreferenciaAgrupamento = await this.findByIdSimple(accessContext, id, selection);

    if (!diarioPreferenciaAgrupamento) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", id);
    }

    return diarioPreferenciaAgrupamento;
  }

  // Legacy method aliases for compatibility
  async diarioPreferenciaAgrupamentoFindAll(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async diarioPreferenciaAgrupamentoFindById(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async diarioPreferenciaAgrupamentoFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async diarioPreferenciaAgrupamentoFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async diarioPreferenciaAgrupamentoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async diarioPreferenciaAgrupamentoCreate(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoCreateInput,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput> {
    await accessContext.ensurePermission("diario_preferencia_agrupamento:create", { dto } as any);

    const dtoDiarioPreferenciaAgrupamento = pick(dto, [
      "diaSemanaIso",
      "aulasSeguidas",
      "dataInicio",
      "dataFim",
    ]);

    const diarioPreferenciaAgrupamento = this.diarioPreferenciaAgrupamentoRepository.create();

    this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
      ...dtoDiarioPreferenciaAgrupamento,
    });

    if (dto.diario) {
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        diario: {
          id: diario.id,
        },
      });
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    const savedDiarioPreferenciaAgrupamento =
      await this.diarioPreferenciaAgrupamentoRepository.save(diarioPreferenciaAgrupamento);

    return this.findByIdStrict(accessContext, {
      id: savedDiarioPreferenciaAgrupamento.id,
    });
  }

  async diarioPreferenciaAgrupamentoUpdate(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInput & DiarioPreferenciaAgrupamentoUpdateInput,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutput> {
    const currentDiarioPreferenciaAgrupamento = await this.findByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:update",
      { dto },
      dto.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
        aliasDiarioPreferenciaAgrupamento,
      ),
    );

    const dtoDiarioPreferenciaAgrupamento = pick(dto, [
      "diaSemanaIso",
      "aulasSeguidas",
      "dataInicio",
      "dataFim",
    ]);

    const diarioPreferenciaAgrupamento = {
      id: currentDiarioPreferenciaAgrupamento.id,
    } as DiarioPreferenciaAgrupamentoEntity;

    this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
      ...dtoDiarioPreferenciaAgrupamento,
    });

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        diario: {
          id: diario.id,
        },
      });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    await this.diarioPreferenciaAgrupamentoRepository.save(diarioPreferenciaAgrupamento);

    return this.findByIdStrict(accessContext, {
      id: diarioPreferenciaAgrupamento.id,
    });
  }

  async diarioPreferenciaAgrupamentoDeleteOneById(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:delete",
      { dto },
      dto.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
        aliasDiarioPreferenciaAgrupamento,
      ),
    );

    const diarioPreferenciaAgrupamento = await this.findByIdStrict(accessContext, dto);

    if (diarioPreferenciaAgrupamento) {
      await this.diarioPreferenciaAgrupamentoRepository.softDeleteById(
        diarioPreferenciaAgrupamento.id,
      );
    }

    return true;
  }
}
