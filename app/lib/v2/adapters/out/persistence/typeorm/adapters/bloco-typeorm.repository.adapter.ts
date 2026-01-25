import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { paginateConfig } from "@/infrastructure/fixtures";
import type {
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
} from "@/v2/server/modules/bloco/http/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IBlocoRepositoryPort } from "@/v2/core/bloco/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { BlocoEntity } from "../typeorm/entities";

/**
 * Adapter TypeORM que implementa o port de repositório de Bloco.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class BlocoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    BlocoEntity,
    BlocoListInputDto,
    BlocoListOutputDto,
    BlocoFindOneInputDto,
    BlocoFindOneOutputDto
  >
  implements IBlocoRepositoryPort
{
  protected readonly alias = "bloco";
  protected readonly authzAction = "bloco:find";
  protected readonly outputDtoName = "BlocoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.blocoRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<BlocoEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "nome",
        "codigo",
        "dateCreated",
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      relations: {
        campus: true,
      },
      sortableColumns: [
        "nome",
        "codigo",
        "dateCreated",
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      searchableColumns: ["id", "nome", "codigo"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
      },
    };
  }
}
