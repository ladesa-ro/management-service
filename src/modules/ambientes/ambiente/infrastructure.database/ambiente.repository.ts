import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import type {
  AmbienteFindOneQuery,
  AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteListQueryResult,
} from "@/modules/ambientes/ambiente/domain/queries";
import { ambientePaginationSpec } from "@/modules/ambientes/ambiente/domain/queries";
import type { IAmbienteRepository } from "@/modules/ambientes/ambiente/domain/repositories";
import { AmbienteEntity, AmbienteTypeormMapper } from "./typeorm";

const config = {
  alias: "ambiente",
  hasSoftDelete: true,
} as const;

const ambienteRelations = {
  bloco: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
  },
};

const ambientePaginateConfig = buildTypeOrmPaginateConfig<AmbienteEntity>(
  ambientePaginationSpec,
  ambienteRelations,
);

/**
 * Relations para o write side (loadById).
 * Carrega o necessário para reconstituir o aggregate:
 * - bloco: AmbienteSchema exige o objeto de bloco (ref)
 */
const writeRelations = {
  bloco: true,
  imagemCapa: true,
} as const;

@DeclareImplementation()
export class AmbienteTypeOrmRepositoryAdapter implements IAmbienteRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Ambiente | null> {
    const repo = this.appTypeormConnection.getRepository(AmbienteEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Ambiente.load(AmbienteTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Ambiente): Promise<void> {
    const entityData = AmbienteTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(AmbienteEntity);
    await repo.save(repo.create(entityData));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, AmbienteEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: AmbienteFindOneQuery,
  ): Promise<AmbienteFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(AmbienteEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: ambientePaginateConfig.relations,
    });

    if (!entity) return null;

    return AmbienteTypeormMapper.entityToOutput.map(entity);
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: AmbienteListQuery | null = null,
  ): Promise<AmbienteListQueryResult> {
    return typeormFindAll<AmbienteEntity, AmbienteListQuery, AmbienteListQueryResult>(
      this.appTypeormConnection,
      AmbienteEntity,
      { ...config, paginateConfig: ambientePaginateConfig },
      this.paginationAdapter,
      dto,
      AmbienteTypeormMapper.entityToOutput.map,
    );
  }
}
