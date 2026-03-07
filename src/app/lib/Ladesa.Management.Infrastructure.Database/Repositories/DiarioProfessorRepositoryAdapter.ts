import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type { IDiarioProfessorRepository } from "@/Ladesa.Management.Application/ensino/diario-professor/application/ports";
import { type DiarioProfessorFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorFindOneInputDto";
import { type DiarioProfessorFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorFindOneOutputDto";
import { type DiarioProfessorListInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorListInputDto";
import { type DiarioProfessorListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioProfessorListOutputDto";
import type { DiarioProfessorEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DiarioProfessorEntity";
import { createDiarioProfessorRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateDiarioProfessorRepository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class DiarioProfessorTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioProfessorEntity,
    DiarioProfessorListInputDto,
    DiarioProfessorListOutputDto,
    DiarioProfessorFindOneInputDto,
    DiarioProfessorFindOneOutputDto
  >
  implements IDiarioProfessorRepository
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
