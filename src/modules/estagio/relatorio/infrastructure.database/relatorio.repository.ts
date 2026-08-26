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
import type {
  RelatorioFindOneQuery,
  RelatorioFindOneQueryResult,
  RelatorioListQuery,
  RelatorioListQueryResult,
} from "../domain/queries";
import { relatorioPaginationSpec } from "../domain/queries";
import { Relatorio } from "../domain/relatorio";
import type { IRelatorioEstagioRepository } from "../domain/repositories";
import { RelatorioTypeormEntity } from "./typeorm/relatorio.typeorm.entity";
import { RelatorioTypeormMapper } from "./typeorm/relatorio.typeorm.mapper";

const config = {
  alias: "relatorio",
} as const;

const relations = {
  estagio: true,
  arquivo: true,
};

const relatorioPaginateConfig = buildTypeOrmPaginateConfig<RelatorioTypeormEntity>(
  relatorioPaginationSpec,
  relations,
);

@Impl()
export class RelatorioEstagioTypeOrmRepositoryAdapter implements IRelatorioEstagioRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Relatorio | null> {
    const repo = this.appTypeormConnection.getRepository(RelatorioTypeormEntity);
    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations,
    });
    if (!entity) return null;
    return RelatorioTypeormMapper.entityToDomain.map(entity);
  }

  async findByEstagioId(estagioId: string): Promise<Relatorio | null> {
    const repo = this.appTypeormConnection.getRepository(RelatorioTypeormEntity);
    const entity = await repo.findOne({
      where: { estagio: { id: estagioId }, dateDeleted: IsNull() },
      relations,
    });
    if (!entity) return null;
    return RelatorioTypeormMapper.entityToDomain.map(entity);
  }

  async save(aggregate: Relatorio): Promise<void> {
    const entity = RelatorioTypeormMapper.domainToPersistence.map(aggregate);
    const repo = this.appTypeormConnection.getRepository(RelatorioTypeormEntity);
    await repo.save(entity);
  }

  softDeleteById(id: string): Promise<void> {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      RelatorioTypeormEntity,
      config.alias,
      id,
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: RelatorioFindOneQuery,
  ): Promise<RelatorioFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(RelatorioTypeormEntity);
    return repo
      .findOne({
        where: { id: dto.id, dateDeleted: IsNull() },
        relations,
      })
      .then((entity) =>
        entity ? RelatorioTypeormMapper.entityToFindOneQueryResult.map(entity) : null,
      );
  }

  async getFindByEstagioQueryResult(
    estagioId: string,
  ): Promise<RelatorioFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(RelatorioTypeormEntity);
    const entity = await repo.findOne({
      where: { estagio: { id: estagioId }, dateDeleted: IsNull() },
      relations,
    });
    return entity ? RelatorioTypeormMapper.entityToFindOneQueryResult.map(entity) : null;
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: RelatorioListQuery | null = null,
  ): Promise<RelatorioListQueryResult> {
    return typeormFindAll<RelatorioTypeormEntity, RelatorioListQuery, RelatorioListQueryResult>(
      this.appTypeormConnection,
      RelatorioTypeormEntity,
      { ...config, paginateConfig: relatorioPaginateConfig },
      this.paginationAdapter,
      dto,
      RelatorioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
