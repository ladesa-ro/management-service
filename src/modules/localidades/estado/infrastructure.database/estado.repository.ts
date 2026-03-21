import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/conn.interface";
import {
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
import { EstadoEntity } from "./typeorm/estado.typeorm.entity";

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
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.appTypeormConnection.getRepository(EstadoEntity).extend({});
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
