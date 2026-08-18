import { IsNull, LessThan, Not } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";

import { FolhaPonto, FolhaPontoStatus } from "../domain/folha-ponto";
import type {
  FolhaPontoFindOneQuery,
  FolhaPontoFindOneQueryResult,
  FolhaPontoListQuery,
  FolhaPontoListQueryResult,
} from "../domain/queries";
import { folhaPontoPaginationSpec } from "../domain/queries";
import type { IFolhaPontoRepository } from "../domain/repositories";
import { FolhaPontoTypeormEntity } from "./typeorm/folha-ponto.typeorm.entity";
import { FolhaPontoTypeormMapper } from "./typeorm/folha-ponto.typeorm.mapper";

const config = {
  alias: "folha_ponto",
} as const;

const relations = {
  estagio: true,
};

const folhaPontoPaginateConfig = buildTypeOrmPaginateConfig<FolhaPontoTypeormEntity>(
  folhaPontoPaginationSpec,
  relations,
);

@Impl()
export class FolhaPontoTypeOrmRepositoryAdapter implements IFolhaPontoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<FolhaPonto | null> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTypeormEntity);
    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations,
    });
    if (!entity) return null;
    return FolhaPontoTypeormMapper.entityToDomain.map(entity);
  }

  async save(aggregate: FolhaPonto): Promise<void> {
    const entity = FolhaPontoTypeormMapper.domainToPersistence.map(aggregate);
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTypeormEntity);
    await repo.save(entity);
  }

  softDeleteById(id: string): Promise<void> {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      FolhaPontoTypeormEntity,
      config.alias,
      id,
    );
  }

  async existsByEstagioAndData(
    estagioId: string,
    data: string,
    excludeId?: string,
  ): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTypeormEntity);
    const whereCondition: any = {
      estagio: { id: estagioId },
      data,
      dateDeleted: IsNull(),
    };
    if (excludeId) {
      whereCondition.id = Not(excludeId);
    }
    const count = await repo.count({ where: whereCondition });
    return count > 0;
  }

  async findExpiredPending(ttlHours: number): Promise<FolhaPonto[]> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTypeormEntity);

    // Calcula o limite: folha solicitada ANTES DE (agora - ttlHours) está expirada
    const limitDate = new Date();
    limitDate.setHours(limitDate.getHours() - ttlHours);

    const entities = await repo.find({
      where: {
        status: FolhaPontoStatus.PENDING,
        dataSolicitacao: LessThan(limitDate.toISOString()),
        dateDeleted: IsNull(),
      },
      relations,
    });

    return entities.map(FolhaPontoTypeormMapper.entityToDomain.map);
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: FolhaPontoFindOneQuery,
  ): Promise<FolhaPontoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTypeormEntity);
    return repo
      .findOne({
        where: { id: dto.id, dateDeleted: IsNull() },
        relations,
      })
      .then((entity) =>
        entity ? FolhaPontoTypeormMapper.entityToFindOneQueryResult.map(entity) : null,
      );
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: FolhaPontoListQuery | null = null,
  ): Promise<FolhaPontoListQueryResult> {
    return typeormFindAll<FolhaPontoTypeormEntity, FolhaPontoListQuery, FolhaPontoListQueryResult>(
      this.appTypeormConnection,
      FolhaPontoTypeormEntity,
      { ...config, paginateConfig: folhaPontoPaginateConfig },
      this.paginationAdapter,
      dto,
      FolhaPontoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
