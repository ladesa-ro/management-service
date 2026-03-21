import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  BaseTypeOrmRepositoryAdapter,
  IAppTypeormConnection,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult,
  DisciplinaListQuery,
  DisciplinaListQueryResult,
} from "@/modules/ensino/disciplina/domain/queries";
import type { IDisciplinaRepository } from "@/modules/ensino/disciplina/domain/repositories";
import type { DisciplinaEntity } from "./typeorm/disciplina.typeorm.entity";
import { createDisciplinaRepository } from "./typeorm/disciplina.typeorm.repository";

@DeclareImplementation()
export class DisciplinaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DisciplinaEntity,
    DisciplinaListQuery,
    DisciplinaListQueryResult,
    DisciplinaFindOneQuery,
    DisciplinaFindOneQueryResult
  >
  implements IDisciplinaRepository
{
  protected readonly alias = "disciplina";
  protected readonly outputDtoName = "DisciplinaFindOneQueryResult";

  constructor(
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDisciplinaRepository(this.appTypeormConnection);
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
