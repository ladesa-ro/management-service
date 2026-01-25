import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { paginateConfig } from "@/infrastructure/fixtures";
import type {
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
} from "@/v2/adapters/in/http/diario-professor/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IDiarioProfessorRepositoryPort } from "@/v2/core/diario-professor/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { DiarioProfessorEntity } from "../typeorm/entities";

@Injectable()
export class DiarioProfessorTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioProfessorEntity,
    DiarioProfessorListInputDto,
    DiarioProfessorListOutputDto,
    DiarioProfessorFindOneInputDto,
    DiarioProfessorFindOneOutputDto
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

  protected getPaginateConfig(): IPaginationConfig<DiarioProfessorEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "situacao",
        "diario.id",
        "perfil.id",
        "perfil.campus.id",
        "perfil.usuario.id",
      ],
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
