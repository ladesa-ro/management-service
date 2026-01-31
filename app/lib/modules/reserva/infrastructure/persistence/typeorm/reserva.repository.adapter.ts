import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  ReservaFindOneInput,
  ReservaFindOneOutput,
  ReservaListInput,
  ReservaListOutput,
} from "@/modules/reserva/application/dtos";
import type { IReservaRepositoryPort } from "@/modules/reserva/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { ReservaEntity } from "./reserva.entity";

@Injectable()
export class ReservaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ReservaEntity,
    ReservaListInput,
    ReservaListOutput,
    ReservaFindOneInput,
    ReservaFindOneOutput
  >
  implements IReservaRepositoryPort
{
  protected readonly alias = "reserva";
  protected readonly authzAction = "reserva:find";
  protected readonly outputDtoName = "ReservaFindOneOutput";

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
