import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
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
import { estagiarioPaginationSpec } from "@/modules/estagio/estagiario/domain/queries";
import type { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagiarioTypeormEntity, estagiarioEntityDomainMapper } from "./typeorm";

const config = {
  alias: "estagiario",
} as const;

const estagiarioRelations = {
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
};

const estagiarioPaginateConfig = buildTypeOrmPaginateConfig<EstagiarioTypeormEntity>(
  estagiarioPaginationSpec,
  estagiarioRelations,
);

@DeclareImplementation()
export class EstagiarioTypeOrmRepositoryAdapter implements IEstagiarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: EstagiarioListQuery | null = null) {
    return typeormFindAll<EstagiarioTypeormEntity, EstagiarioListQuery, EstagiarioListQueryResult>(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      { ...config, paginateConfig: estagiarioPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: EstagiarioFindOneQuery) {
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

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
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
