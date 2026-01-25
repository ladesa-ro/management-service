import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { paginateConfig } from "@/infrastructure/fixtures";
import type {
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
} from "@/v2/adapters/in/http/aula/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IAulaRepositoryPort } from "@/v2/core/aula/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { AulaEntity } from "../typeorm/entities";

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

  protected getPaginateConfig(): IPaginationConfig<AulaEntity> {
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
