import { Injectable } from "@nestjs/common";
import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import type {
  DisciplinaFindOneInput,
  DisciplinaFindOneOutput,
  DisciplinaListInput,
  DisciplinaListOutput,
} from "@/core/disciplina/application/dtos";
import type { IDisciplinaRepositoryPort } from "@/core/disciplina/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { DisciplinaEntity } from "../typeorm/entities";
import type { ITypeOrmPaginationConfig } from "../types";

@Injectable()
export class DisciplinaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DisciplinaEntity,
    DisciplinaListInput,
    DisciplinaListOutput,
    DisciplinaFindOneInput,
    DisciplinaFindOneOutput
  >
  implements IDisciplinaRepositoryPort
{
  protected readonly alias = "disciplina";
  protected readonly authzAction = "disciplina:find";
  protected readonly outputDtoName = "DisciplinaFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.disciplinaRepository;
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
