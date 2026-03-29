import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import {
  type TurmaFindOneQuery,
  type TurmaFindOneQueryResult,
  type TurmaListQuery,
  type TurmaListQueryResult,
  turmaPaginationSpec,
} from "@/modules/ensino/turma/domain/queries";
import type { ITurmaRepository } from "@/modules/ensino/turma/domain/repositories";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { TurmaEntity, TurmaTypeormMapper } from "./typeorm";

const config = {
  alias: "turma",
  hasSoftDelete: true,
} as const;

const turmaRelations = {
  curso: {
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
  },
  ambientePadraoAula: {
    bloco: {
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
    },
  },
};

/**
 * Relations para o write side (loadById).
 * Carrega o minimo necessario para reconstituir o aggregate:
 * - curso: join para extrair o ID (TypeORM nao expoe FK sem join)
 * - ambientePadraoAula: join para extrair o ID
 * - imagemCapa: join para extrair o ID
 */
const writeRelations = {
  curso: true,
  ambientePadraoAula: true,
  imagemCapa: true,
} as const;

const turmaPaginateConfig = buildTypeOrmPaginateConfig<TurmaEntity>(
  turmaPaginationSpec,
  turmaRelations,
);

@DeclareImplementation()
export class TurmaTypeOrmRepositoryAdapter implements ITurmaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Turma | null> {
    const repo = this.appTypeormConnection.getRepository(TurmaEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Turma.load(TurmaTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Turma): Promise<void> {
    const entityData = TurmaTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(TurmaEntity);
    await repo.save(repo.create(entityData));
  }

  update(id: string | number, data: Record<string, unknown>) {
    return typeormUpdate(this.appTypeormConnection, TurmaEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, TurmaEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: TurmaFindOneQuery,
  ): Promise<TurmaFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(TurmaEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: turmaPaginateConfig.relations,
    });

    if (!entity) return null;

    return TurmaTypeormMapper.entityToFindOneQueryResult.map(entity);
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: TurmaListQuery | null = null,
  ): Promise<TurmaListQueryResult> {
    return typeormFindAll<TurmaEntity, TurmaListQuery, TurmaListQueryResult>(
      this.appTypeormConnection,
      TurmaEntity,
      { ...config, paginateConfig: turmaPaginateConfig },
      this.paginationAdapter,
      dto,
      TurmaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
