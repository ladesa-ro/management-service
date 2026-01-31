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
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaListInput,
  EtapaListOutput,
  IEtapaRepositoryPort,
} from "@/modules/etapa";
import type { EtapaEntity } from "./etapa.entity";

@Injectable()
export class EtapaTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EtapaEntity,
    EtapaListInput,
    EtapaListOutput,
    EtapaFindOneInput,
    EtapaFindOneOutput
  >
  implements IEtapaRepositoryPort
{
  protected readonly alias = "etapa";
  protected readonly authzAction = "etapa:find";
  protected readonly outputDtoName = "EtapaFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.etapaRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<EtapaEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: ["id", "numero", "dataInicio", "dataTermino", "cor"],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    };
  }
}
