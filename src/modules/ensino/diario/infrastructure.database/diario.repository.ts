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
import { Diario } from "@/modules/ensino/diario/domain/diario";
import {
  type DiarioFindOneQuery,
  type DiarioFindOneQueryResult,
  type DiarioListQuery,
  type DiarioListQueryResult,
  diarioPaginationSpec,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioRepository } from "@/modules/ensino/diario/domain/repositories";
import { DiarioEntity, DiarioTypeormMapper } from "./typeorm";

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
 * Carrega o minimo necessario para reconstituir o aggregate:
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

    return Diario.load(DiarioTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Diario): Promise<void> {
    const entityData = DiarioTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(DiarioEntity);
    await repo.save(repo.create(entityData));
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

    return DiarioTypeormMapper.entityToOutput.map(entity);
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
      DiarioTypeormMapper.entityToOutput.map,
    );
  }
}
