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
  DiarioFindOneQuery,
  DiarioFindOneQueryResult,
  DiarioListQuery,
  DiarioListQueryResult,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioRepository } from "@/modules/ensino/diario/domain/repositories";
import type { DiarioEntity } from "./typeorm/diario.typeorm.entity";
import { createDiarioRepository } from "./typeorm/diario.typeorm.repository";

@DeclareImplementation()
export class DiarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioEntity,
    DiarioListQuery,
    DiarioListQueryResult,
    DiarioFindOneQuery,
    DiarioFindOneQueryResult
  >
  implements IDiarioRepository
{
  protected readonly alias = "diario";
  protected readonly outputDtoName = "DiarioFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDiarioRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DiarioEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "ativo",
        "turma.id",
        "turma.periodo",
        "disciplina.id",
        "disciplina.nome",
        "ambientePadrao.id",
        "ambientePadrao.nome",
      ],
      sortableColumns: ["ativo", "disciplina.nome", "ambientePadrao.nome"],
      relations: {
        turma: true,
        disciplina: true,
        ambientePadrao: true,
      },
      searchableColumns: ["id", "ativo", "ano", "etapa", "turma.periodo", "disciplina.nome"],
      defaultSortBy: [],
      filterableColumns: {
        "turma.id": [FilterOperator.EQ],
        "disciplina.id": [FilterOperator.EQ],
        "ambientePadrao.id": [FilterOperator.EQ],
      },
    };
  }
}
