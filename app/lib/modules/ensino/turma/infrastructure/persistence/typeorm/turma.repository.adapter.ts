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
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
} from "@/modules/ensino/turma/application/dtos";
import type { ITurmaRepositoryPort } from "@/modules/ensino/turma/application/ports";
import type { TurmaEntity } from "./turma.entity";
import { createTurmaRepository } from "./turma.repository";

@Injectable()
export class TurmaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    TurmaEntity,
    TurmaListInputDto,
    TurmaListOutputDto,
    TurmaFindOneInputDto,
    TurmaFindOneOutputDto
  >
  implements ITurmaRepositoryPort
{
  protected readonly alias = "turma";
  protected readonly authzAction = "turma:find";
  protected readonly outputDtoName = "TurmaFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createTurmaRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<TurmaEntity> {
    return {
      ...paginateConfig,
      select: ["id", "periodo"],
      sortableColumns: [
        "periodo",
        "ambientePadraoAula.nome",
        "ambientePadraoAula.descricao",
        "ambientePadraoAula.codigo",
        "ambientePadraoAula.capacidade",
        "ambientePadraoAula.tipo",
        "curso.nome",
        "curso.nomeAbreviado",
        "curso.campus.id",
        "curso.modalidade.id",
        "curso.modalidade.nome",
      ],
      relations: {
        curso: {
          campus: true,
        },
        ambientePadraoAula: true,
      },
      searchableColumns: ["id", "periodo"],
      defaultSortBy: [["periodo", "ASC"]],
      filterableColumns: {
        "ambientePadraoAula.nome": [FilterOperator.EQ],
        "ambientePadraoAula.codigo": [FilterOperator.EQ],
        "ambientePadraoAula.capacidade": [
          FilterOperator.EQ,
          FilterOperator.GT,
          FilterOperator.GTE,
          FilterOperator.LT,
          FilterOperator.LTE,
        ],
        "ambientePadraoAula.tipo": [FilterOperator.EQ],
        "curso.id": [FilterOperator.EQ],
        "curso.nome": [FilterOperator.EQ],
        "curso.nomeAbreviado": [FilterOperator.EQ],
        "curso.campus.id": [FilterOperator.EQ],
        "curso.ofertaFormacao.id": [FilterOperator.EQ],
        "curso.ofertaFormacao.nome": [FilterOperator.EQ],
        "curso.ofertaFormacao.slug": [FilterOperator.EQ],
      },
    };
  }
}
