import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { ModalidadeService } from "@/application/resources/ensino/institucional/modalidade/modalidade.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { OfertaFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasOfertaFormacao = "oferta_formacao";

// ============================================================================

@Injectable()
export class OfertaFormacaoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private modalidadeService: ModalidadeService,
    private searchService: SearchService,
  ) {}

  get ofertaFormacaoRepository() {
    return this.databaseContext.ofertaFormacaoRepository;
  }

  async ofertaFormacaoFindAll(accessContext: AccessContext, domain: IDomain.OfertaFormacaoListInput | null = null, selection?: string[]): Promise<IDomain.OfertaFormacaoListOutput["success"]> {
    // =========================================================

    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);

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
        relations: {
          modalidade: true,
        },
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
        filterableColumns: {
          "modalidade.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async ofertaFormacaoFindById(accessContext: AccessContext | null, domain: IDomain.OfertaFormacaoFindOneInput, selection?: string[]): Promise<IDomain.OfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);
    }

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    // =========================================================

    const ofertaFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdStrict(accessContext: AccessContext, domain: IDomain.OfertaFormacaoFindOneInput, selection?: string[]) {
    const ofertaFormacao = await this.ofertaFormacaoFindById(accessContext, domain, selection);

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdSimple(accessContext: AccessContext, id: IDomain.OfertaFormacaoFindOneInput["id"], selection?: string[]): Promise<IDomain.OfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    // =========================================================

    const ofertaFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.OfertaFormacaoFindOneInput["id"], selection?: string[]) {
    const ofertaFormacao = await this.ofertaFormacaoFindByIdSimple(accessContext, id, selection);

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  async ofertaFormacaoCreate(accessContext: AccessContext, domain: IDomain.OfertaFormacaoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:create", { dto: domain });

    // =========================================================

    const dtoOfertaFormacao = pick(domain, ["nome", "slug"]);

    const ofertaFormacao = this.ofertaFormacaoRepository.create();

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    // =========================================================

    if (domain.modalidade) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, domain.modalidade.id);

      this.ofertaFormacaoRepository.merge(ofertaFormacao, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.ofertaFormacaoRepository.save(ofertaFormacao);

    // =========================================================

    return this.ofertaFormacaoFindByIdStrict(accessContext, {
      id: ofertaFormacao.id,
    });
  }

  async ofertaFormacaoUpdate(accessContext: AccessContext, domain: IDomain.OfertaFormacaoUpdateInput) {
    // =========================================================

    const currentOfertaFormacao = await this.ofertaFormacaoFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:update", { dto: domain }, domain.id, this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao));

    const dtoOfertaFormacao = pick(domain, ["nome", "slug"]);

    const ofertaFormacao = <OfertaFormacaoEntity>{
      id: currentOfertaFormacao.id,
    };

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    // =========================================================

    if (has(domain, "modalidade") && domain.modalidade !== undefined) {
      const modalidade = domain.modalidade && (await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, domain.modalidade.id));

      this.ofertaFormacaoRepository.merge(ofertaFormacao, {
        modalidade: modalidade && {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.ofertaFormacaoRepository.save(ofertaFormacao);

    // =========================================================

    return this.ofertaFormacaoFindByIdStrict(accessContext, {
      id: ofertaFormacao.id,
    });
  }

  async ofertaFormacaoDeleteOneById(accessContext: AccessContext, domain: IDomain.OfertaFormacaoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:delete", { dto: domain }, domain.id, this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao));

    // =========================================================

    const ofertaFormacao = await this.ofertaFormacaoFindByIdStrict(accessContext, domain);

    // =========================================================

    if (ofertaFormacao) {
      await this.ofertaFormacaoRepository
        .createQueryBuilder(aliasOfertaFormacao)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :ofertaFormacaoId", {
          ofertaFormacaoId: ofertaFormacao.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
