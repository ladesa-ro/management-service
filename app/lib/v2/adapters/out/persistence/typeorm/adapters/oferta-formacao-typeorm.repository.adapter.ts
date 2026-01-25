import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
} from "@/v2/adapters/in/http/oferta-formacao/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { OfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IOfertaFormacaoRepositoryPort } from "@/v2/core/oferta-formacao/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasOfertaFormacao = "oferta_formacao";
type DtoWithFilters = Record<string, unknown>;

@Injectable()
export class OfertaFormacaoTypeOrmRepositoryAdapter implements IOfertaFormacaoRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get ofertaFormacaoRepository() {
    return this.databaseContext.ofertaFormacaoRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<OfertaFormacaoListOutputDto> {
    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);

    const config = {
      ...paginateConfig,
      select: ["id", "nome", "slug", "dateCreated"],
      relations: {
        modalidade: true,
      },
      sortableColumns: ["nome", "slug", "dateCreated"],
      searchableColumns: ["id", "nome", "slug"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "modalidade.id": [FilterOperator.EQ],
      },
    } as IPaginationConfig<OfertaFormacaoEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as OfertaFormacaoListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    if (accessContext) {
      await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);
    }

    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id: dto.id });
    qb.select([]);
    QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    return (await qb.getOne()) as OfertaFormacaoFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    const qb = this.ofertaFormacaoRepository.createQueryBuilder(aliasOfertaFormacao);

    await accessContext.applyFilter("oferta_formacao:find", qb, aliasOfertaFormacao, null);
    qb.andWhere(`${aliasOfertaFormacao}.id = :id`, { id });
    qb.select([]);
    QbEfficientLoad("OfertaFormacaoFindOneOutput", qb, aliasOfertaFormacao, selection);

    return (await qb.getOne()) as OfertaFormacaoFindOneOutputDto | null;
  }

  async save(ofertaFormacao: DeepPartial<OfertaFormacaoEntity>): Promise<OfertaFormacaoEntity> {
    return this.ofertaFormacaoRepository.save(ofertaFormacao);
  }

  create(): OfertaFormacaoEntity {
    return this.ofertaFormacaoRepository.create();
  }

  merge(ofertaFormacao: OfertaFormacaoEntity, data: DeepPartial<OfertaFormacaoEntity>): void {
    this.ofertaFormacaoRepository.merge(ofertaFormacao, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.ofertaFormacaoRepository
      .createQueryBuilder(aliasOfertaFormacao)
      .update()
      .set({ dateDeleted: "NOW()" })
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  private extractFilters(
    dto: DtoWithFilters | null | undefined,
  ): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};
    if (!dto) return filters;
    for (const [key, value] of Object.entries(dto)) {
      if (
        key.startsWith("filter.") &&
        (typeof value === "string" ||
          (Array.isArray(value) && value.every((v) => typeof v === "string")))
      ) {
        filters[key.replace("filter.", "")] = value;
      }
    }
    return filters;
  }
}
