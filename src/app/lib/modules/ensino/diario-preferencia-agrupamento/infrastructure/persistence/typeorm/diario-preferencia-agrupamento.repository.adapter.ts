import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { SelectQueryBuilder } from "typeorm";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoListOutputDto,
} from "@/modules/ensino/diario-preferencia-agrupamento";
import type { IDiarioPreferenciaAgrupamentoRepositoryPort } from "@/modules/ensino/diario-preferencia-agrupamento/application/ports/out";
import type { DiarioPreferenciaAgrupamentoEntity } from "./diario-preferencia-agrupamento.entity";
import { createDiarioPreferenciaAgrupamentoRepository } from "./diario-preferencia-agrupamento.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de DiarioPreferenciaAgrupamento.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class DiarioPreferenciaAgrupamentoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioPreferenciaAgrupamentoEntity,
    DiarioPreferenciaAgrupamentoListInputDto,
    DiarioPreferenciaAgrupamentoListOutputDto,
    DiarioPreferenciaAgrupamentoFindOneInputDto,
    DiarioPreferenciaAgrupamentoFindOneOutputDto
  >
  implements IDiarioPreferenciaAgrupamentoRepositoryPort
{
  protected readonly alias = "diario_preferencia_agrupamento";
  protected readonly authzAction = "diario_preferencia_agrupamento:find";
  protected readonly outputDtoName = "DiarioPreferenciaAgrupamentoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDiarioPreferenciaAgrupamentoRepository(this.dataSource);
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
