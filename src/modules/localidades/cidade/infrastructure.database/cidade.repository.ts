import { FilterOperator } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  CidadeFindOneQuery,
  CidadeFindOneQueryResult,
  CidadeListQuery,
  CidadeListQueryResult,
  ICidadeRepository,
} from "@/modules/localidades/cidade";
import { CidadeEntity } from "./typeorm/cidade.typeorm.entity";

const config = {
  alias: "cidade",
  outputDtoName: "CidadeFindOneQueryResult",
  hasSoftDelete: false,
} as const;

const cidadePaginateConfig: ITypeOrmPaginationConfig<CidadeEntity> = {
  ...paginateConfig,
  select: ["id", "nome", "estado.id", "estado.sigla", "estado.nome"],
  relations: {
    estado: true,
  },
  sortableColumns: ["id", "nome", "estado.nome", "estado.sigla"],
  searchableColumns: ["nome", "estado.nome", "estado.sigla"],
  defaultSortBy: [
    ["nome", "ASC"],
    ["estado.nome", "ASC"],
  ],
  filterableColumns: {
    "estado.id": [FilterOperator.EQ],
    "estado.nome": [FilterOperator.EQ],
    "estado.sigla": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class CidadeTypeOrmRepositoryAdapter implements ICidadeRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: unknown,
    dto: CidadeListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<CidadeEntity, CidadeListQuery, CidadeListQueryResult>(
      this.appTypeormConnection,
      CidadeEntity,
      { ...config, paginateConfig: cidadePaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(accessContext: unknown, dto: CidadeFindOneQuery, selection?: string[] | boolean | null) {
    return typeormFindById<CidadeEntity, CidadeFindOneQuery, CidadeFindOneQueryResult>(
      this.appTypeormConnection,
      CidadeEntity,
      config,
      dto,
      selection,
    );
  }

  findByIdSimple(accessContext: unknown, id: string, selection?: string[] | boolean | null) {
    return this.findById(accessContext, { id: Number(id) } as CidadeFindOneQuery, selection);
  }
}
