import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { NivelFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";

// ============================================================================

const aliasNivelFormacao = "nivel_formacao";

// ============================================================================

@Injectable()
export class NivelFormacaoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get nivelFormacaoRepository() {
    return this.databaseContext.nivelFormacaoRepository;
  }

  //

  async nivelFormacaoFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.NivelFormacaoListOperationInput | null = null,
    selection?: string[],
  ): Promise<LadesaTypings.NivelFormacaoListOperationOutput["success"]> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "slug",
        //
        "dateCreated",
        //
      ],
      sortableColumns: [
        //
        "slug",
        "dateCreated",
      ],
      searchableColumns: [
        //
        "id",
        //
        "slug",
        //
      ],
      defaultSortBy: [
        ["slug", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.NivelFormacaoView, qb, aliasNivelFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async nivelFormacaoFindById(
    accessContext: AccessContext | null,
    dto: LadesaTypings.NivelFormacaoFindOneInputView,
    selection?: string[],
  ): Promise<LadesaTypings.NivelFormacaoFindOneResultView | null> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);
    }

    // =========================================================

    qb.andWhere(`${aliasNivelFormacao}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.NivelFormacaoView, qb, aliasNivelFormacao, selection);

    // =========================================================

    const nivelFormacao = await qb.getOne();

    // =========================================================

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.NivelFormacaoFindOneInputView, selection?: string[]) {
    const nivelFormacao = await this.nivelFormacaoFindById(accessContext, dto, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.NivelFormacaoFindOneInputView["id"],
    selection?: string[],
  ): Promise<LadesaTypings.NivelFormacaoFindOneResultView | null> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);

    // =========================================================

    qb.andWhere(`${aliasNivelFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.NivelFormacaoView, qb, aliasNivelFormacao, selection);

    // =========================================================

    const nivelFormacao = await qb.getOne();

    // =========================================================

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.NivelFormacaoFindOneInputView["id"], selection?: string[]) {
    const nivelFormacao = await this.nivelFormacaoFindByIdSimple(accessContext, id, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  //

  async nivelFormacaoCreate(accessContext: AccessContext, dto: LadesaTypings.NivelFormacaoCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:create", { dto });

    // =========================================================

    const dtoNivelFormacao = pick(dto.body, ["slug"]);

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

  async nivelFormacaoUpdate(accessContext: AccessContext, dto: LadesaTypings.NivelFormacaoUpdateByIdOperationInput) {
    // =========================================================

    const currentNivelFormacao = await this.nivelFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:update", { dto }, dto.params.id, this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao));

    const dtoNivelFormacao = pick(dto.body, ["slug"]);

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

  //

  async nivelFormacaoDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.NivelFormacaoFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:delete", { dto }, dto.id, this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao));

    // =========================================================

    const nivelFormacao = await this.nivelFormacaoFindByIdStrict(accessContext, dto);

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
