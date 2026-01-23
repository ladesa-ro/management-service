import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/infrastructure.database";
import type { DisponibilidadeEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import { type IDomain } from "@/shared/tsp/schema/typings";

// ============================================================================

const aliasDisponibilidade = "disponibilidade";

// ============================================================================

@Injectable()
export class DisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get disponibilidadeRepository() {
    return this.databaseContext.disponibilidadeRepository;
  }

  async disponibilidadeFindAll(accessContext: AccessContext, domain: IDomain.DisponibilidadeListInput | null = null, selection?: string[]): Promise<IDomain.DisponibilidadeListOutput["success"]> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, domain, {
      ...paginateConfig,
      select: [
        "id",

        "dataInicio",
        "dataFim",
        "dateCreated",
      ],
      sortableColumns: ["dataInicio", "dataFim", "dateCreated"],
      searchableColumns: [
        "id",

        "dataInicio",
        "dataFim",
      ],
      defaultSortBy: [
        ["dataInicio", "ASC"],
        ["dataFim", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();

    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async disponibilidadeFindById(accessContext: AccessContext | null, domain: IDomain.DisponibilidadeFindOneInput, selection?: string[]): Promise<IDomain.DisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    // =========================================================

    const disponibilidade = await qb.getOne();

    // =========================================================

    return disponibilidade;
  }

  async disponibilidadeFindByIdStrict(accessContext: AccessContext, domain: IDomain.DisponibilidadeFindOneInput, selection?: string[]) {
    const disponibilidade = await this.disponibilidadeFindById(accessContext, domain, selection);

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  async disponibilidadeFindByIdSimple(accessContext: AccessContext, id: IDomain.DisponibilidadeFindOneInput["id"], selection?: string[]): Promise<IDomain.DisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    // =========================================================

    const disponibilidade = await qb.getOne();

    // =========================================================

    return disponibilidade;
  }

  async disponibilidadeFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DisponibilidadeFindOneInput["id"], selection?: string[]) {
    const disponibilidade = await this.disponibilidadeFindByIdSimple(accessContext, id, selection);

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  async disponibilidadeCreate(accessContext: AccessContext, domain: IDomain.DisponibilidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade:create", { dto: domain });

    // =========================================================

    const dtoDisponibilidade = pick(domain, ["dataInicio", "dataFim"]);

    const disponibilidade = this.disponibilidadeRepository.create();

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    // =========================================================

    await this.disponibilidadeRepository.save(disponibilidade);

    // =========================================================

    return this.disponibilidadeFindByIdStrict(accessContext, {
      id: disponibilidade.id,
    });
  }

  async disponibilidadeUpdate(accessContext: AccessContext, domain: IDomain.DisponibilidadeFindOneInput & IDomain.DisponibilidadeUpdateInput) {
    // =========================================================

    const currentDisponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("disponibilidade:update", { dto: domain }, domain.id, this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade));

    const dtoDisponibilidade = pick(domain, ["dataInicio", "dataFim"]);

    const disponibilidade = <DisponibilidadeEntity>{
      id: currentDisponibilidade.id,
    };

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    // =========================================================

    await this.disponibilidadeRepository.save(disponibilidade);

    // =========================================================

    return this.disponibilidadeFindByIdStrict(accessContext, {
      id: disponibilidade.id,
    });
  }

  async disponibilidadeDeleteOneById(accessContext: AccessContext, domain: IDomain.DisponibilidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade:delete", { dto: domain }, domain.id, this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade));

    // =========================================================

    const disponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, domain);

    // =========================================================

    if (disponibilidade) {
      await this.disponibilidadeRepository
        .createQueryBuilder(aliasDisponibilidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disponibilidadeId", {
          disponibilidadeId: disponibilidade.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
