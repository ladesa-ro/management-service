import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { IntervaloDeTempoService } from "@/application/resources/base/intervalo-de-tempo/intervalo-de-tempo.service";
import { DiarioService } from "@/application/resources/ensino/discente/diario/diario.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DiarioPreferenciaAgrupamentoEntity } from "@/infrastructure/integrations/database/typeorm/entities";

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
    domain: IDomain.DiarioPreferenciaAgrupamentoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<IDomain.DiarioPreferenciaAgrupamentoListOutput["success"]> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento);

    // =========================================================

    await accessContext.applyFilter("diario_preferencia_agrupamento:find", qb, aliasDiarioPreferenciaAgrupamento, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      domain
        ? {
            ...domain,
            sortBy: domain.sortBy ? (domain.sortBy as any[]).map((s) => (typeof s === "string" ? s : Array.isArray(s) ? s.join(":") : `${s.column}:${s.direction ?? "ASC"}`)) : undefined,
          }
        : {},
      {
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
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioPreferenciaAgrupamentoFindOneOutput", qb, aliasDiarioPreferenciaAgrupamento, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async diarioPreferenciaAgrupamentoFindById(
    accessContext: AccessContext,
    domain: IDomain.DiarioPreferenciaAgrupamentoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<IDomain.DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento);

    // =========================================================

    await accessContext.applyFilter("diario_preferencia_agrupamento:find", qb, aliasDiarioPreferenciaAgrupamento, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioPreferenciaAgrupamento}.id = :id`, {
      id: domain.id,
    });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioPreferenciaAgrupamentoFindOneOutput", qb, aliasDiarioPreferenciaAgrupamento, selection);
    // =========================================================

    const diarioPreferenciaAgrupamento = await qb.getOne();

    // =========================================================

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoFindByIdStrict(accessContext: AccessContext, domain: IDomain.DiarioPreferenciaAgrupamentoFindOneInput, selection?: string[] | boolean) {
    const diarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindById(accessContext, domain, selection);

    if (!diarioPreferenciaAgrupamento) {
      throw new NotFoundException();
    }

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.DiarioPreferenciaAgrupamentoFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.DiarioPreferenciaAgrupamentoFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento);

    // =========================================================

    await accessContext.applyFilter("diario_preferencia_agrupamento:find", qb, aliasDiarioPreferenciaAgrupamento, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioPreferenciaAgrupamento}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioPreferenciaAgrupamentoFindOneOutput", qb, aliasDiarioPreferenciaAgrupamento, selection);

    // =========================================================

    const diarioPreferenciaAgrupamento = await qb.getOne();

    // =========================================================

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DiarioPreferenciaAgrupamentoFindOneInput["id"], selection?: string[]) {
    const diarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindByIdSimple(accessContext, id, selection);

    if (!diarioPreferenciaAgrupamento) {
      throw new NotFoundException();
    }

    return diarioPreferenciaAgrupamento;
  }

  async diarioPreferenciaAgrupamentoCreate(accessContext: AccessContext, domain: IDomain.DiarioPreferenciaAgrupamentoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("diario_preferencia_agrupamento:create", { dto: domain });

    // =========================================================

    const dtoDiarioPreferenciaAgrupamento = pick(domain, ["diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim"]);

    const diarioPreferenciaAgrupamento = this.diarioPreferenciaAgrupamentoRepository.create();

    this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
      ...dtoDiarioPreferenciaAgrupamento,
    });

    // =========================================================

    if (domain.diario) {
      const diario = await this.DiarioService.diarioFindByIdStrict(accessContext, domain.body.diario);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        diario: {
          id: diario.id,
        },
      });
    }

    if (domain.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.body.intervaloDeTempo);

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

  async diarioPreferenciaAgrupamentoUpdate(accessContext: AccessContext, domain: IDomain.DiarioPreferenciaAgrupamentoUpdateInput) {
    // =========================================================

    const currentDiarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:update",
      { dto: domain },
      domain.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento),
    );

    const dtoDiarioPreferenciaAgrupamento = pick(domain, ["diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim"]);

    const diarioPreferenciaAgrupamento = {
      id: currentDiarioPreferenciaAgrupamento.id,
    } as DiarioPreferenciaAgrupamentoEntity;

    this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
      ...dtoDiarioPreferenciaAgrupamento,
    });

    // =========================================================

    if (has(domain, "diario") && domain.diario !== undefined) {
      const diario = await this.DiarioService.diarioFindByIdStrict(accessContext, domain.body.diario);

      this.diarioPreferenciaAgrupamentoRepository.merge(diarioPreferenciaAgrupamento, {
        diario: {
          id: diario.id,
        },
      });
    }

    if (has(domain, "intervaloDeTempo") && domain.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.body.intervaloDeTempo!);

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

  async diarioPreferenciaAgrupamentoDeleteOneById(accessContext: AccessContext, domain: IDomain.DiarioPreferenciaAgrupamentoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission(
      "diario_preferencia_agrupamento:delete",
      { dto: domain },
      domain.id,
      this.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(aliasDiarioPreferenciaAgrupamento),
    );

    // =========================================================

    const diarioPreferenciaAgrupamento = await this.diarioPreferenciaAgrupamentoFindByIdStrict(accessContext, domain);

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
