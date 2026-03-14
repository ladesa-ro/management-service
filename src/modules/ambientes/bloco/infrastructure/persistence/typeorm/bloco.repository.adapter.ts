import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  BlocoFindOneQuery,
  BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoListQueryResult,
} from "@/modules/ambientes/bloco";
import type { IBlocoRepository } from "@/modules/ambientes/bloco/domain/repositories";
import type { BlocoEntity } from "./bloco.entity";
import { createBlocoRepository } from "./bloco.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de Bloco.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */

@DeclareImplementation()
export class BlocoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    BlocoEntity,
    BlocoListQuery,
    BlocoListQueryResult,
    BlocoFindOneQuery,
    BlocoFindOneQueryResult
  >
  implements IBlocoRepository
{
  protected readonly alias = "bloco";
  protected readonly outputDtoName = "BlocoFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createBlocoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<BlocoEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "codigo",
        "dateCreated",
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      relations: {
        campus: true,
      },
      sortableColumns: [
        "nome",
        "codigo",
        "dateCreated",
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      searchableColumns: ["id", "nome", "codigo"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
      },
    };
  }
}
