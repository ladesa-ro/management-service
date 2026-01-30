import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { IAmbienteRepositoryPort } from "@/core/ambiente/application/ports";
import type {
  AmbienteFindOneInput as AmbienteFindOneInputDto,
  AmbienteFindOneOutput as AmbienteFindOneOutputDto,
  AmbienteListInput as AmbienteListInputDto,
  AmbienteListOutput as AmbienteListOutputDto,
} from "@/core/ambiente";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { AmbienteEntity } from "../typeorm/entities";

/**
 * Adapter TypeORM que implementa o port de repositório de Ambiente.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações CRUD comuns.
 */
@Injectable()
export class AmbienteTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    AmbienteEntity,
    AmbienteListInputDto,
    AmbienteListOutputDto,
    AmbienteFindOneInputDto,
    AmbienteFindOneOutputDto
  >
  implements IAmbienteRepositoryPort
{
  protected readonly alias = "ambiente";
  protected readonly authzAction = "ambiente:find";
  protected readonly outputDtoName = "AmbienteFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.ambienteRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<AmbienteEntity> {
    return {
      select: [
        "id",
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
        "dateCreated",
        "bloco.id",
        "bloco.campus.id",
      ],
      relations: {
        bloco: {
          campus: true,
        },
      },
      sortableColumns: [
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
        "dateCreated",
        "bloco.id",
        "bloco.campus.id",
      ],
      searchableColumns: ["id", "nome", "descricao", "codigo", "capacidade", "tipo"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "bloco.id": [FilterOperator.EQ],
        "bloco.campus.id": [FilterOperator.EQ],
      },
    };
  }
}
