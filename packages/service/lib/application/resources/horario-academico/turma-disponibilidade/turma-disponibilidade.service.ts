import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { TurmaService } from "@/application/resources/ensino/discente/turma/turma.service";
import { DisponibilidadeService } from "@/application/resources/horario-academico/disponibilidade/disponibilidade.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { TurmaDisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasTurmaDisponibilidade = "turma_disponibilidade";

// ============================================================================

@Injectable()
export class TurmaDisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private turmaService: TurmaService,
    private disponibilidadeService: DisponibilidadeService,
    private searchService: SearchService,
  ) {}

  get turmaDisponibilidadeRepository() {
    return this.databaseContext.turmaDisponibilidadeRepository;
  }

  async turmaDisponibilidadeFindAll(
    accessContext: AccessContext,
    domain: IDomain.TurmaDisponibilidadeListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.TurmaDisponibilidadeListOutput["success"]> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("turma_disponibilidade:find", qb, aliasTurmaDisponibilidade, null);

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
        select: [
          "id",

          "dateCreated",
        ],
        relations: {
          turma: true,
          disponibilidade: true,
        },
        sortableColumns: ["dateCreated"],
        searchableColumns: ["id"],
        defaultSortBy: [["dateCreated", "ASC"]],
        filterableColumns: {
          "turma.id": [FilterOperator.EQ],
          "disponibilidade.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("TurmaDisponibilidadeFindOneOutput", qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async turmaDisponibilidadeFindById(
    accessContext: AccessContext | null,
    domain: IDomain.TurmaDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<IDomain.TurmaDisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("turma_disponibilidade:find", qb, aliasTurmaDisponibilidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("TurmaDisponibilidadeFindOneOutput", qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdStrict(accessContext: AccessContext, domain: IDomain.TurmaDisponibilidadeFindOneInput, selection?: string[]) {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindById(accessContext, domain, selection);

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.TurmaDisponibilidadeFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.TurmaDisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("turma_disponibilidade:find", qb, aliasTurmaDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("TurmaDisponibilidadeFindOneOutput", qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.TurmaDisponibilidadeFindOneInput["id"], selection?: string[]) {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindByIdSimple(accessContext, id, selection);

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeCreate(accessContext: AccessContext, domain: IDomain.TurmaDisponibilidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade:create", {
      dto: domain,
    });

    // =========================================================

    const dtoTurmaDisponibilidade = pick(domain, []);

    const turmaDisponibilidade = this.turmaDisponibilidadeRepository.create();

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (domain.turma) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, domain.turma.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: {
          id: turma.id,
        },
      });
    }

    // =========================================================

    if (domain.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, domain.disponibilidade.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    // =========================================================

    return this.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: turmaDisponibilidade.id,
    });
  }

  async turmaDisponibilidadeUpdate(accessContext: AccessContext, domain: IDomain.TurmaDisponibilidadeUpdateInput) {
    // =========================================================

    const currentTurmaDisponibilidade = await this.turmaDisponibilidadeFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade:update", { dto: domain }, domain.id, this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade));

    const dtoTurmaDisponibilidade = pick(domain, []);

    const turmaDisponibilidade = <TurmaDisponibilidadeEntity>{
      id: currentTurmaDisponibilidade.id,
    };

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (has(domain, "turma") && domain.turma !== undefined) {
      const turma = domain.turma && (await this.turmaService.turmaFindByIdSimpleStrict(accessContext, domain.turma.id));

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: turma && {
          id: turma.id,
        },
      });
    }

    if (has(domain, "disponibilidade") && domain.disponibilidade !== undefined) {
      const disponibilidade = domain.disponibilidade && (await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, domain.disponibilidade.id));

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        disponibilidade: disponibilidade && {
          id: disponibilidade.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    // =========================================================

    return this.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: turmaDisponibilidade.id,
    });
  }

  async turmaDisponibilidadeDeleteOneById(accessContext: AccessContext, domain: IDomain.TurmaDisponibilidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade:delete", { dto: domain }, domain.id, this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade));

    // =========================================================

    const turmaDisponibilidade = await this.turmaDisponibilidadeFindByIdStrict(accessContext, domain);

    // =========================================================

    if (turmaDisponibilidade) {
      await this.turmaDisponibilidadeRepository
        .createQueryBuilder(aliasTurmaDisponibilidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :turmaDisponibilidadeId", {
          turmaDisponibilidadeId: turmaDisponibilidade.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
