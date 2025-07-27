import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { SearchService } from "@/application/helpers/search.service";
import { ModalidadeService } from "@/application/resources/ensino/institucional/modalidade/modalidade.service";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { IDomain } from "@/domain/contracts/integration";
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

  async ofertaFormacaoFindAll(accessContext: AccessContext, dto: IDomain.OfertaFormacaoListInput | null = null, selection?: string[]): Promise<IDomain.OfertaFormacaoListOutput["success"]> {
    // =========================================================

    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
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
    QbEfficientLoad(LadesaTypings.Tokens.OfertaFormacaoView, qb, aliasOfertaFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async ofertaFormacaoFindById(accessContext: AccessContext | null, dto: IDomain.OfertaFormacaoFindOneInput, selection?: string[]): Promise<IDomain.OfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);
    }

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.OfertaFormacaoView, qb, aliasOfertaFormacao, selection);

    // =========================================================

    const ofertaFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdStrict(accessContext: AccessContext, dto: IDomain.OfertaFormacaoFindOneInput, selection?: string[]) {
    const ofertaFormacao = await this.ofertaFormacaoFindById(accessContext, dto, selection);

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
    QbEfficientLoad(LadesaTypings.Tokens.OfertaFormacaoView, qb, aliasOfertaFormacao, selection);

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

  async ofertaFormacaoCreate(accessContext: AccessContext, dto: IDomain.OfertaFormacaoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:create", { dto });

    // =========================================================

    const dtoOfertaFormacao = pick(dto.body, ["nome", "slug"]);

    const ofertaFormacao = this.ofertaFormacaoRepository.create();

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    // =========================================================

    if (dto.body.modalidade) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.body.modalidade.id);

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

  async ofertaFormacaoUpdate(accessContext: AccessContext, dto: IDomain.OfertaFormacaoUpdateByIdInput) {
    // =========================================================

    const currentOfertaFormacao = await this.ofertaFormacaoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });

    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:update", { dto }, dto.parameters.path.id, this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao));

    const dtoOfertaFormacao = pick(dto.body, ["nome", "slug"]);

    const ofertaFormacao = <OfertaFormacaoEntity>{
      id: currentOfertaFormacao.id,
    };

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    // =========================================================

    if (has(dto.body, "modalidade") && dto.body.modalidade !== undefined) {
      const modalidade = dto.body.modalidade && (await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.body.modalidade.id));

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

  async ofertaFormacaoDeleteOneById(accessContext: AccessContext, dto: IDomain.OfertaFormacaoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:delete", { dto }, dto.id, this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao));

    // =========================================================

    const ofertaFormacao = await this.ofertaFormacaoFindByIdStrict(accessContext, dto);

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
