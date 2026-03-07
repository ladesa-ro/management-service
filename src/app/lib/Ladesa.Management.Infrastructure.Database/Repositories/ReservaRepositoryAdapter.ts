import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type { IReservaRepository } from "@/Ladesa.Management.Application/ambientes/reserva/application/ports";
import { type ReservaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneInputDto";
import { type ReservaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneOutputDto";
import { type ReservaListInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaListInputDto";
import { type ReservaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaListOutputDto";
import type { ReservaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ReservaEntity";
import { createReservaRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateReservaRepository";
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
  implements IReservaRepository
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
