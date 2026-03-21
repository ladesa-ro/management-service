import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
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
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult,
} from "@/modules/ensino/diario";
import type { IDiarioPreferenciaAgrupamentoRepository } from "@/modules/ensino/diario/domain/repositories";
import { DiarioPreferenciaAgrupamentoEntity } from "./typeorm/diario-preferencia-agrupamento.typeorm.entity";

const config = {
  alias: "diario_preferencia_agrupamento",
  outputDtoName: "DiarioPreferenciaAgrupamentoFindOneQueryResult",
  hasSoftDelete: true,
} as const;

const diarioPreferenciaAgrupamentoPaginateConfig: ITypeOrmPaginationConfig<DiarioPreferenciaAgrupamentoEntity> =
  {
    ...paginateConfig,
    relations: {
      diario: true,
      intervaloDeTempo: true,
    },
    select: [
      "id",
      "diaSemanaIso",
      "aulasSeguidas",
      "dataInicio",
      "dataFim",
      "diario.id",
      "diario.ativo",
      "intervaloDeTempo.id",
      "intervaloDeTempo.periodoInicio",
      "intervaloDeTempo.periodoFim",
    ],
    sortableColumns: [
      "diaSemanaIso",
      "aulasSeguidas",
      "dataInicio",
      "dataFim",
      "diario.id",
      "intervaloDeTempo.id",
    ],
    searchableColumns: ["id", "diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim"],
    defaultSortBy: [],
    filterableColumns: {
      "diario.id": [FilterOperator.EQ],
    },
  };

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
    accessContext: unknown,
    dto: DiarioPreferenciaAgrupamentoListQuery | null = null,
    selection?: string[] | boolean | null,
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
      selection,
    );
  }

  findById(
    accessContext: unknown,
    dto: DiarioPreferenciaAgrupamentoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<
      DiarioPreferenciaAgrupamentoEntity,
      DiarioPreferenciaAgrupamentoFindOneQuery,
      DiarioPreferenciaAgrupamentoFindOneQueryResult
    >(this.appTypeormConnection, DiarioPreferenciaAgrupamentoEntity, config, dto, selection);
  }

  findByIdSimple(accessContext: unknown, id: string, selection?: string[] | boolean | null) {
    return this.findById(
      accessContext,
      { id } as DiarioPreferenciaAgrupamentoFindOneQuery,
      selection,
    );
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, DiarioPreferenciaAgrupamentoEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
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
      .set({ dateDeleted: new Date() })
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
    const now = new Date();
    const entities = entries.map((p) => {
      const entity = new DiarioPreferenciaAgrupamentoEntity();
      entity.id = generateUuidV7();
      entity.dataInicio = new Date(p.dataInicio);
      entity.dataFim = p.dataFim ? new Date(p.dataFim) : null;
      entity.diaSemanaIso = p.diaSemanaIso;
      entity.aulasSeguidas = p.aulasSeguidas;
      (entity as any).diario = { id: p.diarioId };
      entity.dateCreated = now;
      entity.dateUpdated = now;
      entity.dateDeleted = null;
      return entity;
    });
    await repo.save(entities);
  }
}
