import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  ReservaFindOneInput,
  ReservaFindOneOutput,
  ReservaListInput,
  ReservaListOutput,
} from "@/core/reserva/application/dtos";
import type { IReservaRepositoryPort } from "@/core/reserva/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { ReservaEntity } from "../typeorm/entities";
import type { ITypeOrmPaginationConfig } from "../types";

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
