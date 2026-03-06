import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type {
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
} from "@/Ladesa.Management.Application/ensino/disciplina/application/dtos";
import type { IDisciplinaRepositoryPort } from "@/Ladesa.Management.Application/ensino/disciplina/application/ports";
import type { DisciplinaEntity } from "@/Ladesa.Management.Application/ensino/disciplina/infrastructure/persistence/typeorm/disciplina.entity";
import { createDisciplinaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/disciplina/disciplina.repository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
