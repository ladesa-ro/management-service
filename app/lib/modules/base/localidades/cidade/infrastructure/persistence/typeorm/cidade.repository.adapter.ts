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
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
  ICidadeRepositoryPort,
} from "@/modules/base/localidades/cidade";
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
    CidadeListInputDto,
    CidadeListOutputDto,
    CidadeFindOneInputDto,
    CidadeFindOneOutputDto
  >
  implements ICidadeRepositoryPort
{
  protected readonly alias = "cidade";
  protected readonly authzAction = "cidade:find";
  protected readonly outputDtoName = "CidadeFindOneOutputDto";

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
