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
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
} from "@/modules/ensino/diario-professor/application/dtos";
import type { IDiarioProfessorRepositoryPort } from "@/modules/ensino/diario-professor/application/ports";
import type { DiarioProfessorEntity } from "./diario-professor.entity";
import { createDiarioProfessorRepository } from "./diario-professor.repository";

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
  protected readonly outputDtoName = "DiarioProfessorFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
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
