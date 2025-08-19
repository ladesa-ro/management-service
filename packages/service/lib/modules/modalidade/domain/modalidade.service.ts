import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { QbEfficientLoad } from "@/contracts/qb-efficient-load";
import { SearchService } from "@/legacy/application/helpers/search.service";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import type { AccessContext } from "@/shared/infrastructure/access-context";
import { paginateConfig } from "@/shared/infrastructure/fixtures";
import { DatabaseContextService } from "@/shared/infrastructure/integrations/database";
import type { ModalidadeEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasModalidade = "modalidade";

// ============================================================================

@Injectable()
export class ModalidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get modalidadeRepository() {
    return this.databaseContext.modalidadeRepository;
  }

  async modalidadeFindAll(accessContext: AccessContext, domain: IDomain.ModalidadeListInput | null = null, selection?: string[]): Promise<IDomain.ModalidadeListOutput["success"]> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);

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

          "nome",
          "slug",
          "dateCreated",
        ],
        sortableColumns: ["nome", "slug", "dateCreated"],
        searchableColumns: [
          "id",

          "nome",
          "slug",
        ],
        defaultSortBy: [
          ["nome", "ASC"],
          ["dateCreated", "ASC"],
        ],
        filterableColumns: {},
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async modalidadeFindById(accessContext: AccessContext | null, domain: IDomain.ModalidadeFindOneInput, selection?: string[]): Promise<IDomain.ModalidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdStrict(accessContext: AccessContext, domain: IDomain.ModalidadeFindOneInput, selection?: string[]) {
    const modalidade = await this.modalidadeFindById(accessContext, domain, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeFindByIdSimple(accessContext: AccessContext, id: IDomain.ModalidadeFindOneInput["id"], selection?: string[]): Promise<IDomain.ModalidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.ModalidadeFindOneInput["id"], selection?: string[]) {
    const modalidade = await this.modalidadeFindByIdSimple(accessContext, id, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeCreate(accessContext: AccessContext, domain: IDomain.ModalidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("modalidade:create", { dto: domain });

    // =========================================================

    const dtoModalidade = pick(domain, ["nome", "slug"]);

    const modalidade = this.modalidadeRepository.create();

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(accessContext, { id: modalidade.id });
  }

  async modalidadeUpdate(accessContext: AccessContext, domain: IDomain.ModalidadeUpdateInput) {
    // =========================================================

    const currentModalidade = await this.modalidadeFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("modalidade:update", { dto: domain }, domain.id, this.modalidadeRepository.createQueryBuilder(aliasModalidade));

    const dtoModalidade = pick(domain, ["nome", "slug"]);

    const modalidade = <ModalidadeEntity>{
      id: currentModalidade.id,
    };

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(accessContext, { id: modalidade.id });
  }

  async modalidadeDeleteOneById(accessContext: AccessContext, domain: IDomain.ModalidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("modalidade:delete", { dto: domain }, domain.id, this.modalidadeRepository.createQueryBuilder(aliasModalidade));

    // =========================================================

    const modalidade = await this.modalidadeFindByIdStrict(accessContext, domain);

    // =========================================================

    if (modalidade) {
      await this.modalidadeRepository
        .createQueryBuilder(aliasModalidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :modalidadeId", { modalidadeId: modalidade.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
