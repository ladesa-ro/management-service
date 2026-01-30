import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaListInput,
  EtapaListOutput,
  IEtapaRepositoryPort,
} from "@/core/etapa";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { EtapaEntity } from "../typeorm/entities";

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

  protected getPaginateConfig(): IPaginationConfig<EtapaEntity> {
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
