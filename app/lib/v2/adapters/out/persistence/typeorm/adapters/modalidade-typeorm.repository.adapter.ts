import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { IModalidadeRepositoryPort } from "@/v2/core/modalidade/application/ports";
import type {
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
} from "@/v2/adapters/in/http/modalidade/dto";
import type { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasModalidade = "modalidade";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de Modalidade
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class ModalidadeTypeOrmRepositoryAdapter implements IModalidadeRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get modalidadeRepository() {
    return this.databaseContext.modalidadeRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<ModalidadeListOutputDto> {
    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);

    const config: IPaginationConfig<ModalidadeFindOneOutputDto> = {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "slug",
        "dateCreated",
      ],
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
      filterableColumns: {},
    };

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as ModalidadeListOutputDto;
  }

  async findById(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null> {
    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    if (accessContext) {
      await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);
    }

    qb.andWhere(`${aliasModalidade}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    const modalidade = await qb.getOne();

    return modalidade as ModalidadeFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null> {
    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);
    qb.andWhere(`${aliasModalidade}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    const modalidade = await qb.getOne();

    return modalidade as ModalidadeFindOneOutputDto | null;
  }

  async save(modalidade: DeepPartial<ModalidadeEntity>): Promise<ModalidadeEntity> {
    return this.modalidadeRepository.save(modalidade);
  }

  create(): ModalidadeEntity {
    return this.modalidadeRepository.create();
  }

  merge(modalidade: ModalidadeEntity, data: DeepPartial<ModalidadeEntity>): void {
    this.modalidadeRepository.merge(modalidade, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.modalidadeRepository
      .createQueryBuilder(aliasModalidade)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :id", { id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }

  /**
   * Extrai filtros do formato do DTO para o formato de IPaginationCriteria
   */
  private extractFilters(dto: DtoWithFilters | null | undefined): Record<string, string | string[]> {
    const filters: Record<string, string | string[]> = {};

    if (!dto) return filters;

    for (const [key, value] of Object.entries(dto)) {
      if (key.startsWith("filter.")) {
        if (typeof value === "string" || (Array.isArray(value) && value.every(v => typeof v === "string"))) {
          const filterKey = key.replace("filter.", "");
          filters[filterKey] = value;
        }
      }
    }

    return filters;
  }
}
