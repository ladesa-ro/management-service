import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { IntervaloDeTempoService } from "@/v2/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "@/v2/adapters/in/http/diario-preferencia-agrupamento/dto";

// ============================================================================

const aliasDiarioPreferenciaAgrupamento = "diario_preferencia_agrupamento";

// ============================================================================

@Injectable()
export class DiarioPreferenciaAgrupamentoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private DiarioService: DiarioService,
    private intervaloDeTempoService: IntervaloDeTempoService,
    private searchService: SearchService,
  ) {}

  get diarioPreferenciaAgrupamentoRepository() {
    return this.databaseContext.diarioPreferenciaAgrupamentoRepository;
  }

  async diarioPreferenciaAgrupamentoFindAll(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoListOutputDto> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento);

    // =========================================================

    await accessContext.applyFilter("diario_preferencia_agrupamento:find", qb, aliasDiarioPreferenciaAgrupamento, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "diaSemanaIso",
        "aulasSeguidas",
        "dataInicio",
        "dataFim",
        "diario",
        "intervaloDeTempo",

        "diario.id",
        "diario.ativo",

        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      sortableColumns: [
        "diaSemanaIso",
        "aulasSeguidas",
        "dataInicio",
        "dataFim",
        "diario",

        "diario.id",
        "intervaloDeTempo.id",
      ],
      searchableColumns: [
        "id",

        "diaSemanaIso",
        "aulasSeguidas",
        "dataInicio",
        "dataFim",
        "diario",
        "intervaloDeTempo",
      ],
      relations: {
        diario: true,
        intervaloDeTempo: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "diario.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioPreferenciaAgrupamentoFindOneOutput", qb, aliasDiarioPreferenciaAgrupamento, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as unknown as DiarioPreferenciaAgrupamentoListOutputDto;
  }

  async diarioPreferenciaAgrupamentoFindById(
    accessContext: AccessContext,
    dto: DiarioPreferenciaAgrupamentoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento);

    // =========================================================

    await accessContext.applyFilter("diario_preferencia_agrupamento:find", qb, aliasDiarioPreferenciaAgrupamento, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioPreferenciaAgrupamento}.id = :id`, {
      id: dto.id,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioPreferenciaAgrupamentoFindOneOutput", qb, aliasDiarioPreferenciaAgrupamento, selection);
    // =========================================================

    const diarioPreferenciaAgrupamento = await qb.getOne();

    // =========================================================

    return diarioPreferenciaAgrupamento as DiarioPreferenciaAgrupamentoFindOneOutputDto | null;
  }

  async diarioPreferenciaAgrupamentoFindByIdStrict(accessContext: AccessContext, dto: DiarioPreferenciaAgrupamentoFindOneInputDto, selection?: string[] | boolean): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const diarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindById(accessContext, dto, selection);

    if (!diarioPreferenciaAgrupamento) {
      throw new NotFoundException();
    }

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioPreferenciaAgrupamentoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento);

    // =========================================================

    await accessContext.applyFilter("diario_preferencia_agrupamento:find", qb, aliasDiarioPreferenciaAgrupamento, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioPreferenciaAgrupamento}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioPreferenciaAgrupamentoFindOneOutput", qb, aliasDiarioPreferenciaAgrupamento, selection);

    // =========================================================

    const diarioPreferenciaAgrupamento = await qb.getOne();

    // =========================================================

    return diarioPreferenciaAgrupamento as DiarioPreferenciaAgrupamentoFindOneOutputDto | null;
  }

  async diarioPreferenciaAgrupamentoFindByIdSimpleStrict(accessContext: AccessContext, id: DiarioPreferenciaAgrupamentoFindOneInputDto["id"], selection?: string[]): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const diarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindByIdSimple(accessContext, id, selection);

    if (!diarioPreferenciaAgrupamento) {
      throw new NotFoundException();
    }

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoCreate(accessContext: AccessContext, dto: DiarioPreferenciaAgrupamentoCreateInputDto): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("diario_preferencia_agrupamento:create", { dto } as any);

    // =========================================================

    const dtoDiarioPreferenciaAgrupamento = pick(dto, ["diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim"]);

    const diarioPreferenciaAgrupamento = this.diarioPreferenciaAgrupamentoRepository.create();

    this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
      ...dtoDiarioPreferenciaAgrupamento,
    });

    // =========================================================

    if (dto.diario) {
      const diario = await this.DiarioService.diarioFindByIdStrict(accessContext, dto.diario);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        diario: {
          id: diario.id,
        },
      });
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.intervaloDeTempo);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    // =========================================================

    await this.diarioPreferenciaAgrupamentoRepository.save(diarioPreferenciaAgrupamento);

    // =========================================================

    return this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, {
      id: diarioPreferenciaAgrupamento.id,
    });
  }

  async diarioPreferenciaAgrupamentoUpdate(accessContext: AccessContext, dto: DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    // =========================================================

    const currentDiarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:update",
      { dto },
      dto.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento),
    );

    const dtoDiarioPreferenciaAgrupamento = pick(dto, ["diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim"]);

    const diarioPreferenciaAgrupamento = {
      id: currentDiarioPreferenciaAgrupamento.id,
    } as DiarioPreferenciaAgrupamentoEntity;

    this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
      ...dtoDiarioPreferenciaAgrupamento,
    });

    // =========================================================

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.DiarioService.diarioFindByIdStrict(accessContext, dto.diario);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        diario: {
          id: diario.id,
        },
      });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.intervaloDeTempo!);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    // =========================================================

    await this.diarioPreferenciaAgrupamentoRepository.save(diarioPreferenciaAgrupamento);

    // =========================================================

    return this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, {
      id: diarioPreferenciaAgrupamento.id,
    });
  }

  async diarioPreferenciaAgrupamentoDeleteOneById(accessContext: AccessContext, dto: DiarioPreferenciaAgrupamentoFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:delete",
      { dto },
      dto.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento),
    );

    // =========================================================

    const diarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diarioPreferenciaAgrupamento) {
      await this.diarioPreferenciaAgrupamentoRepository
        .createQueryBuilder(aliasDiarioPreferenciaAgrupamento)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diarioPreferenciaAgrupamentoId", {
          diarioPreferenciaAgrupamentoId: diarioPreferenciaAgrupamento.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
