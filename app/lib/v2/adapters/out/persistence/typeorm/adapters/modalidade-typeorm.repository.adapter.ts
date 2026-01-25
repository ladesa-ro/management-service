import { Injectable } from "@nestjs/common";
import { paginateConfig } from "@/infrastructure/fixtures";
import type {
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
} from "@/v2/adapters/in/http/modalidade/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IModalidadeRepositoryPort } from "@/v2/core/modalidade/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { ModalidadeEntity } from "../typeorm/entities";

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

  protected getPaginateConfig(): IPaginationConfig<ModalidadeEntity> {
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
