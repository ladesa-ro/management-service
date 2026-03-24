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
import {
  type TurmaFindOneQuery,
  type TurmaFindOneQueryResult,
  type TurmaListQuery,
  type TurmaListQueryResult,
  turmaPaginationSpec,
} from "@/modules/ensino/turma/domain/queries";
import type { ITurmaRepository } from "@/modules/ensino/turma/domain/repositories";
import { TurmaEntity, turmaEntityDomainMapper } from "./typeorm";

const config = {
  alias: "turma",
  hasSoftDelete: true,
} as const;

const turmaRelations = {
  curso: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
  ambientePadraoAula: {
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
};

const turmaPaginateConfig = buildTypeOrmPaginateConfig<TurmaEntity>(
  turmaPaginationSpec,
  turmaRelations,
);

@DeclareImplementation()
export class TurmaTypeOrmRepositoryAdapter implements ITurmaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: TurmaListQuery | null = null) {
    return typeormFindAll<TurmaEntity, TurmaListQuery, TurmaListQueryResult>(
      this.appTypeormConnection,
      TurmaEntity,
      { ...config, paginateConfig: turmaPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: TurmaFindOneQuery) {
    return typeormFindById<TurmaEntity, TurmaFindOneQuery, TurmaFindOneQueryResult>(
      this.appTypeormConnection,
      TurmaEntity,
      { ...config, paginateConfig: turmaPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as TurmaFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = turmaEntityDomainMapper.toPersistenceData(data);
    return typeormCreate(this.appTypeormConnection, TurmaEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = turmaEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, TurmaEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, TurmaEntity, config.alias, id);
  }
}
