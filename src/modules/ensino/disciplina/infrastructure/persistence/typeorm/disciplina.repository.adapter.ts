import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
} from "@/modules/ensino/disciplina/application/dtos";
import type { IDisciplinaRepositoryPort } from "@/modules/ensino/disciplina/application/ports";
import type { DisciplinaEntity } from "./disciplina.entity";
import { createDisciplinaRepository } from "./disciplina.repository";

@Injectable()
export class DisciplinaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DisciplinaEntity,
    DisciplinaListInputDto,
    DisciplinaListOutputDto,
    DisciplinaFindOneInputDto,
    DisciplinaFindOneOutputDto
  >
  implements IDisciplinaRepositoryPort
{
  protected readonly alias = "disciplina";
  protected readonly authzAction = "disciplina:find";
  protected readonly outputDtoName = "DisciplinaFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDisciplinaRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DisciplinaEntity> {
    return {
      ...paginateConfig,
      relations: { diarios: true },
      select: ["id", "nome", "nomeAbreviado", "cargaHoraria"],
      sortableColumns: ["nome", "cargaHoraria"],
      searchableColumns: ["id", "nome", "nomeAbreviado", "cargaHoraria"],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {
        "diarios.id": [FilterOperator.EQ, FilterOperator.NULL, FilterSuffix.NOT],
      },
    };
  }
}
