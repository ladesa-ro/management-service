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
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoListQueryResult,
  ICalendarioLetivoRepository,
} from "@/modules/horarios/calendario-letivo";
import type { CalendarioLetivoEntity } from "./typeorm/calendario-letivo.typeorm.entity";
import { createCalendarioLetivoRepository } from "./typeorm/calendario-letivo.typeorm.repository";

@DeclareImplementation()
export class CalendarioLetivoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CalendarioLetivoEntity,
    CalendarioLetivoListQuery,
    CalendarioLetivoListQueryResult,
    CalendarioLetivoFindOneQuery,
    CalendarioLetivoFindOneQueryResult
  >
  implements ICalendarioLetivoRepository
{
  protected readonly alias = "calendario_letivo";
  protected readonly outputDtoName = "CalendarioLetivoFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createCalendarioLetivoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<CalendarioLetivoEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "ano",
        "campus",
        "ofertaFormacao",
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      sortableColumns: [
        "nome",
        "ano",
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: ["id", "nome", "ano", "campus", "ofertaFormacao"],
      relations: {
        campus: true,
        ofertaFormacao: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "campus.cnpj": [FilterOperator.EQ],
        "campus.razaoSocial": [FilterOperator.EQ],
        "campus.nomeFantasia": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.nome": [FilterOperator.EQ],
        "ofertaFormacao.slug": [FilterOperator.EQ],
      },
    };
  }
}
