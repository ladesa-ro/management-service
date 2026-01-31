import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  CidadeFindOneInput,
  CidadeFindOneOutput,
  CidadeListInput,
  CidadeListOutput,
  ICidadeRepositoryPort,
} from "@/modules/cidade";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { CidadeEntity } from "./cidade.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de Cidade.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 * Cidade é um recurso somente leitura (dados do IBGE).
 */
@Injectable()
export class CidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CidadeEntity,
    CidadeListInput,
    CidadeListOutput,
    CidadeFindOneInput,
    CidadeFindOneOutput
  >
  implements ICidadeRepositoryPort
{
  protected readonly alias = "cidade";
  protected readonly authzAction = "cidade:find";
  protected readonly outputDtoName = "CidadeFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.cidadeRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<CidadeEntity> {
    return {
      ...paginateConfig,
      select: ["id", "nome", "estado.id", "estado.sigla", "estado.nome"],
      relations: {
        estado: true,
      },
      sortableColumns: ["id", "nome", "estado.nome", "estado.sigla"],
      searchableColumns: ["nome", "estado.nome", "estado.sigla"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["estado.nome", "ASC"],
      ],
      filterableColumns: {
        "estado.id": [FilterOperator.EQ],
        "estado.nome": [FilterOperator.EQ],
        "estado.sigla": [FilterOperator.EQ],
      },
    };
  }
}
