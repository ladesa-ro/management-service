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
  type CursoFindOneQuery,
  type CursoFindOneQueryResult,
  type CursoListQuery,
  type CursoListQueryResult,
  cursoPaginationSpec,
} from "@/modules/ensino/curso/domain/queries";
import type { ICursoRepository } from "@/modules/ensino/curso/domain/repositories";
import { CursoEntity, cursoEntityDomainMapper } from "./typeorm";

const config = {
  alias: "curso",
  hasSoftDelete: true,
} as const;

const cursoRelations = {
  campus: {
    endereco: {
      cidade: {
        estado: true,
      },
    },
  },
  ofertaFormacao: {
    modalidade: true,
  },
};

const cursoPaginateConfig = buildTypeOrmPaginateConfig<CursoEntity>(
  cursoPaginationSpec,
  cursoRelations,
);

@DeclareImplementation()
export class CursoTypeOrmRepositoryAdapter implements ICursoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  getFindAllQueryResult(accessContext: IAccessContext | null, dto: CursoListQuery | null = null) {
    return typeormFindAll<CursoEntity, CursoListQuery, CursoListQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      { ...config, paginateConfig: cursoPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: CursoFindOneQuery) {
    return typeormFindById<CursoEntity, CursoFindOneQuery, CursoFindOneQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      { ...config, paginateConfig: cursoPaginateConfig },
      dto,
    );
  }

  async create(data: Record<string, unknown>): Promise<{ id: string }> {
    const entityData = cursoEntityDomainMapper.toPersistenceData(data);
    const result = await typeormCreate(this.appTypeormConnection, CursoEntity, entityData);
    return { id: result.id as string };
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = cursoEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, CursoEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CursoEntity, config.alias, id);
  }
}
