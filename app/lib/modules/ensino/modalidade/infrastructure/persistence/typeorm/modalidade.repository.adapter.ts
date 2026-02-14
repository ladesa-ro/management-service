import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  IModalidadeRepositoryPort,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
} from "@/modules/ensino/modalidade";
import type { ModalidadeEntity } from "./modalidade.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de Modalidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class ModalidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ModalidadeEntity,
    ModalidadeListInputDto,
    ModalidadeListOutputDto,
    ModalidadeFindOneInputDto,
    ModalidadeFindOneOutputDto
  >
  implements IModalidadeRepositoryPort
{
  protected readonly alias = "modalidade";
  protected readonly authzAction = "modalidade:find";
  protected readonly outputDtoName = "ModalidadeFindOneOutputDto";

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
