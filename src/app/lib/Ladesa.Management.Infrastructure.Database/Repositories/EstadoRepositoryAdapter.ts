import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { IEstadoRepository } from "@/Ladesa.Management.Application/localidades/estado/application/ports";
import { type EstadoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneInputDto";
import { type EstadoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneOutputDto";
import { type EstadoListInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListInputDto";
import { type EstadoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListOutputDto";
import type { EstadoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/EstadoEntity";
import { createEstadoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateEstadoRepository";
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
  implements IEstadoRepository
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
