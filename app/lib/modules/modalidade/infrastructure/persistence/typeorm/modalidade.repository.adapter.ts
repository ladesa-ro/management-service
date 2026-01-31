import { Injectable } from "@nestjs/common";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  IModalidadeRepositoryPort,
  ModalidadeFindOneInput,
  ModalidadeFindOneOutput,
  ModalidadeListInput,
  ModalidadeListOutput,
} from "@/modules/modalidade";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { ModalidadeEntity } from "./modalidade.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de Modalidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class ModalidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ModalidadeEntity,
    ModalidadeListInput,
    ModalidadeListOutput,
    ModalidadeFindOneInput,
    ModalidadeFindOneOutput
  >
  implements IModalidadeRepositoryPort
{
  protected readonly alias = "modalidade";
  protected readonly authzAction = "modalidade:find";
  protected readonly outputDtoName = "ModalidadeFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.modalidadeRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<ModalidadeEntity> {
    return {
      ...paginateConfig,
      select: ["id", "nome", "slug", "dateCreated"],
      sortableColumns: ["nome", "slug", "dateCreated"],
      searchableColumns: ["id", "nome", "slug"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {},
    };
  }
}
