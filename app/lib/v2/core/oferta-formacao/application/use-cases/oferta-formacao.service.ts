import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { OfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "../dto";

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

  async ofertaFormacaoFindAll(accessContext: AccessContext, dto: OfertaFormacaoListInputDto | null = null, selection?: string[]): Promise<OfertaFormacaoListOutputDto> {
    // =========================================================

    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
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
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as OfertaFormacaoListOutputDto;
  }

  async ofertaFormacaoFindById(accessContext: AccessContext | null, dto: OfertaFormacaoFindOneInputDto, selection?: string[]): Promise<OfertaFormacaoFindOneOutputDto | null> {
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
    QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    // =========================================================

    const ofertaFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacao as OfertaFormacaoFindOneOutputDto | null;
  }

  async ofertaFormacaoFindByIdStrict(accessContext: AccessContext, dto: OfertaFormacaoFindOneInputDto, selection?: string[]): Promise<OfertaFormacaoFindOneOutputDto> {
    const ofertaFormacao = await this.ofertaFormacaoFindById(accessContext, dto, selection);

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdSimple(accessContext: AccessContext, id: OfertaFormacaoFindOneInputDto["id"], selection?: string[]): Promise<OfertaFormacaoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);

    // =========================================================

    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    // =========================================================

    const ofertaFormacao = await qb.getOne();

    // =========================================================

    return ofertaFormacao as OfertaFormacaoFindOneOutputDto | null;
  }

  async ofertaFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: OfertaFormacaoFindOneInputDto["id"], selection?: string[]): Promise<OfertaFormacaoFindOneOutputDto> {
    const ofertaFormacao = await this.ofertaFormacaoFindByIdSimple(accessContext, id, selection);

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  async ofertaFormacaoCreate(accessContext: AccessContext, dto: OfertaFormacaoCreateInputDto): Promise<OfertaFormacaoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:create", { dto });

    // =========================================================

    const dtoOfertaFormacao = pick(dto, ["nome", "slug"]);

    const ofertaFormacao = this.ofertaFormacaoRepository.create();

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    // =========================================================

    if (dto.modalidade) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.modalidade.id);

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

  async ofertaFormacaoUpdate(accessContext: AccessContext, dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto): Promise<OfertaFormacaoFindOneOutputDto> {
    // =========================================================

    const currentOfertaFormacao = await this.ofertaFormacaoFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("oferta_formacao:update", { dto }, dto.id, this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao));

    const dtoOfertaFormacao = pick(dto, ["nome", "slug"]);

    const ofertaFormacao = <OfertaFormacaoEntity>{
      id: currentOfertaFormacao.id,
    };

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    // =========================================================

    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      const modalidade = dto.modalidade && (await this.modalidadeService.modalidadeFindByIdSimpleStrict(accessContext, dto.modalidade.id));

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

  async ofertaFormacaoDeleteOneById(accessContext: AccessContext, dto: OfertaFormacaoFindOneInputDto): Promise<boolean> {
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
