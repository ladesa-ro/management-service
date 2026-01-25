import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { paginateConfig } from "@/infrastructure/fixtures";
import type {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
} from "@/v2/server/modules/calendario-letivo/http/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { ICalendarioLetivoRepositoryPort } from "@/v2/core/calendario-letivo/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { CalendarioLetivoEntity } from "../typeorm/entities";

@Injectable()
export class CalendarioLetivoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CalendarioLetivoEntity,
    CalendarioLetivoListInputDto,
    CalendarioLetivoListOutputDto,
    CalendarioLetivoFindOneInputDto,
    CalendarioLetivoFindOneOutputDto
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

  protected getPaginateConfig(): IPaginationConfig<CalendarioLetivoEntity> {
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
