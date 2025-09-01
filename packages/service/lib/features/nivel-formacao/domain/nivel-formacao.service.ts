import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import type { AccessContext } from "@/infrastructure-antigo/access-context";
import { paginateConfig } from "@/infrastructure-antigo/fixtures";
import { DatabaseContextService } from "@/infrastructure-antigo/integrations/database";
import type { NivelFormacaoEntity } from "@/infrastructure-antigo/integrations/database/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared-antigo";
import { type IDomain } from "@/shared-antigo/tsp/schema/typings";

// ============================================================================

const aliasNivelFormacao = "nivel_formacao";

// ============================================================================

@Injectable()
export class NivelFormacaoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get nivelFormacaoRepository() {
    return this.databaseContext.nivelFormacaoRepository;
  }

  async nivelFormacaoFindAll(accessContext: AccessContext, domain: IDomain.NivelFormacaoListInput | null = null, selection?: string[]): Promise<IDomain.NivelFormacaoListOutput["success"]> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, domain, {
      ...paginateConfig,
      select: [
        "id",

        "slug",

        "dateCreated",
      ],
      sortableColumns: ["slug", "dateCreated"],
      searchableColumns: [
        "id",

        "slug",
      ],
      defaultSortBy: [
        ["slug", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async nivelFormacaoFindById(accessContext: AccessContext | null, domain: IDomain.NivelFormacaoFindOneInput, selection?: string[]): Promise<IDomain.NivelFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);
    }

    // =========================================================

    qb.andWhere(`${aliasNivelFormacao}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    // =========================================================

    const nivelFormacao = await qb.getOne();

    // =========================================================

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdStrict(accessContext: AccessContext, domain: IDomain.NivelFormacaoFindOneInput, selection?: string[]) {
    const nivelFormacao = await this.nivelFormacaoFindById(accessContext, domain, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdSimple(accessContext: AccessContext, id: IDomain.NivelFormacaoFindOneInput["id"], selection?: string[]): Promise<IDomain.NivelFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);

    // =========================================================

    qb.andWhere(`${aliasNivelFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    // =========================================================

    const nivelFormacao = await qb.getOne();

    // =========================================================

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.NivelFormacaoFindOneInput["id"], selection?: string[]) {
    const nivelFormacao = await this.nivelFormacaoFindByIdSimple(accessContext, id, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  async nivelFormacaoCreate(accessContext: AccessContext, domain: IDomain.NivelFormacaoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:create", { dto: domain });

    // =========================================================

    const dtoNivelFormacao = pick(domain, ["slug"]);

    const nivelFormacao = this.nivelFormacaoRepository.create();

    this.nivelFormacaoRepository.merge(nivelFormacao, {
      ...dtoNivelFormacao,
    });

    // =========================================================

    await this.nivelFormacaoRepository.save(nivelFormacao);

    // =========================================================

    return this.nivelFormacaoFindByIdStrict(accessContext, {
      id: nivelFormacao.id,
    });
  }

  async nivelFormacaoUpdate(accessContext: AccessContext, domain: IDomain.NivelFormacaoFindOneInput & IDomain.NivelFormacaoUpdateInput) {
    // =========================================================

    const currentNivelFormacao = await this.nivelFormacaoFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:update", { dto: domain }, domain.id, this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao));

    const dtoNivelFormacao = pick(domain, ["slug"]);

    const nivelFormacao = <NivelFormacaoEntity>{
      id: currentNivelFormacao.id,
    };

    this.nivelFormacaoRepository.merge(nivelFormacao, {
      ...dtoNivelFormacao,
    });

    // =========================================================

    await this.nivelFormacaoRepository.save(nivelFormacao);

    // =========================================================

    return this.nivelFormacaoFindByIdStrict(accessContext, {
      id: nivelFormacao.id,
    });
  }

  async nivelFormacaoDeleteOneById(accessContext: AccessContext, domain: IDomain.NivelFormacaoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:delete", { dto: domain }, domain.id, this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao));

    // =========================================================

    const nivelFormacao = await this.nivelFormacaoFindByIdStrict(accessContext, domain);

    // =========================================================

    if (nivelFormacao) {
      await this.nivelFormacaoRepository
        .createQueryBuilder(aliasNivelFormacao)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :nivelFormacaoId", { nivelFormacaoId: nivelFormacao.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
