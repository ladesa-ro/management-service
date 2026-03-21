import { FilterOperator } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  CampusFindOneQuery,
  CampusFindOneQueryResult,
  CampusListQuery,
  CampusListQueryResult,
} from "@/modules/ambientes/campus/domain/queries";
import type { ICampusRepository } from "@/modules/ambientes/campus/domain/repositories";
import { CampusEntity } from "./typeorm/campus.typeorm.entity";

const config = {
  alias: "campus",
  outputDtoName: "CampusFindOneQueryResult",
} as const;

const campusPaginateConfig: ITypeOrmPaginationConfig<CampusEntity> = {
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
};

@DeclareImplementation()
export class CampusTypeOrmRepositoryAdapter implements ICampusRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: unknown,
    dto: CampusListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<CampusEntity, CampusListQuery, CampusListQueryResult>(
      this.appTypeormConnection,
      CampusEntity,
      { ...config, paginateConfig: campusPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(accessContext: unknown, dto: CampusFindOneQuery, selection?: string[] | boolean | null) {
    return typeormFindById<CampusEntity, CampusFindOneQuery, CampusFindOneQueryResult>(
      this.appTypeormConnection,
      CampusEntity,
      config,
      dto,
      selection,
    );
  }

  findByIdSimple(accessContext: unknown, id: string, selection?: string[] | boolean | null) {
    return this.findById(accessContext, { id } as CampusFindOneQuery, selection);
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, CampusEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, CampusEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CampusEntity, config.alias, id);
  }
}
