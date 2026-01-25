import { Injectable } from "@nestjs/common";
import { paginateConfig } from "@/infrastructure/fixtures";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/v2/adapters/in/http/estado/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IEstadoRepositoryPort } from "@/v2/core/estado/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { EstadoEntity } from "../typeorm/entities";

/**
 * Adapter TypeORM que implementa o port de repositório de Estado.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 * Estado é um recurso somente leitura (dados do IBGE).
 */
@Injectable()
export class EstadoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EstadoEntity,
    EstadoListInputDto,
    EstadoListOutputDto,
    EstadoFindOneInputDto,
    EstadoFindOneOutputDto
  >
  implements IEstadoRepositoryPort
{
  protected readonly alias = "estado";
  protected readonly authzAction = "estado:find";
  protected readonly outputDtoName = "EstadoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.estadoRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<EstadoEntity> {
    return {
      ...paginateConfig,
      select: ["id"],
      searchableColumns: ["nome", "sigla"],
      sortableColumns: ["id", "nome", "sigla"],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {},
    };
  }
}
