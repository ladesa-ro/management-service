import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  BlocoFindOneInput,
  BlocoFindOneOutput,
  BlocoListInput,
  BlocoListOutput,
} from "@/modules/bloco";
import type { IBlocoRepositoryPort } from "@/modules/bloco/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { BlocoEntity } from "./bloco.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de Bloco.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class BlocoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    BlocoEntity,
    BlocoListInput,
    BlocoListOutput,
    BlocoFindOneInput,
    BlocoFindOneOutput
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

  protected getPaginateConfig(): ITypeOrmPaginationConfig<BlocoEntity> {
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
