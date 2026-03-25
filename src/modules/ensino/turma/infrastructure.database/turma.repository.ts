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
  dateToISO,
  dateToISONullable,
  toRefRequired,
} from "@/infrastructure.database/typeorm/mapping";
import {
  type TurmaFindOneQuery,
  type TurmaFindOneQueryResult,
  type TurmaListQuery,
  type TurmaListQueryResult,
  turmaPaginationSpec,
} from "@/modules/ensino/turma/domain/queries";
import type { ITurmaRepository } from "@/modules/ensino/turma/domain/repositories";
import { type ITurma, Turma } from "@/modules/ensino/turma/domain/turma";
import { TurmaEntity, turmaEntityDomainMapper } from "./typeorm";

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
 * Carrega o mínimo necessário para reconstituir o aggregate:
 * - curso: join para extrair o ID (TypeORM não expõe FK sem join)
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

    return Turma.load(this.toDomainData(entity));
  }

  async save(aggregate: Turma): Promise<void> {
    const entityData = turmaEntityDomainMapper.toPersistenceData({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(TurmaEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as TurmaEntity));
  }

  update(id: string | number, data: Record<string, unknown>) {
    const entityData = turmaEntityDomainMapper.toPersistenceData(data);
    return typeormUpdate(this.appTypeormConnection, TurmaEntity, id, entityData);
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

    return entity as unknown as TurmaFindOneQueryResult;
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
    );
  }

  // ==========================================
  // Mappers privados — fronteira de tradução do adapter
  // ==========================================

  /**
   * Entity TypeORM → dados para Domain.load() (write side).
   *
   * Projeta relações como { id } — o domínio não carrega dados de outros aggregates.
   * Datas Date → ISO string (o domínio usa ScalarDateTimeString).
   */
  private toDomainData(entity: TurmaEntity): ITurma {
    return {
      id: entity.id,
      periodo: entity.periodo,
      curso: toRefRequired(entity.curso),
      ambientePadraoAula: entity.ambientePadraoAula ? { id: entity.ambientePadraoAula.id } : null,
      imagemCapa: entity.imagemCapa ? { id: entity.imagemCapa.id } : null,
      dateCreated: dateToISO(entity.dateCreated),
      dateUpdated: dateToISO(entity.dateUpdated),
      dateDeleted: dateToISONullable(entity.dateDeleted),
    };
  }
}
