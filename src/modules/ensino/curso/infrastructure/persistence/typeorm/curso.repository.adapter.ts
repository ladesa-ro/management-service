import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
} from "@/modules/ensino/curso/application/dtos";
import type { ICursoRepositoryPort } from "@/modules/ensino/curso/application/ports";
import type { CursoEntity } from "./curso.entity";
import { createCursoRepository } from "./curso.repository";

@Injectable()
export class CursoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CursoEntity,
    CursoListInputDto,
    CursoListOutputDto,
    CursoFindOneInputDto,
    CursoFindOneOutputDto
  >
  implements ICursoRepositoryPort
{
  protected readonly alias = "curso";
  protected readonly authzAction = "curso:find";
  protected readonly outputDtoName = "CursoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createCursoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<CursoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "nome", "nomeAbreviado", "campus", "ofertaFormacao"],
      sortableColumns: [
        "nome",
        "nomeAbreviado",
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: ["id", "nome", "nomeAbreviado", "campus", "ofertaFormacao"],
      relations: {
        campus: true,
        ofertaFormacao: true,
      },
      defaultSortBy: [["nome", "ASC"]],
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
