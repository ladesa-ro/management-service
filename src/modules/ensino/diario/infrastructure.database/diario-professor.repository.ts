import { FilterOperator } from "nestjs-paginate";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  DiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult,
  DiarioProfessorListQuery,
  DiarioProfessorListQueryResult,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioProfessorRepository } from "@/modules/ensino/diario/domain/repositories";
import { getNow } from "@/utils/date";
import { DiarioProfessorEntity } from "./typeorm/diario-professor.typeorm.entity";

const config = {
  alias: "diario_professor",
  hasSoftDelete: true,
} as const;

const diarioProfessorPaginateConfig: ITypeOrmPaginationConfig<DiarioProfessorEntity> = {
  ...paginateConfig,
  relations: {
    diario: {
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
    },
    perfil: {
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
      usuario: true,
    },
  },
  sortableColumns: ["situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
  searchableColumns: ["id", "situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
  defaultSortBy: [],
  filterableColumns: {
    "perfil.usuario.id": [FilterOperator.EQ],
    "perfil.id": [FilterOperator.EQ],
    "diario.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class DiarioProfessorTypeOrmRepositoryAdapter implements IDiarioProfessorRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: DiarioProfessorListQuery | null = null) {
    return typeormFindAll<
      DiarioProfessorEntity,
      DiarioProfessorListQuery,
      DiarioProfessorListQueryResult
    >(
      this.appTypeormConnection,
      DiarioProfessorEntity,
      { ...config, paginateConfig: diarioProfessorPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: DiarioProfessorFindOneQuery) {
    return typeormFindById<
      DiarioProfessorEntity,
      DiarioProfessorFindOneQuery,
      DiarioProfessorFindOneQueryResult
    >(
      this.appTypeormConnection,
      DiarioProfessorEntity,
      { ...config, paginateConfig: diarioProfessorPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as DiarioProfessorFindOneQuery);
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, DiarioProfessorEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, DiarioProfessorEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      DiarioProfessorEntity,
      config.alias,
      id,
    );
  }

  async softDeleteByDiarioId(diarioId: string): Promise<void> {
    await this.appTypeormConnection
      .getRepository(DiarioProfessorEntity)
      .createQueryBuilder()
      .update(DiarioProfessorEntity)
      .set({ dateDeleted: getNow() })
      .where("id_diario_fk = :diarioId AND date_deleted IS NULL", { diarioId })
      .execute();
  }

  async bulkCreate(
    entries: Array<{ situacao: boolean; diarioId: string; perfilId: string }>,
  ): Promise<void> {
    if (entries.length === 0) return;

    const repo = this.appTypeormConnection.getRepository(DiarioProfessorEntity);
    const now = getNow();
    const entities = entries.map((p) => {
      const entity = new DiarioProfessorEntity();
      entity.id = generateUuidV7();
      entity.situacao = p.situacao;
      Object.assign(entity, { diario: { id: p.diarioId } });
      Object.assign(entity, { perfil: { id: p.perfilId } });
      entity.dateCreated = now;
      entity.dateUpdated = now;
      entity.dateDeleted = null;
      return entity;
    });
    await repo.save(entities);
  }
}
