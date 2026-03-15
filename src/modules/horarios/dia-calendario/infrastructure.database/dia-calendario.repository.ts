import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  DiaCalendarioFindOneQuery as DiaCalendarioFindOneQuery,
  DiaCalendarioFindOneQueryResult as DiaCalendarioFindOneQueryResult,
  DiaCalendarioListQuery as DiaCalendarioListQuery,
  DiaCalendarioListQueryResult as DiaCalendarioListQueryResult,
} from "@/modules/horarios/dia-calendario";
import type { IDiaCalendarioRepository } from "@/modules/horarios/dia-calendario/domain/repositories";
import type { DiaCalendarioEntity } from "./typeorm/dia-calendario.typeorm.entity";
import { createDiaCalendarioRepository } from "./typeorm/dia-calendario.typeorm.repository";

@DeclareImplementation()
export class DiaCalendarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiaCalendarioEntity,
    DiaCalendarioListQuery,
    DiaCalendarioListQueryResult,
    DiaCalendarioFindOneQuery,
    DiaCalendarioFindOneQueryResult
  >
  implements IDiaCalendarioRepository
{
  protected readonly alias = "dia_calendario";
  protected readonly outputDtoName = "DiaCalendarioFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDiaCalendarioRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DiaCalendarioEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
        "diaPresencial",
        "tipo",
        "extraCurricular",
      ],
      sortableColumns: [
        "data",
        "diaLetivo",
        "feriado",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: ["id", "data", "diaLetivo", "feriado", "calendario.nome"],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    };
  }
}
