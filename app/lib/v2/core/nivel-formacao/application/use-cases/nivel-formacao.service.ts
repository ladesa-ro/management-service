import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { NivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "@/v2/adapters/in/http/nivel-formacao/dto";

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

  async nivelFormacaoFindAll(accessContext: AccessContext, dto: NivelFormacaoListInputDto | null = null, selection?: string[]): Promise<NivelFormacaoListOutputDto> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
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
    QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as unknown as NivelFormacaoListOutputDto;
  }

  async nivelFormacaoFindById(accessContext: AccessContext | null, dto: NivelFormacaoFindOneInputDto, selection?: string[]): Promise<NivelFormacaoFindOneOutputDto | null> {
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
    QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    // =========================================================

    const nivelFormacao = await qb.getOne();

    // =========================================================

    return nivelFormacao as NivelFormacaoFindOneOutputDto | null;
  }

  async nivelFormacaoFindByIdStrict(accessContext: AccessContext, dto: NivelFormacaoFindOneInputDto, selection?: string[]): Promise<NivelFormacaoFindOneOutputDto> {
    const nivelFormacao = await this.nivelFormacaoFindById(accessContext, dto, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  async nivelFormacaoFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<NivelFormacaoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao);

    // =========================================================

    await accessContext.applyFilter("nivel_formacao:find", qb, aliasNivelFormacao, null);

    // =========================================================

    qb.andWhere(`${aliasNivelFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("NivelFormacaoFindOneOutput", qb, aliasNivelFormacao, selection);

    // =========================================================

    const nivelFormacao = await qb.getOne();

    // =========================================================

    return nivelFormacao as NivelFormacaoFindOneOutputDto | null;
  }

  async nivelFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<NivelFormacaoFindOneOutputDto> {
    const nivelFormacao = await this.nivelFormacaoFindByIdSimple(accessContext, id, selection);

    if (!nivelFormacao) {
      throw new NotFoundException();
    }

    return nivelFormacao;
  }

  async nivelFormacaoCreate(accessContext: AccessContext, dto: NivelFormacaoCreateInputDto): Promise<NivelFormacaoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:create", { dto } as any);

    // =========================================================

    const dtoNivelFormacao = pick(dto, ["slug"]);

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

  async nivelFormacaoUpdate(accessContext: AccessContext, dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto): Promise<NivelFormacaoFindOneOutputDto> {
    // =========================================================

    const currentNivelFormacao = await this.nivelFormacaoFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:update", { dto }, dto.id, this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao as any));

    const dtoNivelFormacao = pick(dto, ["slug"]);

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

  async nivelFormacaoDeleteOneById(accessContext: AccessContext, dto: NivelFormacaoFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("nivel_formacao:delete", { dto }, dto.id, this.nivelFormacaoRepository.createQueryBuilder(aliasNivelFormacao as any));

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
