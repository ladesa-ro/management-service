import type { SelectQueryBuilder } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
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
import type {
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "@/modules/ensino/diario";
import { diarioPreferenciaAgrupamentoPaginationSpec } from "@/modules/ensino/diario/domain/queries";
import type { IDiarioPreferenciaAgrupamentoRepository } from "@/modules/ensino/diario/domain/repositories";
import { getNow } from "@/utils/date";
import { DiarioPreferenciaAgrupamentoEntity } from "./typeorm/diario-preferencia-agrupamento.typeorm.entity";

const config = {
  alias: "diario_preferencia_agrupamento",
  hasSoftDelete: true,
} as const;

const diarioPreferenciaAgrupamentoRelations = {
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
};

const diarioPreferenciaAgrupamentoPaginateConfig =
  buildTypeOrmPaginateConfig<DiarioPreferenciaAgrupamentoEntity>(
    diarioPreferenciaAgrupamentoPaginationSpec,
    diarioPreferenciaAgrupamentoRelations,
  );

@DeclareImplementation()
export class DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter
  implements IDiarioPreferenciaAgrupamentoRepository
{
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: IAccessContext | null,
    dto: DiarioPreferenciaAgrupamentoListQuery | null = null,
  ) {
    return typeormFindAll<
      DiarioPreferenciaAgrupamentoEntity,
      DiarioPreferenciaAgrupamentoListQuery,
      DiarioPreferenciaAgrupamentoListQueryResult
    >(
      this.appTypeormConnection,
      DiarioPreferenciaAgrupamentoEntity,
      { ...config, paginateConfig: diarioPreferenciaAgrupamentoPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: DiarioPreferenciaAgrupamentoFindOneQuery) {
    return typeormFindById<
      DiarioPreferenciaAgrupamentoEntity,
      DiarioPreferenciaAgrupamentoFindOneQuery,
      DiarioPreferenciaAgrupamentoFindOneQueryResult
    >(
      this.appTypeormConnection,
      DiarioPreferenciaAgrupamentoEntity,
      { ...config, paginateConfig: diarioPreferenciaAgrupamentoPaginateConfig },
      dto,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.findById(accessContext, { id } as DiarioPreferenciaAgrupamentoFindOneQuery);
  }

  create(data: Record<string, unknown>) {
    return typeormCreate(this.appTypeormConnection, DiarioPreferenciaAgrupamentoEntity, data);
  }

  update(id: string | number, data: Record<string, unknown>) {
    return typeormUpdate(this.appTypeormConnection, DiarioPreferenciaAgrupamentoEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      DiarioPreferenciaAgrupamentoEntity,
      config.alias,
      id,
    );
  }

  /**
   * @deprecated Usado para verificações de permissão. Será removido em fases futuras.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity> {
    return this.appTypeormConnection
      .getRepository(DiarioPreferenciaAgrupamentoEntity)
      .createQueryBuilder(alias);
  }

  async softDeleteByDiarioId(diarioId: string): Promise<void> {
    await this.appTypeormConnection
      .getRepository(DiarioPreferenciaAgrupamentoEntity)
      .createQueryBuilder()
      .update(DiarioPreferenciaAgrupamentoEntity)
      .set({ dateDeleted: getNow() })
      .where("id_diario_fk = :diarioId AND date_deleted IS NULL", { diarioId })
      .execute();
  }

  async bulkCreate(
    entries: Array<{
      diarioId: string;
      dataInicio: string;
      dataFim?: string | null;
      diaSemanaIso: number;
      aulasSeguidas: number;
    }>,
  ): Promise<void> {
    if (entries.length === 0) return;

    const repo = this.appTypeormConnection.getRepository(DiarioPreferenciaAgrupamentoEntity);
    const now = getNow();
    const entities = entries.map((p) => {
      const entity = new DiarioPreferenciaAgrupamentoEntity();
      entity.id = generateUuidV7();
      entity.dataInicio = new Date(p.dataInicio);
      entity.dataFim = p.dataFim ? new Date(p.dataFim) : null;
      entity.diaSemanaIso = p.diaSemanaIso;
      entity.aulasSeguidas = p.aulasSeguidas;
      Object.assign(entity, { diario: { id: p.diarioId } });
      entity.dateCreated = now;
      entity.dateUpdated = now;
      entity.dateDeleted = null;
      return entity;
    });
    await repo.save(entities);
  }
}
