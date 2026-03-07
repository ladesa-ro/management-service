import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type { IDiarioRepository } from "@/Ladesa.Management.Application/ensino/diario/application/ports";
import { type DiarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneInputDto";
import { type DiarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneOutputDto";
import { type DiarioListInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioListInputDto";
import { type DiarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioListOutputDto";
import type { DiarioEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DiarioEntity";
import { createDiarioRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateDiarioRepository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class DiarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DiarioEntity,
    DiarioListInputDto,
    DiarioListOutputDto,
    DiarioFindOneInputDto,
    DiarioFindOneOutputDto
  >
  implements IDiarioRepository
{
  protected readonly alias = "diario";
  protected readonly authzAction = "diario:find";
  protected readonly outputDtoName = "DiarioFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
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
