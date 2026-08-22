import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { CalendarioColecaoAcesso } from "../domain/calendario-colecao-acesso";
import type {
  CalendarioColecaoAcessoFindOneQuery,
  CalendarioColecaoAcessoFindOneQueryResult,
  CalendarioColecaoAcessoListQuery,
  CalendarioColecaoAcessoListQueryResult,
} from "../domain/queries";
import { calendarioColecaoAcessoPaginationSpec } from "../domain/queries";
import type { ICalendarioColecaoAcessoRepository } from "../domain/repositories";
import { CalendarioColecaoAcessoEntity, CalendarioColecaoAcessoTypeormMapper } from "./typeorm";

const config = {
  alias: "calendario_colecao_acesso",
} as const;

const calendarioColecaoAcessoRelations = {
  colecao: true,
  usuario: true,
  campus: {
    endereco: {
      cidade: {
        estado: true,
      },
    },
  },
};

const calendarioColecaoAcessoPaginateConfig =
  buildTypeOrmPaginateConfig<CalendarioColecaoAcessoEntity>(
    calendarioColecaoAcessoPaginationSpec,
    calendarioColecaoAcessoRelations,
  );

/** Relations para o write side (loadById) — o mínimo para reconstituir o aggregate. */
const writeRelations = {
  colecao: true,
  usuario: true,
  campus: true,
} as const;

@Impl()
export class CalendarioColecaoAcessoTypeOrmRepositoryAdapter
  implements ICalendarioColecaoAcessoRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<CalendarioColecaoAcesso | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioColecaoAcessoEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return CalendarioColecaoAcesso.load(
      CalendarioColecaoAcessoTypeormMapper.entityToDomain.map(entity),
    );
  }

  async save(aggregate: CalendarioColecaoAcesso): Promise<void> {
    const entityData = CalendarioColecaoAcessoTypeormMapper.domainToPersistence.map({
      ...aggregate,
    });
    const repo = this.appTypeormConnection.getRepository(CalendarioColecaoAcessoEntity);
    await repo.save(
      repo.create({ id: aggregate.id, ...entityData } as CalendarioColecaoAcessoEntity),
    );
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioColecaoAcessoEntity,
      config.alias,
      id,
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoAcessoFindOneQuery,
  ) {
    return typeormFindById<
      CalendarioColecaoAcessoEntity,
      CalendarioColecaoAcessoFindOneQuery,
      CalendarioColecaoAcessoFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioColecaoAcessoEntity,
      { ...config, paginateConfig: calendarioColecaoAcessoPaginateConfig },
      dto,
      CalendarioColecaoAcessoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoAcessoListQuery | null = null,
  ) {
    return typeormFindAll<
      CalendarioColecaoAcessoEntity,
      CalendarioColecaoAcessoListQuery,
      CalendarioColecaoAcessoListQueryResult
    >(
      this.appTypeormConnection,
      CalendarioColecaoAcessoEntity,
      { ...config, paginateConfig: calendarioColecaoAcessoPaginateConfig },
      this.paginationAdapter,
      dto,
      CalendarioColecaoAcessoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  async findAllActiveByColecaoId(
    _accessContext: IAccessContext | null,
    colecaoId: string,
  ): Promise<CalendarioColecaoAcessoFindOneQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(CalendarioColecaoAcessoEntity);

    const entities = await repo.find({
      where: { colecao: { id: colecaoId }, dateDeleted: IsNull() },
      relations: calendarioColecaoAcessoRelations,
    });

    return CalendarioColecaoAcessoTypeormMapper.entityToFindOneQueryResult.mapArray(entities);
  }
}
