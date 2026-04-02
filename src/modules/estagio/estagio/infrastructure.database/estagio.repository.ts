import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type { IHorarioEstagio } from "@/modules/estagio/estagio/domain/estagio";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type {
  EstagioFindOneQuery,
  EstagioFindOneQueryResult,
  EstagioListQuery,
  EstagioListQueryResult,
} from "@/modules/estagio/estagio/domain/queries";
import { estagioPaginationSpec } from "@/modules/estagio/estagio/domain/queries";
import type { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { getNowISO } from "@/utils/date";
import { EstagioTypeormEntity, EstagioTypeormMapper, HorarioEstagioTypeormEntity } from "./typeorm";

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

/** Relations para o write side (loadById). */
const writeRelations = {
  empresa: true,
  estagiario: true,
  horariosEstagio: true,
} as const;

@Impl()
export class EstagioTypeOrmRepositoryAdapter implements IEstagioRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Estagio | null> {
    const repo = this.appTypeormConnection.getRepository(EstagioTypeormEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return EstagioTypeormMapper.entityToDomain.map(entity);
  }

  async save(aggregate: Estagio): Promise<void> {
    const entity = EstagioTypeormMapper.domainToPersistence.map(aggregate);
    const repo = this.appTypeormConnection.getRepository(EstagioTypeormEntity);
    await repo.save(entity);

    if (aggregate.horariosEstagio !== undefined) {
      await this.replaceHorariosEstagio(aggregate.id, aggregate.horariosEstagio);
    }
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, EstagioTypeormEntity, config.alias, id);
  }

  async replaceHorariosEstagio(estagioId: string, horarios: IHorarioEstagio[]): Promise<void> {
    await this.softDeleteHorariosEstagio(estagioId);

    if (horarios.length === 0) return;

    const repo = this.appTypeormConnection.getRepository(HorarioEstagioTypeormEntity);
    const entities = horarios.map((horario) =>
      EstagioTypeormMapper.horarioToPersistence(estagioId, horario),
    );
    await repo.save(entities);
  }

  async softDeleteHorariosEstagio(estagioId: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(HorarioEstagioTypeormEntity);
    const now = getNowISO();
    await repo.update(
      { estagio: { id: estagioId }, dateDeleted: IsNull() },
      { dateDeleted: now, dateUpdated: now },
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: EstagioFindOneQuery,
  ): Promise<EstagioFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(EstagioTypeormEntity);

    return repo
      .findOne({
        where: { id: dto.id, dateDeleted: IsNull() },
        relations: estagioRelations,
      })
      .then((entity) =>
        entity ? EstagioTypeormMapper.entityToFindOneQueryResult.map(entity) : null,
      );
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: EstagioListQuery | null = null,
  ): Promise<EstagioListQueryResult> {
    return typeormFindAll<EstagioTypeormEntity, EstagioListQuery, EstagioListQueryResult>(
      this.appTypeormConnection,
      EstagioTypeormEntity,
      { ...config, paginateConfig: estagioPaginateConfig },
      this.paginationAdapter,
      dto,
      EstagioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
