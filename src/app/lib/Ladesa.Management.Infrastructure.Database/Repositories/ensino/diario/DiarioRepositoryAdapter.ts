import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type {
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
} from "@/Ladesa.Management.Application/ensino/diario/application/dtos";
import type { IDiarioRepositoryPort } from "@/Ladesa.Management.Application/ensino/diario/application/ports";
import type { DiarioEntity } from "@/Ladesa.Management.Application/ensino/diario/infrastructure/persistence/typeorm/diario.entity";
import { createDiarioRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/diario/diario.repository";
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
  implements IDiarioRepositoryPort
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
