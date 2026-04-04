import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
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
import type { ICurso } from "@/modules/ensino/curso/domain/curso";
import {
  type CursoFindOneQuery,
  type CursoFindOneQueryResult,
  type CursoListQuery,
  type CursoListQueryResult,
  cursoPaginationSpec,
} from "@/modules/ensino/curso/domain/queries";
import type { ICursoRepository } from "@/modules/ensino/curso/domain/repositories";
import { CursoEntity, CursoTypeormMapper } from "./typeorm";

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
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
  periodoDisciplinas: {
    disciplina: true,
  },
};

const cursoPaginateConfig = buildTypeOrmPaginateConfig<CursoEntity>(
  cursoPaginationSpec,
  cursoRelations,
);

@Impl()
export class CursoTypeOrmRepositoryAdapter implements ICursoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ============================================================================
  // Write (Command handlers)
  // ============================================================================

  async create(data: ICurso): Promise<{ id: string }> {
    const entityData = CursoTypeormMapper.domainToPersistence.map(data);
    const result = await typeormCreate(this.appTypeormConnection, CursoEntity, entityData);
    return { id: result.id };
  }

  update(id: string, data: ICurso) {
    const entityData = CursoTypeormMapper.domainToPersistence.map(data);
    return typeormUpdate(this.appTypeormConnection, CursoEntity, id, entityData);
  }

  async updateImagemField(id: string, fieldName: string, imagemId: string | null): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(CursoEntity);
    await repo
      .createQueryBuilder()
      .update()
      .set({ [fieldName]: imagemId ? { id: imagemId } : null })
      .where("id = :id", { id })
      .execute();
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CursoEntity, config.alias, id);
  }

  async loadById(_accessContext: IAccessContext | null, id: string) {
    const repo = this.appTypeormConnection.getRepository(CursoEntity);
    const entity = await repo.findOne({
      where: { id },
      relations: cursoRelations,
    });
    if (!entity) return null;
    return CursoTypeormMapper.entityToDomain.map(entity);
  }

  // ============================================================================
  // Read (Query handlers)
  // ============================================================================

  getFindAllQueryResult(accessContext: IAccessContext | null, dto: CursoListQuery | null = null) {
    return typeormFindAll<CursoEntity, CursoListQuery, CursoListQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      { ...config, paginateConfig: cursoPaginateConfig },
      this.paginationAdapter,
      dto,
      CursoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: CursoFindOneQuery) {
    return typeormFindById<CursoEntity, CursoFindOneQuery, CursoFindOneQueryResult>(
      this.appTypeormConnection,
      CursoEntity,
      { ...config, paginateConfig: cursoPaginateConfig },
      dto,
      CursoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
