import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import {
  type DiarioProfessorFindOneQuery,
  type DiarioProfessorFindOneQueryResult,
  type DiarioProfessorListQuery,
  type DiarioProfessorListQueryResult,
  diarioProfessorPaginationSpec,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioProfessorRepository } from "@/modules/ensino/diario/domain/repositories";
import { getNowISO } from "@/utils/date";
import { DiarioProfessorEntity } from "./typeorm/diario-professor.typeorm.entity";

const config = {
  alias: "diario_professor",
  hasSoftDelete: true,
} as const;

const diarioProfessorRelations = {
  diario: {
    calendarioLetivo: {
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
    turma: {
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
};

const diarioProfessorPaginateConfig = buildTypeOrmPaginateConfig<DiarioProfessorEntity>(
  diarioProfessorPaginationSpec,
  diarioProfessorRelations,
);

@Impl()
export class DiarioProfessorTypeOrmRepositoryAdapter implements IDiarioProfessorRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: DiarioProfessorListQuery | null = null,
  ) {
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

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: DiarioProfessorFindOneQuery) {
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
    return this.getFindOneQueryResult(accessContext, { id } as DiarioProfessorFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    return typeormCreate(this.appTypeormConnection, DiarioProfessorEntity, data);
  }

  update(id: string | number, data: Record<string, unknown>) {
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
      .set({ dateDeleted: getNowISO() })
      .where("id_diario_fk = :diarioId AND date_deleted IS NULL", { diarioId })
      .execute();
  }

  async bulkCreate(
    entries: Array<{ situacao: boolean; diarioId: string; perfilId: string }>,
  ): Promise<void> {
    if (entries.length === 0) return;

    const repo = this.appTypeormConnection.getRepository(DiarioProfessorEntity);
    const now = getNowISO();
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
