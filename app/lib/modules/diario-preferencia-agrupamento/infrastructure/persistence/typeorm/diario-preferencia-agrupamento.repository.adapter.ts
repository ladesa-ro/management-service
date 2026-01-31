import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import type { ITypeOrmPaginationConfig } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  DiarioPreferenciaAgrupamentoFindOneInput,
  DiarioPreferenciaAgrupamentoFindOneOutput,
  DiarioPreferenciaAgrupamentoListInput,
  DiarioPreferenciaAgrupamentoListOutput,
} from "@/modules/diario-preferencia-agrupamento";
import type { IDiarioPreferenciaAgrupamentoRepositoryPort } from "@/modules/diario-preferencia-agrupamento/application/ports/out";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { DiarioPreferenciaAgrupamentoEntity } from "./diario-preferencia-agrupamento.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de DiarioPreferenciaAgrupamento.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioPreferenciaAgrupamentoEntity,
    DiarioPreferenciaAgrupamentoListInput,
    DiarioPreferenciaAgrupamentoListOutput,
    DiarioPreferenciaAgrupamentoFindOneInput,
    DiarioPreferenciaAgrupamentoFindOneOutput
  >
  implements IDiarioPreferenciaAgrupamentoRepositoryPort
{
  protected readonly alias = "diario_preferencia_agrupamento";
  protected readonly authzAction = "diario_preferencia_agrupamento:find";
  protected readonly outputDtoName = "DiarioPreferenciaAgrupamentoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.diarioPreferenciaAgrupamentoRepository;
  }

  /**
   * @deprecated Usado para verificações de permissão. Será removido em fases futuras.
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<DiarioPreferenciaAgrupamentoEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DiarioPreferenciaAgrupamentoEntity> {
    return {
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
  }
}
