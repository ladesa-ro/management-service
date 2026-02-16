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
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
} from "@/modules/ambientes/reserva/application/dtos";
import type { IReservaRepositoryPort } from "@/modules/ambientes/reserva/application/ports";
import type { ReservaEntity } from "./reserva.entity";

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
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.reservaRepository;
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
