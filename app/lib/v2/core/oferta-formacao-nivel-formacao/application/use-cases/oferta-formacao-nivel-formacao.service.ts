import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { QbEfficientLoad, SearchService } from "@/v2/old/shared";
import type {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "@/v2/server/modules/oferta-formacao-nivel-formacao/http/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { OfertaFormacaoNivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NivelFormacaoService } from "@/v2/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";

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
    dto: OfertaFormacaoNivelFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<OfertaFormacaoNivelFormacaoListOutputDto> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
      aliasOfertaFormacaoNivelFormacao,
    );

    // =========================================================

    await accessContext.applyFilter(
      "oferta_formacao_nivel_formacao:find",
      qb,
      aliasOfertaFormacaoNivelFormacao,
      null,
    );

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      {
        ...dto,
        sortBy: dto?.sortBy ? dto.sortBy.map((s: any) => s.toString()) : undefined,
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
    QbEfficientLoad(
      "OfertaFormacaoNivelFormacaoFindOneOutput",
      qb,
      aliasOfertaFormacaoNivelFormacao,
      selection,
    );

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!,
    );

    // =========================================================

    return paginated as unknown as OfertaFormacaoNivelFormacaoListOutputDto;
  }

  async ofertaFormacaoNivelFormacaoFindById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
      aliasOfertaFormacaoNivelFormacao,
    );

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter(
        "oferta_formacao_nivel_formacao:find",
        qb,
        aliasOfertaFormacaoNivelFormacao,
        null,
      );
    }

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacaoNivelFormacao}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      "OfertaFormacaoNivelFormacaoFindOneOutput",
      qb,
      aliasOfertaFormacaoNivelFormacao,
      selection,
    );

    // =========================================================

    const ofertaFormacaoNivelFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacaoNivelFormacao as OfertaFormacaoNivelFormacaoFindOneOutputDto | null;
  }

  async ofertaFormacaoNivelFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const ofertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindById(
      accessContext,
      dto,
      selection,
    );

    if (!ofertaFormacaoNivelFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: OfertaFormacaoNivelFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
      aliasOfertaFormacaoNivelFormacao,
    );

    // =========================================================

    await accessContext.applyFilter(
      "oferta_formacao_nivel_formacao:find",
      qb,
      aliasOfertaFormacaoNivelFormacao,
      null,
    );

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacaoNivelFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      "OfertaFormacaoNivelFormacaoFindOneOutput",
      qb,
      aliasOfertaFormacaoNivelFormacao,
      selection,
    );

    // =========================================================

    const ofertaFormacaoNivelFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacaoNivelFormacao as OfertaFormacaoNivelFormacaoFindOneOutputDto | null;
  }

  async ofertaFormacaoNivelFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: OfertaFormacaoNivelFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const ofertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!ofertaFormacaoNivelFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacaoNivelFormacao;
  }

  async ofertaFormacaoNivelFormacaoCreate(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("oferta_formacao_nivel_formacao:create", { dto } as any);

    // =========================================================

    const dtoOfertaFormacaoNivelFormacao = pick(dto, []);

    const ofertaFormacaoNivelFormacao = this.ofertaFormacaoNivelFormacaoRepository.create();

    this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
      ...dtoOfertaFormacaoNivelFormacao,
    });

    // =========================================================

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );

      this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoService.nivelFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.nivelFormacao.id,
      );

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

  async ofertaFormacaoNivelFormacaoUpdate(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    // =========================================================

    const currentOfertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindByIdStrict(
      accessContext,
      { id: dto.id },
    );

    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:update",
      { dto },
      dto.id,
      this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
        aliasOfertaFormacaoNivelFormacao,
      ),
    );

    const dtoOfertaFormacaoNivelFormacao = pick(dto, []);

    const ofertaFormacaoNivelFormacao = <OfertaFormacaoNivelFormacaoEntity>{
      id: currentOfertaFormacaoNivelFormacao.id,
    };

    this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
      ...dtoOfertaFormacaoNivelFormacao,
    });

    // =========================================================

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        ));

      this.ofertaFormacaoNivelFormacaoRepository.merge(ofertaFormacaoNivelFormacao, {
        ofertaFormacao: ofertaFormacao && {
          id: ofertaFormacao.id,
        },
      });
    }

    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoService.nivelFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.nivelFormacao.id,
        ));

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

  async ofertaFormacaoNivelFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:delete",
      { dto },
      dto.id,
      this.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
        aliasOfertaFormacaoNivelFormacao,
      ),
    );

    // =========================================================

    const ofertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoFindByIdStrict(
      accessContext,
      dto,
    );

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
