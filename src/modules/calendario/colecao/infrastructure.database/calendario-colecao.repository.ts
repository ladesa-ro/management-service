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
import { CalendarioColecao } from "../domain/calendario-colecao";
import type {
  CalendarioColecaoFindOneQuery,
  CalendarioColecaoFindOneQueryResult,
  CalendarioColecaoListQuery,
  CalendarioColecaoListQueryResult,
} from "../domain/queries";
import { calendarioColecaoPaginationSpec } from "../domain/queries";
import type { ICalendarioColecaoRepository } from "../domain/repositories";
import { CalendarioColecaoEntity, CalendarioColecaoTypeormMapper } from "./typeorm";

const config = {
  alias: "calendario_colecao",
} as const;

const calendarioColecaoRelations = {
  dono: true,
  campus: {
    endereco: {
      cidade: {
        estado: true,
      },
    },
  },
};

const calendarioColecaoPaginateConfig = buildTypeOrmPaginateConfig<CalendarioColecaoEntity>(
  calendarioColecaoPaginationSpec,
  calendarioColecaoRelations,
);

const writeRelations = {
  dono: true,
  campus: true,
} as const;

@Impl()
export class CalendarioColecaoTypeOrmRepositoryAdapter implements ICalendarioColecaoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<CalendarioColecao | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioColecaoEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return CalendarioColecao.load(CalendarioColecaoTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: CalendarioColecao): Promise<void> {
    const entityData = CalendarioColecaoTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(CalendarioColecaoEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as CalendarioColecaoEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      CalendarioColecaoEntity,
      config.alias,
      id,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: CalendarioColecaoFindOneQuery) {
    return typeormFindById<
      CalendarioColecaoEntity,
      CalendarioColecaoFindOneQuery,
      CalendarioColecaoFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioColecaoEntity,
      { ...config, paginateConfig: calendarioColecaoPaginateConfig },
      dto,
      CalendarioColecaoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoListQuery | null = null,
  ) {
    return typeormFindAll<
      CalendarioColecaoEntity,
      CalendarioColecaoListQuery,
      CalendarioColecaoListQueryResult
    >(
      this.appTypeormConnection,
      CalendarioColecaoEntity,
      { ...config, paginateConfig: calendarioColecaoPaginateConfig },
      this.paginationAdapter,
      dto,
      CalendarioColecaoTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
