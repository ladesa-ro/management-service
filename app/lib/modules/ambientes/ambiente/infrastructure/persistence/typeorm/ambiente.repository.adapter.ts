import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DatabaseContextService } from "@/modules/@database-context";
import type { ITypeOrmPaginationConfig } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  AmbienteFindOneInputDto as AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto as AmbienteFindOneOutputDto,
  AmbienteListInputDto as AmbienteListInputDto,
  AmbienteListOutputDto as AmbienteListOutputDto,
} from "@/modules/ambientes/ambiente";
import type { IAmbienteRepositoryPort } from "@/modules/ambientes/ambiente/application/ports";
import type { AmbienteEntity } from "./ambiente.entity";

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
  protected readonly outputDtoName = "AmbienteFindOneOutputDto";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.ambienteRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<AmbienteEntity> {
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
