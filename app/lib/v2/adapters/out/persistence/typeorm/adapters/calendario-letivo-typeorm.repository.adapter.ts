import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  CalendarioLetivoFindOneInput,
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoListInput,
  CalendarioLetivoListOutput,
  ICalendarioLetivoRepositoryPort,
} from "@/core/calendario-letivo";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { CalendarioLetivoEntity } from "../typeorm/entities";
import type { ITypeOrmPaginationConfig } from "../types";

@Injectable()
export class CalendarioLetivoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CalendarioLetivoEntity,
    CalendarioLetivoListInput,
    CalendarioLetivoListOutput,
    CalendarioLetivoFindOneInput,
    CalendarioLetivoFindOneOutput
  >
  implements ICalendarioLetivoRepositoryPort
{
  protected readonly alias = "calendarioLetivo";
  protected readonly authzAction = "calendario_letivo:find";
  protected readonly outputDtoName = "CalendarioLetivoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.calendarioLetivoRepository;
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
