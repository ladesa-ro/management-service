import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type { IDisciplinaRepository } from "@/Ladesa.Management.Application/ensino/disciplina/application/ports";
import { type DisciplinaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneInputDto";
import { type DisciplinaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneOutputDto";
import { type DisciplinaListInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaListInputDto";
import { type DisciplinaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaListOutputDto";
import type { DisciplinaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DisciplinaEntity";
import { createDisciplinaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateDisciplinaRepository";
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
  implements IDisciplinaRepository
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
