import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  AulaFindOneInput,
  AulaFindOneOutput,
  AulaListInput,
  AulaListOutput,
} from "@/modules/aula/application/dtos";
import type { IAulaRepositoryPort } from "@/modules/aula/application/ports";
import type { AulaEntity } from "./aula.entity";

@Injectable()
export class AulaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    AulaEntity,
    AulaListInput,
    AulaListOutput,
    AulaFindOneInput,
    AulaFindOneOutput
  >
  implements IAulaRepositoryPort
{
  protected readonly alias = "aula";
  protected readonly authzAction = "aula:find";
  protected readonly outputDtoName = "AulaFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.aulaRepository;
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
