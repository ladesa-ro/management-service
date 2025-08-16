import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { IntervaloDeTempoService } from "@/application/resources/base/intervalo-de-tempo/intervalo-de-tempo.service";
import { DisponibilidadeService } from "@/application/resources/horario-academico/disponibilidade/disponibilidade.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DisponibilidadeDiaEntity } from "@/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasDisponibilidadeDia = "disponibilidade_dia";

// ============================================================================

@Injectable()
export class DisponibilidadeDiaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private disponibilidadeService: DisponibilidadeService,
    private intervaloDeTempoService: IntervaloDeTempoService,
    private searchService: SearchService,
  ) {}

  get disponibilidadeDiaRepository() {
    return this.databaseContext.disponibilidadeDiaRepository;
  }

  async disponibilidadeDiaFindAll(
    accessContext: AccessContext,
    domain: IDomain.DisponibilidadeDiaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<IDomain.DisponibilidadeDiaListOutput["success"]> {
    // =========================================================

    const qb = this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia);

    // =========================================================

    await accessContext.applyFilter("disponibilidade_dia:find", qb, aliasDisponibilidadeDia, null);

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

          "rrule",

          "disponibilidade.id",
          "disponibilidade.dataInicio",
          "disponibilidade.dataFim",

          "intervaloDeTempo.id",
          "intervaloDeTempo.periodoInicio",
          "intervaloDeTempo.periodoFim",
        ],
        sortableColumns: [
          "disponibilidade.dataInicio",
          "disponibilidade.dataFim",

          "intervaloDeTempo.periodoInicio",
          "intervaloDeTempo.periodoFim",
        ],
        searchableColumns: [
          "id",

          "rrule",

          "disponibilidade.dataInicio",
          "disponibilidade.dataFim",

          "intervaloDeTempo.periodoInicio",
          "intervaloDeTempo.periodoFim",
        ],
        relations: {
          disponibilidade: true,
          intervaloDeTempo: true,
        },
        defaultSortBy: [],
        filterableColumns: {
          "disponibilidade.id": [FilterOperator.EQ],
          "intervaloDeTempo.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisponibilidadeDiaFindOneOutput", qb, aliasDisponibilidadeDia, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async disponibilidadeDiaFindById(
    accessContext: AccessContext,
    domain: IDomain.DisponibilidadeDiaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<IDomain.DisponibilidadeDiaFindOneOutput | null> {
    // =========================================================

    const qb = this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia);

    // =========================================================

    await accessContext.applyFilter("disponibilidade_dia:find", qb, aliasDisponibilidadeDia, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeDia}.id = :id`, {
      id: domain.id,
    });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisponibilidadeDiaFindOneOutput", qb, aliasDisponibilidadeDia, selection);
    // =========================================================

    const disponibilidadeDia = await qb.getOne();

    // =========================================================

    return disponibilidadeDia;
  }

  async disponibilidadeDiaFindByIdStrict(accessContext: AccessContext, domain: IDomain.DisponibilidadeDiaFindOneInput, selection?: string[] | boolean) {
    const disponibilidadeDia = await this.disponibilidadeDiaFindById(accessContext, domain, selection);

    if (!disponibilidadeDia) {
      throw new NotFoundException();
    }

    return disponibilidadeDia;
  }

  async disponibilidadeDiaFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.DisponibilidadeDiaFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.DisponibilidadeDiaFindOneOutput | null> {
    // =========================================================

    const qb = this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia);

    // =========================================================

    await accessContext.applyFilter("disponibilidade_dia:find", qb, aliasDisponibilidadeDia, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeDia}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisponibilidadeDiaFindOneOutput", qb, aliasDisponibilidadeDia, selection);

    // =========================================================

    const disponibilidadeDia = await qb.getOne();

    // =========================================================

    return disponibilidadeDia;
  }

  async disponibilidadeDiaFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DisponibilidadeDiaFindOneInput["id"], selection?: string[]) {
    const disponibilidadeDia = await this.disponibilidadeDiaFindByIdSimple(accessContext, id, selection);

    if (!disponibilidadeDia) {
      throw new NotFoundException();
    }

    return disponibilidadeDia;
  }

  async disponibilidadeDiaCreate(accessContext: AccessContext, domain: IDomain.DisponibilidadeDiaCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_dia:create", { dto: domain });

    // =========================================================

    const dtoDisponibilidadeDia = pick(domain, ["rrule"]);

    const disponibilidadeDia = this.disponibilidadeDiaRepository.create();

    this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
      ...dtoDisponibilidadeDia,
    });

    // =========================================================

    if (domain.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, domain.body.disponibilidade);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    if (domain.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.body.intervaloDeTempo);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeDiaRepository.save(disponibilidadeDia);

    // =========================================================

    return this.disponibilidadeDiaFindByIdStrict(accessContext, {
      id: disponibilidadeDia.id,
    });
  }

  async disponibilidadeDiaUpdate(accessContext: AccessContext, domain: IDomain.DisponibilidadeDiaUpdateInput) {
    // =========================================================

    const currentDisponibilidadeDia = await this.disponibilidadeDiaFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("disponibilidade_dia:update", { dto: domain }, domain.id, this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia));

    const dtoDisponibilidadeDia = pick(domain, ["rrule"]);

    const disponibilidadeDia = {
      id: currentDisponibilidadeDia.id,
    } as DisponibilidadeDiaEntity;

    this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
      ...dtoDisponibilidadeDia,
    });

    // =========================================================

    if (has(domain, "disponibilidade") && domain.disponibilidade !== undefined) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, domain.body.disponibilidade);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    if (has(domain, "intervaloDeTempo") && domain.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.body.intervaloDeTempo!);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeDiaRepository.save(disponibilidadeDia);

    // =========================================================

    return this.disponibilidadeDiaFindByIdStrict(accessContext, {
      id: disponibilidadeDia.id,
    });
  }

  async disponibilidadeDiaDeleteOneById(accessContext: AccessContext, domain: IDomain.DisponibilidadeDiaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_dia:delete", { dto: domain }, domain.id, this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia));

    // =========================================================

    const disponibilidadeDia = await this.disponibilidadeDiaFindByIdStrict(accessContext, domain);

    // =========================================================

    if (disponibilidadeDia) {
      await this.disponibilidadeDiaRepository
        .createQueryBuilder(aliasDisponibilidadeDia)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disponibilidadeDiaId", {
          disponibilidadeDiaId: disponibilidadeDia.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
