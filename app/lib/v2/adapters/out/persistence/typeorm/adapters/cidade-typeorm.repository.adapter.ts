import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { ICidadeRepositoryPort } from "@/v2/core/cidade/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/v2/server/modules/cidade/http/dto";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { CidadeEntity } from "../typeorm/entities";

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

  protected getPaginateConfig(): IPaginationConfig<CidadeEntity> {
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
