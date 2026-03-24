import { FilterOperator } from "nestjs-paginate";
import type { IAccessContext } from "@/domain/abstractions";
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
  DiarioFindOneQuery,
  DiarioFindOneQueryResult,
  DiarioListQuery,
  DiarioListQueryResult,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioRepository } from "@/modules/ensino/diario/domain/repositories";
import { DiarioEntity, diarioEntityDomainMapper } from "./typeorm";

const config = {
  alias: "diario",
  hasSoftDelete: true,
} as const;

const diarioPaginateConfig: ITypeOrmPaginationConfig<DiarioEntity> = {
  ...paginateConfig,
  sortableColumns: ["ativo", "disciplina.nome", "ambientePadrao.nome"],
  relations: {
    turma: {
      curso: {
        campus: {
          endereco: {
            cidade: {
              estado: true,
            },
          },
        },
      },
    },
    disciplina: true,
    ambientePadrao: {
      bloco: {
        campus: {
          endereco: {
            cidade: {
              estado: true,
            },
          },
        },
      },
    },
  },
  searchableColumns: ["id", "ativo", "ano", "etapa", "turma.periodo", "disciplina.nome"],
  defaultSortBy: [],
  filterableColumns: {
    "turma.id": [FilterOperator.EQ],
    "disciplina.id": [FilterOperator.EQ],
    "ambientePadrao.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class DiarioTypeOrmRepositoryAdapter implements IDiarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: DiarioListQuery | null = null) {
    return typeormFindAll<DiarioEntity, DiarioListQuery, DiarioListQueryResult>(
      this.appTypeormConnection,
      DiarioEntity,
      { ...config, paginateConfig: diarioPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: DiarioFindOneQuery) {
    return typeormFindById<DiarioEntity, DiarioFindOneQuery, DiarioFindOneQueryResult>(
      this.appTypeormConnection,
      DiarioEntity,
      { ...config, paginateConfig: diarioPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as DiarioFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = diarioEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, DiarioEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = diarioEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, DiarioEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, DiarioEntity, config.alias, id);
  }
}
