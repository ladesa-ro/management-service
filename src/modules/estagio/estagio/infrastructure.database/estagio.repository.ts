import { IsNull } from "typeorm";
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
import type { IHorarioEstagio } from "@/modules/estagio/estagio/domain/estagio";
import type {
  EstagioFindOneQuery,
  EstagioFindOneQueryResult,
  EstagioListQuery,
  EstagioListQueryResult,
} from "@/modules/estagio/estagio/domain/queries";
import { estagioPaginationSpec } from "@/modules/estagio/estagio/domain/queries";
import type { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { getNow } from "@/utils/date";
import { EstagioMapper, EstagioTypeormEntity, HorarioEstagioTypeormEntity } from "./typeorm";

const config = {
  alias: "estagio",
} as const;

const estagioRelations = {
  empresa: true,
  estagiario: true,
  horariosEstagio: true,
};

const estagioPaginateConfig = buildTypeOrmPaginateConfig<EstagioTypeormEntity>(
  estagioPaginationSpec,
  estagioRelations,
);

@DeclareImplementation()
export class EstagioTypeOrmRepositoryAdapter implements IEstagioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: EstagioListQuery | null = null) {
    return typeormFindAll<EstagioTypeormEntity, EstagioListQuery, EstagioListQueryResult>(
      this.appTypeormConnection,
      EstagioTypeormEntity,
      { ...config, paginateConfig: estagioPaginateConfig },
      this.paginationAdapter,
      dto,
      (entity) => EstagioMapper.toOutputDto(entity),
    );
  }

  findById(accessContext: IAccessContext | null, dto: EstagioFindOneQuery) {
    return typeormFindById<EstagioTypeormEntity, EstagioFindOneQuery, EstagioFindOneQueryResult>(
      this.appTypeormConnection,
      EstagioTypeormEntity,
      { ...config, paginateConfig: estagioPaginateConfig },
      dto,
      (entity) => EstagioMapper.toOutputDto(entity),
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as EstagioFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    const entityData = EstagioMapper.toPersistenceFromRecord(data) as Record<string, unknown>;
    return typeormCreate(this.appTypeormConnection, EstagioTypeormEntity, entityData);
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = EstagioMapper.toPersistenceFromRecord(data) as Record<string, unknown>;
    return typeormUpdate(this.appTypeormConnection, EstagioTypeormEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, EstagioTypeormEntity, config.alias, id);
  }

  async replaceHorariosEstagio(estagioId: string, horarios: IHorarioEstagio[]): Promise<void> {
    await this.softDeleteHorariosEstagio(estagioId);

    if (horarios.length === 0) return;

    const repo = this.appTypeormConnection.getRepository(HorarioEstagioTypeormEntity);
    const entities = horarios.map((horario) =>
      EstagioMapper.toHorarioPersistence(estagioId, horario),
    );
    await repo.save(entities);
  }

  async softDeleteHorariosEstagio(estagioId: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioEstagioTypeormEntity);
    const now = getNow();
    await repo.update(
      { estagio: { id: estagioId }, dateDeleted: IsNull() },
      { dateDeleted: now, dateUpdated: now },
    );
  }
}
