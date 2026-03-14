import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  IModalidadeRepository,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
} from "@/modules/ensino/modalidade";
import type { ModalidadeEntity } from "./modalidade.entity";
import { createModalidadeRepository } from "./modalidade.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de Modalidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@DeclareImplementation()
export class ModalidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ModalidadeEntity,
    ModalidadeListInputDto,
    ModalidadeListOutputDto,
    ModalidadeFindOneInputDto,
    ModalidadeFindOneOutputDto
  >
  implements IModalidadeRepository
{
  protected readonly alias = "modalidade";
  protected readonly authzAction = "modalidade:find";
  protected readonly outputDtoName = "ModalidadeFindOneOutputDto";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createModalidadeRepository(this.dataSource);
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
