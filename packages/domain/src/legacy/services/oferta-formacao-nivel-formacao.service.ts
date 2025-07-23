import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import {
  LadesaPaginatedResultDto,
  LadesaSearch,
} from "@/application/standards/ladesa-spec/search/search-strategies";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { AccessContext } from "@ladesa-ro/management-management-service.infrastructure/access-context";
import { paginateConfig } from "@ladesa-ro/management-management-service.infrastructure/fixtures";
import { DatabaseContextService } from "@ladesa-ro/management-management-service.infrastructure/integrations/database";
import type { OfertaFormacaoNivelFormacaoEntity } from "@ladesa-ro/management-management-service.infrastructure/integrations/database/typeorm/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { NivelFormacaoService } from "./nivel-formacao.service";
import { OfertaFormacaoService } from "./oferta-formacao.service";

// ============================================================================

const aliasOfertaFormacaoNivelFormacao = "oferta_formacao_nivel_formacao";

// ============================================================================

@Injectable()
export class OfertaFormacaoNivelFormacaoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private ofertaFormacaoService: OfertaFormacaoService,
    private nivelFormacaoService: NivelFormacaoService
  ) { }

  get ofertaFormacaoNivelFormacaoRepository() {
    return this.databaseContext.ofertaFormacaoNivelFormacaoRepository;
  }

  //

  async ofertaFormacaoNivelFormacaoFindAll(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoListInput | null = null,
    selection?: string[]
  ): Promise<
    IDomainContracts.OfertaFormacaoNivelFormacaoListOperationOutput["success"]
  > {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
      aliasOfertaFormacaoNivelFormacao
    );

    // =========================================================

    await accessContext.applyFilter(
      "oferta_formacao_nivel_formacao:find",
      qb,
      aliasOfertaFormacaoNivelFormacao,
      null
    );

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "dateCreated",
        //
      ],
      relations: {
        nivelFormacao: true,
        ofertaFormacao: {
          modalidade: true,
        },
      },
      sortableColumns: [
        //

        "dateCreated",
      ],
      searchableColumns: [
        //
        "id",

        //
      ],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "nivelFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.OfertaFormacaoNivelFormacaoView,
      qb,
      aliasOfertaFormacaoNivelFormacao,
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

  async ofertaFormacaoNivelFormacaoFindById(
    accessContext: AccessContext | null,
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneInput,
    selection?: string[]
  ): Promise<IDomainContracts.OfertaFormacaoNivelFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
      aliasOfertaFormacaoNivelFormacao
    );

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter(
        "oferta_formacao_nivel_formacao:find",
        qb,
        aliasOfertaFormacaoNivelFormacao,
        null
      );
    }

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacaoNivelFormacao}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.OfertaFormacaoNivelFormacaoView,
      qb,
      aliasOfertaFormacaoNivelFormacao,
      selection
    );

    // =========================================================

    const ofertaFormacaoNivelFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneInput,
    selection?: string[]
  ) {
    const ofertaFormacaoNivelFormacao =
      await this.ofertaFormacaoNivelFormacaoFindById(
        accessContext,
        dto,
        selection
      );

    if (!ofertaFormacaoNivelFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneInput["id"],
    selection?: string[]
  ): Promise<IDomainContracts.OfertaFormacaoNivelFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
      aliasOfertaFormacaoNivelFormacao
    );

    // =========================================================

    await accessContext.applyFilter(
      "oferta_formacao_nivel_formacao:find",
      qb,
      aliasOfertaFormacaoNivelFormacao,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacaoNivelFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.OfertaFormacaoNivelFormacaoView,
      qb,
      aliasOfertaFormacaoNivelFormacao,
      selection
    );

    // =========================================================

    const ofertaFormacaoNivelFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneInput["id"],
    selection?: string[]
  ) {
    const ofertaFormacaoNivelFormacao =
      await this.ofertaFormacaoNivelFormacaoFindByIdSimple(
        accessContext,
        id,
        selection
      );

    if (!ofertaFormacaoNivelFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacaoNivelFormacao;
  }

  //

  async ofertaFormacaoNivelFormacaoCreate(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoCreateInput
  ) {
    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:create",
      { dto }
    );

    // =========================================================

    const dtoOfertaFormacaoNivelFormacao = pick(dto.body, []);

    const ofertaFormacaoNivelFormacao =
      this.ofertaFormacaoNivelFormacaoRepository.create();

    this.ofertaFormacaoNivelFormacaoRepository.merge(
      ofertaFormacaoNivelFormacao,
      {
        ...dtoOfertaFormacaoNivelFormacao,
      }
    );

    // =========================================================

    if (dto.body.ofertaFormacao) {
      const ofertaFormacao =
        await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.body.ofertaFormacao.id
        );

      this.ofertaFormacaoNivelFormacaoRepository.merge(
        ofertaFormacaoNivelFormacao,
        {
          ofertaFormacao: {
            id: ofertaFormacao.id,
          },
        }
      );
    }

    // =========================================================

    if (dto.body.nivelFormcao) {
      const nivelFormacao =
        await this.nivelFormacaoService.nivelFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.body.nivelFormcao.id
        );

      this.ofertaFormacaoNivelFormacaoRepository.merge(
        ofertaFormacaoNivelFormacao,
        {
          nivelFormacao: {
            id: nivelFormacao.id,
          },
        }
      );
    }

    // =========================================================

    await this.ofertaFormacaoNivelFormacaoRepository.save(
      ofertaFormacaoNivelFormacao
    );

    // =========================================================

    return this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
      id: ofertaFormacaoNivelFormacao.id,
    });
  }

  async ofertaFormacaoNivelFormacaoUpdate(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoUpdateInput
  ) {
    // =========================================================

    const currentOfertaFormacaoNivelFormacao =
      await this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
        id: dto.params.id,
      });

    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:update",
      { dto },
      dto.params.id,
      this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
        aliasOfertaFormacaoNivelFormacao
      )
    );

    const dtoOfertaFormacaoNivelFormacao = pick(dto.body, []);

    const ofertaFormacaoNivelFormacao = <OfertaFormacaoNivelFormacaoEntity>{
      id: currentOfertaFormacaoNivelFormacao.id,
    };

    this.ofertaFormacaoNivelFormacaoRepository.merge(
      ofertaFormacaoNivelFormacao,
      {
        ...dtoOfertaFormacaoNivelFormacao,
      }
    );

    // =========================================================

    if (
      has(dto.body, "ofertaFormacao") &&
      dto.body.ofertaFormacao !== undefined
    ) {
      const ofertaFormacao =
        dto.body.ofertaFormacao &&
        (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.body.ofertaFormacao.id
        ));

      this.ofertaFormacaoNivelFormacaoRepository.merge(
        ofertaFormacaoNivelFormacao,
        {
          ofertaFormacao: ofertaFormacao && {
            id: ofertaFormacao.id,
          },
        }
      );
    }

    if (
      has(dto.body, "nivelFormacao") &&
      dto.body.nivelFormacao !== undefined
    ) {
      const nivelFormacao =
        dto.body.nivelFormacao &&
        (await this.nivelFormacaoService.nivelFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.body.nivelFormacao.id
        ));

      this.ofertaFormacaoNivelFormacaoRepository.merge(
        ofertaFormacaoNivelFormacao,
        {
          nivelFormacao: nivelFormacao && {
            id: nivelFormacao.id,
          },
        }
      );
    }

    // =========================================================

    await this.ofertaFormacaoNivelFormacaoRepository.save(
      ofertaFormacaoNivelFormacao
    );

    // =========================================================

    return this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, {
      id: ofertaFormacaoNivelFormacao.id,
    });
  }

  //

  async ofertaFormacaoNivelFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: IDomainContracts.OfertaFormacaoNivelFormacaoFindOneInput
  ) {
    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:delete",
      { dto },
      dto.id,
      this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
        aliasOfertaFormacaoNivelFormacao
      )
    );

    // =========================================================

    const ofertaFormacaoNivelFormacao =
      await this.ofertaFormacaoNivelFormacaoFindByIdStrict(accessContext, dto);

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
