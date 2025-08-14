import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { NivelFormacaoService } from "@/application/resources/ensino/institucional/nivel-formacao/nivel-formacao.service";
import { OfertaFormacaoService } from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { OfertaFormacaoNivelFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasOfertaFormacaoNivelFormacao = "oferta_formacao_nivel_formacao";

// ============================================================================

@Injectable()
export class OfertaFormacaoNivelFormacaoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private ofertaFormacaoService: OfertaFormacaoService,
    private nivelFormacaoService: NivelFormacaoService,
    private searchService: SearchService,
  ) {}

  get ofertaFormacaoNivelFormacaoRepository() {
    return this.databaseContext.ofertaFormacaoNivelFormacaoRepository;
  }

  async ofertaFormacaoNivelFormacaoFindAll(
    accessContext: AccessContext,
    domain: IDomain.OfertaFormacaoNivelFormacaoListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.OfertaFormacaoNivelFormacaoListOutput["success"]> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(aliasOfertaFormacaoNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("oferta_formacao_nivel_formacao:find", qb, aliasOfertaFormacaoNivelFormacao, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      {
        ...domain,
        sortBy: domain?.sortBy ? domain.sortBy.map((s: any) => s.toString()) : undefined,
      },
      {
        ...paginateConfig,
        select: [
          "id",

          "dateCreated",
        ],
        relations: {
          nivelFormacao: true,
          ofertaFormacao: {
            modalidade: true,
          },
        },
        sortableColumns: ["dateCreated"],
        searchableColumns: ["id"],
        defaultSortBy: [["dateCreated", "ASC"]],
        filterableColumns: {
          "nivelFormacao.id": [FilterOperator.EQ],
          "ofertaFormacao.id": [FilterOperator.EQ],
          "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("OfertaFormacaoNivelFormacaoFindOneOutput", qb, aliasOfertaFormacaoNivelFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async ofertaFormacaoNivelFormacaoFindById(
    accessContext: AccessContext | null,
    domain: IDomain.OfertaFormacaoNivelFormacaoFindOneInput,
    selection?: string[],
  ): Promise<IDomain.OfertaFormacaoNivelFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(aliasOfertaFormacaoNivelFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("oferta_formacao_nivel_formacao:find", qb, aliasOfertaFormacaoNivelFormacao, null);
    }

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacaoNivelFormacao}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("OfertaFormacaoNivelFormacaoFindOneOutput", qb, aliasOfertaFormacaoNivelFormacao, selection);

    // =========================================================

    const ofertaFormacaoNivelFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext: AccessContext, domain: IDomain.OfertaFormacaoNivelFormacaoFindOneInput, selection?: string[]) {
    const ofertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindById(accessContext, domain, selection);

    if (!ofertaFormacaoNivelFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.OfertaFormacaoNivelFormacaoFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.OfertaFormacaoNivelFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(aliasOfertaFormacaoNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("oferta_formacao_nivel_formacao:find", qb, aliasOfertaFormacaoNivelFormacao, null);

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacaoNivelFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("OfertaFormacaoNivelFormacaoFindOneOutput", qb, aliasOfertaFormacaoNivelFormacao, selection);

    // =========================================================

    const ofertaFormacaoNivelFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.OfertaFormacaoNivelFormacaoFindOneInput["id"], selection?: string[]) {
    const ofertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindByIdSimple(accessContext, id, selection);

    if (!ofertaFormacaoNivelFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoCreate(accessContext: AccessContext, domain: IDomain.OfertaFormacaoNivelFormacaoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("oferta_formacao_nivel_formacao:create", { dto: domain });

    // =========================================================

    const dtoOfertaFormacaoNivelFormacao = pick(domain, []);

    const ofertaFormacaoNivelFormacao = this.ofertaFormacaoNivelFormacaoRepository.create();

    this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
      ...dtoOfertaFormacaoNivelFormacao,
    });

    // =========================================================

    if (domain.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, domain.ofertaFormacao.id);

      this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (domain.nivelFormcao) {
      const nivelFormacao = await this.nivelFormacaoService.nivelFormacaoFindByIdSimpleStrict(accessContext, domain.nivelFormcao.id);

      this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
        nivelFormacao: {
          id: nivelFormacao.id,
        },
      });
    }

    // =========================================================

    await this.ofertaFormacaoNivelFormacaoRepository.save(ofertaFormacaoNivelFormacao);

    // =========================================================

    return this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
      id: ofertaFormacaoNivelFormacao.id,
    });
  }

  async ofertaFormacaoNivelFormacaoUpdate(accessContext: AccessContext, domain: IDomain.OfertaFormacaoNivelFormacaoUpdateInput) {
    // =========================================================

    const currentOfertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:update",
      { dto: domain },
      domain.id,
      this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(aliasOfertaFormacaoNivelFormacao),
    );

    const dtoOfertaFormacaoNivelFormacao = pick(domain, []);

    const ofertaFormacaoNivelFormacao = <OfertaFormacaoNivelFormacaoEntity>{
      id: currentOfertaFormacaoNivelFormacao.id,
    };

    this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
      ...dtoOfertaFormacaoNivelFormacao,
    });

    // =========================================================

    if (has(domain, "ofertaFormacao") && domain.ofertaFormacao !== undefined) {
      const ofertaFormacao = domain.ofertaFormacao && (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, domain.ofertaFormacao.id));

      this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
        ofertaFormacao: ofertaFormacao && {
          id: ofertaFormacao.id,
        },
      });
    }

    if (has(domain, "nivelFormacao") && domain.nivelFormacao !== undefined) {
      const nivelFormacao = domain.nivelFormacao && (await this.nivelFormacaoService.nivelFormacaoFindByIdSimpleStrict(accessContext, domain.nivelFormacao.id));

      this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
        nivelFormacao: nivelFormacao && {
          id: nivelFormacao.id,
        },
      });
    }

    // =========================================================

    await this.ofertaFormacaoNivelFormacaoRepository.save(ofertaFormacaoNivelFormacao);

    // =========================================================

    return this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
      id: ofertaFormacaoNivelFormacao.id,
    });
  }

  async ofertaFormacaoNivelFormacaoDeleteOneById(accessContext: AccessContext, domain: IDomain.OfertaFormacaoNivelFormacaoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:delete",
      { dto: domain },
      domain.id,
      this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(aliasOfertaFormacaoNivelFormacao),
    );

    // =========================================================

    const ofertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, domain);

    // =========================================================

    if (ofertaFormacaoNivelFormacao) {
      await this.ofertaFormacaoNivelFormacaoRepository
        .createQueryBuilder(aliasOfertaFormacaoNivelFormacao)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :ofertaFormacaoNivelFormacaoId", {
          ofertaFormacaoNivelFormacaoId: ofertaFormacaoNivelFormacao.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
