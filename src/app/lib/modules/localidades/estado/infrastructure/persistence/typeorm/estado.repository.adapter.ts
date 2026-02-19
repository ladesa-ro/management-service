import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/modules/localidades/estado/application/dtos";
import type { IEstadoRepositoryPort } from "@/modules/localidades/estado/application/ports";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { EstadoEntity } from "./estado.entity";
import { createEstadoRepository } from "./estado.repository";

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
  protected readonly outputDtoName = "EstadoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createEstadoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<EstadoEntity> {
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
