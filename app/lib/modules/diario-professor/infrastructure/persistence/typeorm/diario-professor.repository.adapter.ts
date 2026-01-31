import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DatabaseContextService } from "@/modules/@database-context";
import type { ITypeOrmPaginationConfig } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  DiarioProfessorFindOneInput,
  DiarioProfessorFindOneOutput,
  DiarioProfessorListInput,
  DiarioProfessorListOutput,
} from "@/modules/diario-professor/application/dtos";
import type { IDiarioProfessorRepositoryPort } from "@/modules/diario-professor/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { DiarioProfessorEntity } from "./diario-professor.entity";

@Injectable()
export class DiarioProfessorTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioProfessorEntity,
    DiarioProfessorListInput,
    DiarioProfessorListOutput,
    DiarioProfessorFindOneInput,
    DiarioProfessorFindOneOutput
  >
  implements IDiarioProfessorRepositoryPort
{
  protected readonly alias = "diario_professor";
  protected readonly authzAction = "diario_professor:find";
  protected readonly outputDtoName = "DiarioProfessorFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.diarioProfessorRepository;
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
