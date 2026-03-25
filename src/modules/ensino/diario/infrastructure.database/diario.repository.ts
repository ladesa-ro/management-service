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
import {
  dateToISO,
  dateToISONullable,
  toRefRequired,
} from "@/infrastructure.database/typeorm/mapping";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import {
  type DiarioFindOneQuery,
  type DiarioFindOneQueryResult,
  type DiarioListQuery,
  type DiarioListQueryResult,
  diarioPaginationSpec,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioRepository } from "@/modules/ensino/diario/domain/repositories";
import { DiarioEntity, diarioEntityDomainMapper } from "./typeorm";

const config = {
  alias: "diario",
  hasSoftDelete: true,
} as const;

const diarioRelations = {
  turma: {
    curso: {
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
    },
  },
  disciplina: true,
  ambientePadrao: {
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
 * - calendarioLetivo, turma, disciplina: join para extrair o ID
 * - ambientePadrao, imagemCapa: join para extrair o ID (nullable)
 */
const writeRelations = {
  calendarioLetivo: true,
  turma: true,
  disciplina: true,
  ambientePadrao: true,
  imagemCapa: true,
} as const;

const diarioPaginateConfig = buildTypeOrmPaginateConfig<DiarioEntity>(
  diarioPaginationSpec,
  diarioRelations,
);

@DeclareImplementation()
export class DiarioTypeOrmRepositoryAdapter implements IDiarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Diario | null> {
    const repo = this.appTypeormConnection.getRepository(DiarioEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Diario.load(this.toDomainData(entity));
  }

  async save(aggregate: Diario): Promise<void> {
    const entityData = diarioEntityDomainMapper.toPersistenceData({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(DiarioEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as DiarioEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, DiarioEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: DiarioFindOneQuery,
  ): Promise<DiarioFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(DiarioEntity);

    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: diarioPaginateConfig.relations,
    });

    if (!entity) return null;

    return entity as unknown as DiarioFindOneQueryResult;
  }

  getFindAllQueryResult(
    _accessContext: IAccessContext | null,
    dto: DiarioListQuery | null = null,
  ): Promise<DiarioListQueryResult> {
    return typeormFindAll<DiarioEntity, DiarioListQuery, DiarioListQueryResult>(
      this.appTypeormConnection,
      DiarioEntity,
      { ...config, paginateConfig: diarioPaginateConfig },
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
  private toDomainData(entity: DiarioEntity): Record<string, unknown> {
    return {
      id: entity.id,
      ativo: entity.ativo,
      calendarioLetivo: toRefRequired(entity.calendarioLetivo),
      turma: toRefRequired(entity.turma),
      disciplina: toRefRequired(entity.disciplina),
      ambientePadrao: entity.ambientePadrao ? { id: entity.ambientePadrao.id } : null,
      imagemCapa: entity.imagemCapa ? { id: entity.imagemCapa.id } : null,
      dateCreated: dateToISO(entity.dateCreated),
      dateUpdated: dateToISO(entity.dateUpdated),
      dateDeleted: dateToISONullable(entity.dateDeleted),
    };
  }
}
