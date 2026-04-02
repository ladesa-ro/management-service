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
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import type {
  CampusFindOneQuery,
  CampusFindOneQueryResult,
  CampusListQuery,
  CampusListQueryResult,
} from "@/modules/ambientes/campus/domain/queries";
import { campusPaginationSpec } from "@/modules/ambientes/campus/domain/queries";
import type { ICampusRepository } from "@/modules/ambientes/campus/domain/repositories";
import { CampusEntity, CampusTypeormMapper } from "./typeorm";

const config = {
  alias: "campus",
  hasSoftDelete: true,
} as const;

const campusRelations = {
  endereco: {
    cidade: {
      estado: true,
    },
  },
};

const campusPaginateConfig = buildTypeOrmPaginateConfig<CampusEntity>(
  campusPaginationSpec,
  campusRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o necessário para reconstituir o aggregate:
 * - endereco + cidade: CampusSchema exige o objeto completo de endereco (incluindo cidade ref)
 */
const writeRelations = {
  endereco: {
    cidade: true,
  },
} as const;

@Impl()
export class CampusTypeOrmRepositoryAdapter implements ICampusRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Campus | null> {
    const repo = this.appTypeormConnection.getRepository(CampusEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Campus.load(CampusTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Campus): Promise<void> {
    const entityData = CampusTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(CampusEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as CampusEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, CampusEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: CampusFindOneQuery,
  ): Promise<CampusFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(CampusEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: campusPaginateConfig.relations,
    });

    if (!entity) return null;

    return CampusTypeormMapper.entityToFindOneQueryResult.map(entity);
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: CampusListQuery | null = null,
  ): Promise<CampusListQueryResult> {
    return typeormFindAll<CampusEntity, CampusListQuery, CampusListQueryResult>(
      this.appTypeormConnection,
      CampusEntity,
      { ...config, paginateConfig: campusPaginateConfig },
      this.paginationAdapter,
      dto,
      CampusTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
