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
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
  EstadoListQueryResult,
} from "@/modules/localidades/estado/domain/queries";
import type { IEstadoRepository } from "@/modules/localidades/estado/domain/repositories";
import type { EstadoEntity } from "./estado.entity";
import { createEstadoRepository } from "./estado.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de Estado.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 * Estado é um recurso somente leitura (dados do IBGE).
 */
@DeclareImplementation()
export class EstadoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EstadoEntity,
    EstadoListQuery,
    EstadoListQueryResult,
    EstadoFindOneQuery,
    EstadoFindOneQueryResult
  >
  implements IEstadoRepository
{
  protected readonly alias = "estado";
  protected readonly hasSoftDelete = false;
  protected readonly outputDtoName = "EstadoFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createEstadoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<EstadoEntity> {
    return {
      ...paginateConfig,
      select: ["id"],
      searchableColumns: ["nome", "sigla"],
      sortableColumns: ["id", "nome", "sigla"],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {},
    };
  }
}
