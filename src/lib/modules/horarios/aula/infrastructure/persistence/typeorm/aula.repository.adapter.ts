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
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
} from "@/modules/horarios/aula/application/dtos";
import type { IAulaRepositoryPort } from "@/modules/horarios/aula/application/ports";
import type { AulaEntity } from "./aula.entity";
import { createAulaRepository } from "./aula.repository";

@Injectable()
export class AulaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    AulaEntity,
    AulaListInputDto,
    AulaListOutputDto,
    AulaFindOneInputDto,
    AulaFindOneOutputDto
  >
  implements IAulaRepositoryPort
{
  protected readonly alias = "aula";
  protected readonly authzAction = "aula:find";
  protected readonly outputDtoName = "AulaFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createAulaRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<AulaEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "formato",
        "data",
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
        "diario.id",
        "diario.ativo",
        "ambiente.id",
        "ambiente.nome",
      ],
      sortableColumns: ["data", "formato", "diario.ativo", "ambiente.nome"],
      relations: {
        ambiente: true,
        diario: true,
        intervaloDeTempo: true,
      },
      searchableColumns: ["id", "formato", "data", "ambiente.nome"],
      defaultSortBy: [],
      filterableColumns: {
        "intervaloDeTempo.id": [FilterOperator.EQ],
        "diario.id": [FilterOperator.EQ],
        "ambiente.id": [FilterOperator.EQ],
      },
    };
  }
}
