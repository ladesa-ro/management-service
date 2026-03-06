import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type {
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
} from "@/Ladesa.Management.Application/ambientes/reserva/application/dtos";
import type { IReservaRepositoryPort } from "@/Ladesa.Management.Application/ambientes/reserva/application/ports";
import type { ReservaEntity } from "@/Ladesa.Management.Application/ambientes/reserva/infrastructure/persistence/typeorm/reserva.entity";
import { createReservaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ambientes/reserva/reserva.repository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class ReservaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ReservaEntity,
    ReservaListInputDto,
    ReservaListOutputDto,
    ReservaFindOneInputDto,
    ReservaFindOneOutputDto
  >
  implements IReservaRepositoryPort
{
  protected readonly alias = "reserva";
  protected readonly authzAction = "reserva:find";
  protected readonly outputDtoName = "ReservaFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createReservaRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<ReservaEntity> {
    return {
      ...paginateConfig,
      select: ["id"],
      sortableColumns: [
        "situacao",
        "motivo",
        "tipo",
        "rrule",
        "ambiente.id",
        "ambiente.nome",
        "ambiente.capacidade",
        "ambiente.bloco.codigo",
        "ambiente.bloco.nome",
      ],
      searchableColumns: [
        "id",
        "situacao",
        "motivo",
        "tipo",
        "rrule",
        "ambiente.nome",
        "ambiente.descricao",
        "ambiente.codigo",
        "ambiente.bloco.nome",
        "ambiente.bloco.codigo",
      ],
      relations: {
        ambiente: {
          bloco: {
            campus: true,
          },
        },
        usuario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        situacao: [FilterOperator.EQ],
        tipo: [FilterOperator.EQ],
        "ambiente.id": [FilterOperator.EQ],
        "ambiente.bloco.id": [FilterOperator.EQ],
        "ambiente.bloco.campus.id": [FilterOperator.EQ],
      },
    };
  }
}
