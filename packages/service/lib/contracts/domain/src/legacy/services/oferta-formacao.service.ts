import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import {
  LadesaPaginatedResultDto,
  LadesaSearch,
} from "@/application/standards/ladesa-spec/search/search-strategies";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { AccessContext } from "@ladesa-ro/management-management-service.infrastructure/access-context";
import { paginateConfig } from "@ladesa-ro/management-management-service.infrastructure/fixtures";
import { DatabaseContextService } from "@ladesa-ro/management-management-service.infrastructure/integrations/database";
import type { OfertaFormacaoEntity } from "@ladesa-ro/management-management-service.infrastructure/integrations/database/typeorm/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { ModalidadeService } from "./modalidade.service";

// ============================================================================

const aliasOfertaFormacao = "oferta_formacao";

// ============================================================================

@Injectable()
export class OfertaFormacaoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private modalidadeService: ModalidadeService
  ) { }

  get ofertaFormacaoRepository() {
    return this.databaseContext.ofertaFormacaoRepository;
  }

  //

  async ofertaFormacaoFindAll(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoListInput | null = null,
    selection?: string[]
  ): Promise<IDomainContracts.OfertaFormacaoListOperationOutput["success"]> {
    // =========================================================

    const qb =
      this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter(
      "oferta_formacao:find",
      qb,
      aliasOfertaFormacao,
      null
    );

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "slug",
        //
        "dateCreated",
        //
      ],
      relations: {
        modalidade: true,
      },
      sortableColumns: [
        //
        "nome",
        "slug",
        "dateCreated",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "slug",
        //
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "modalidade.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.OfertaFormacaoView,
      qb,
      aliasOfertaFormacao,
      selection
    );

    // =========================================================

    const pageItemsView = await qb
      .andWhereInIds(map(paginated.data, "id"))
      .getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!
    );

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async ofertaFormacaoFindById(
    accessContext: AccessContext | null,
    dto: IDomainContracts.OfertaFormacaoFindOneInput,
    selection?: string[]
  ): Promise<IDomainContracts.OfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb =
      this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter(
        "oferta_formacao:find",
        qb,
        aliasOfertaFormacao,
        null
      );
    }

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.OfertaFormacaoView,
      qb,
      aliasOfertaFormacao,
      selection
    );

    // =========================================================

    const ofertaFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoFindOneInput,
    selection?: string[]
  ) {
    const ofertaFormacao = await this.ofertaFormacaoFindById(
      accessContext,
      dto,
      selection
    );

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomainContracts.OfertaFormacaoFindOneInput["id"],
    selection?: string[]
  ): Promise<IDomainContracts.OfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb =
      this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter(
      "oferta_formacao:find",
      qb,
      aliasOfertaFormacao,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.OfertaFormacaoView,
      qb,
      aliasOfertaFormacao,
      selection
    );

    // =========================================================

    const ofertaFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: IDomainContracts.OfertaFormacaoFindOneInput["id"],
    selection?: string[]
  ) {
    const ofertaFormacao = await this.ofertaFormacaoFindByIdSimple(
      accessContext,
      id,
      selection
    );

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  //

  async ofertaFormacaoCreate(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoCreateInput
  ) {
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
      const modalidade =
        await this.modalidadeService.modalidadeFindByIdSimpleStrict(
          accessContext,
          dto.body.modalidade.id
        );

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

  async ofertaFormacaoUpdate(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoUpdateInput
  ) {
    // =========================================================

    const currentOfertaFormacao = await this.ofertaFormacaoFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      }
    );

    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao:update",
      { dto },
      dto.params.id,
      this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao)
    );

    const dtoOfertaFormacao = pick(dto.body, ["nome", "slug"]);

    const ofertaFormacao = <OfertaFormacaoEntity>{
      id: currentOfertaFormacao.id,
    };

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    // =========================================================

    if (has(dto.body, "modalidade") && dto.body.modalidade !== undefined) {
      const modalidade =
        dto.body.modalidade &&
        (await this.modalidadeService.modalidadeFindByIdSimpleStrict(
          accessContext,
          dto.body.modalidade.id
        ));

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

  //

  async ofertaFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoFindOneInput
  ) {
    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao:delete",
      { dto },
      dto.id,
      this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao)
    );

    // =========================================================

    const ofertaFormacao = await this.ofertaFormacaoFindByIdStrict(
      accessContext,
      dto
    );

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
