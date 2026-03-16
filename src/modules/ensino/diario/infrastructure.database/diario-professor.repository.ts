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
  DiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult,
  DiarioProfessorListQuery,
  DiarioProfessorListQueryResult,
} from "@/modules/ensino/diario/domain/queries";
import type { IDiarioProfessorRepository } from "@/modules/ensino/diario/domain/repositories";
import type { DiarioProfessorEntity } from "./typeorm/diario-professor.typeorm.entity";
import { createDiarioProfessorRepository } from "./typeorm/diario-professor.typeorm.repository";

@DeclareImplementation()
export class DiarioProfessorTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioProfessorEntity,
    DiarioProfessorListQuery,
    DiarioProfessorListQueryResult,
    DiarioProfessorFindOneQuery,
    DiarioProfessorFindOneQueryResult
  >
  implements IDiarioProfessorRepository
{
  protected readonly alias = "diario_professor";
  protected readonly outputDtoName = "DiarioProfessorFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDiarioProfessorRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DiarioProfessorEntity> {
    return {
      ...paginateConfig,
      select: ["id", "situacao", "diario.id", "perfil.id", "perfil.campus.id", "perfil.usuario.id"],
      relations: {
        diario: true,
        perfil: {
          campus: true,
          usuario: true,
        },
      },
      sortableColumns: ["situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
      searchableColumns: ["id", "situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
      defaultSortBy: [],
      filterableColumns: {
        "perfil.usuario.id": FilterOperator.EQ,
        "perfil.id": FilterOperator.EQ,
        "diario.id": FilterOperator.EQ,
      },
    };
  }
}
