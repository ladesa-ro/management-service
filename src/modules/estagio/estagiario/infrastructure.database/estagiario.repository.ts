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
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioListQueryResult,
} from "@/modules/estagio/estagiario/domain/queries";
import type { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagiarioTypeormEntity, estagiarioEntityDomainMapper } from "./typeorm";

const config = {
  alias: "estagiario",
  hasSoftDelete: true,
} as const;

const estagiarioPaginateConfig: ITypeOrmPaginationConfig<EstagiarioTypeormEntity> = {
  ...paginateConfig,
  relations: {
    perfil: {
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
      usuario: true,
    },
    curso: {
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
    },
    turma: {
      curso: true,
    },
  },
  sortableColumns: ["telefone", "dataNascimento", "dateCreated"],
  searchableColumns: ["telefone", "emailInstitucional"],
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    "perfil.id": [FilterOperator.EQ],
    "curso.id": [FilterOperator.EQ],
    "turma.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class EstagiarioTypeOrmRepositoryAdapter implements IEstagiarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: unknown, dto: EstagiarioListQuery | null = null) {
    return typeormFindAll<EstagiarioTypeormEntity, EstagiarioListQuery, EstagiarioListQueryResult>(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      { ...config, paginateConfig: estagiarioPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: unknown, dto: EstagiarioFindOneQuery) {
    return typeormFindById<
      EstagiarioTypeormEntity,
      EstagiarioFindOneQuery,
      EstagiarioFindOneQueryResult
    >(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      { ...config, paginateConfig: estagiarioPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: unknown, id: string) {
    return this.findById(accessContext, { id } as EstagiarioFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = estagiarioEntityDomainMapper.toPersistenceData(data) as Record<
      string,
      unknown
    >;
    return typeormCreate(this.appTypeormConnection, EstagiarioTypeormEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = estagiarioEntityDomainMapper.toPersistenceData(data) as Record<
      string,
      unknown
    >;
    return typeormUpdate(this.appTypeormConnection, EstagiarioTypeormEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      config.alias,
      id,
    );
  }
}
