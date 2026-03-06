import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type {
  EstadoFindOneInputDto,
  EstadoFindOneOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
} from "@/Ladesa.Management.Application/localidades/estado/application/dtos";
import type { IEstadoRepositoryPort } from "@/Ladesa.Management.Application/localidades/estado/application/ports";
import type { EstadoEntity } from "@/Ladesa.Management.Application/localidades/estado/infrastructure/persistence/typeorm/estado.entity";
import { createEstadoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/localidades/estado/estado.repository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
