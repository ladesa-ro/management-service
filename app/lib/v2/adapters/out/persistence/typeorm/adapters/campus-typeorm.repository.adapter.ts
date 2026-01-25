import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { map } from "lodash";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad } from "@/shared";
import type { IPaginationConfig, IPaginationCriteria } from "@/v2/application/ports/pagination";
import type { ICampusRepositoryPort } from "@/v2/core/campus/application/ports";
import type {
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
} from "@/v2/adapters/in/http/campus/dto";
import type { CampusEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";

const aliasCampus = "campus";

/**
 * Tipo helper para DTOs que contêm filtros dinâmicos
 */
type DtoWithFilters = Record<string, unknown>;

/**
 * Adapter TypeORM que implementa o port de repositório de Campus
 * Encapsula toda a lógica de acesso a dados usando TypeORM e nestjs-paginate
 */
@Injectable()
export class CampusTypeOrmRepositoryAdapter implements ICampusRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get campusRepository() {
    return this.databaseContext.campusRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: CampusListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutputDto> {
    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);

    const config = {
      ...paginateConfig,
      select: [
        "id",
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        "endereco.cidade.id",
        "endereco.cidade.nome",
        "endereco.cidade.estado.id",
        "endereco.cidade.estado.nome",
        "endereco.cidade.estado.sigla",
      ],
      relations: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
      sortableColumns: [
        "id",
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        "endereco.cidade.id",
        "endereco.cidade.nome",
        "endereco.cidade.estado.id",
        "endereco.cidade.estado.nome",
        "endereco.cidade.estado.sigla",
      ],
      searchableColumns: [
        "id",
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        "endereco.cidade.nome",
        "endereco.cidade.estado.nome",
        "endereco.cidade.estado.sigla",
      ],
      defaultSortBy: [
        ["nomeFantasia", "ASC"],
        ["endereco.cidade.estado.nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "endereco.cidade.id": [FilterOperator.EQ],
        "endereco.cidade.nome": [FilterOperator.EQ],
        "endereco.cidade.estado.id": [FilterOperator.EQ],
        "endereco.cidade.estado.nome": [FilterOperator.EQ],
        "endereco.cidade.estado.sigla": [FilterOperator.EQ],
      },
    } as IPaginationConfig<CampusEntity>;

    const criteria: IPaginationCriteria = {
      ...dto,
      sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      filters: this.extractFilters(dto),
    };

    const paginated = await this.paginationAdapter.paginate(qb, criteria, config);

    qb.select([]);
    QbEfficientLoad("CampusFindOneOutput", qb, aliasCampus, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as CampusListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null> {
    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);
    qb.andWhere(`${aliasCampus}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("CampusFindOneOutput", qb, aliasCampus, selection);

    const campus = await qb.getOne();

    return campus as CampusFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null> {
    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);
    qb.andWhere(`${aliasCampus}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("CampusFindOneOutput", qb, aliasCampus, selection);

    const campus = await qb.getOne();

    return campus as CampusFindOneOutputDto | null;
  }

  async save(campus: DeepPartial<CampusEntity>): Promise<CampusEntity> {
    return this.campusRepository.save(campus);
  }

  create(): CampusEntity {
    return this.campusRepository.create();
  }

  merge(campus: CampusEntity, data: DeepPartial<CampusEntity>): void {
    this.campusRepository.merge(campus, data);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.campusRepository
      .createQueryBuilder(aliasCampus)
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
