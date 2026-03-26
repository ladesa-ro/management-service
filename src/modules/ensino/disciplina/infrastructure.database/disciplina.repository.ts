import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import {
  type DisciplinaFindOneQuery,
  type DisciplinaFindOneQueryResult,
  type DisciplinaListQuery,
  type DisciplinaListQueryResult,
  disciplinaPaginationSpec,
} from "@/modules/ensino/disciplina/domain/queries";
import type { IDisciplinaRepository } from "@/modules/ensino/disciplina/domain/repositories";
import { DisciplinaEntity, DisciplinaTypeormMapper } from "./typeorm";

const config = {
  alias: "disciplina",
  hasSoftDelete: true,
} as const;

const disciplinaRelations = { diarios: true };

const disciplinaPaginateConfig = buildTypeOrmPaginateConfig<DisciplinaEntity>(
  disciplinaPaginationSpec,
  disciplinaRelations,
);

@DeclareImplementation()
export class DisciplinaTypeOrmRepositoryAdapter implements IDisciplinaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ============================================================================
  // Write (Command handlers)
  // ============================================================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Disciplina | null> {
    const repo = this.appTypeormConnection.getRepository(DisciplinaEntity);
    const entity = await repo.findOne({ where: { id, dateDeleted: IsNull() } });
    if (!entity) return null;
    return Disciplina.load(DisciplinaTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Disciplina): Promise<void> {
    const entityData = DisciplinaTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(DisciplinaEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as DisciplinaEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, DisciplinaEntity, config.alias, id);
  }

  // ============================================================================
  // Read (Query handlers)
  // ============================================================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: DisciplinaFindOneQuery) {
    return typeormFindById<DisciplinaEntity, DisciplinaFindOneQuery, DisciplinaFindOneQueryResult>(
      this.appTypeormConnection,
      DisciplinaEntity,
      { ...config, paginateConfig: disciplinaPaginateConfig },
      dto,
      DisciplinaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: DisciplinaListQuery | null = null,
  ) {
    return typeormFindAll<DisciplinaEntity, DisciplinaListQuery, DisciplinaListQueryResult>(
      this.appTypeormConnection,
      DisciplinaEntity,
      { ...config, paginateConfig: disciplinaPaginateConfig },
      this.paginationAdapter,
      dto,
      DisciplinaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
