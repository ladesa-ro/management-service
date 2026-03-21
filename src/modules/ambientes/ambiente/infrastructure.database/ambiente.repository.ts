import { FilterOperator } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { ITypeOrmPaginationConfig } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  IAppTypeormConnection,
  NestJsPaginateAdapter,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  AmbienteFindOneQuery as AmbienteFindOneQuery,
  AmbienteFindOneQueryResult as AmbienteFindOneQueryResult,
  AmbienteListQuery as AmbienteListQuery,
  AmbienteListQueryResult as AmbienteListQueryResult,
} from "@/modules/ambientes/ambiente";
import type { IAmbienteRepository } from "@/modules/ambientes/ambiente/domain/repositories";
import type { AmbienteEntity } from "./typeorm/ambiente.typeorm.entity";
import { createAmbienteRepository } from "./typeorm/ambiente.typeorm.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de Ambiente.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */

@DeclareImplementation()
export class AmbienteTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    AmbienteEntity,
    AmbienteListQuery,
    AmbienteListQueryResult,
    AmbienteFindOneQuery,
    AmbienteFindOneQueryResult
  >
  implements IAmbienteRepository
{
  protected readonly alias = "ambiente";
  protected readonly outputDtoName = "AmbienteFindOneQueryResult";

  constructor(
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createAmbienteRepository(this.appTypeormConnection);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<AmbienteEntity> {
    return {
      select: [
        "id",
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
        "dateCreated",
        "bloco.id",
        "bloco.campus.id",
      ],
      relations: {
        bloco: {
          campus: true,
        },
      },
      sortableColumns: [
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
        "dateCreated",
        "bloco.id",
        "bloco.campus.id",
      ],
      searchableColumns: ["id", "nome", "descricao", "codigo", "capacidade", "tipo"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "bloco.id": [FilterOperator.EQ],
        "bloco.campus.id": [FilterOperator.EQ],
      },
    };
  }
}
