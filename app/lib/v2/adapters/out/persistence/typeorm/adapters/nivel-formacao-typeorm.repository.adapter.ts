import { Injectable } from "@nestjs/common";
import type {
  INivelFormacaoRepositoryPort,
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
} from "@/core/nivel-formacao";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { NivelFormacaoEntity } from "../typeorm/entities";

@Injectable()
export class NivelFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    NivelFormacaoEntity,
    NivelFormacaoListInput,
    NivelFormacaoListOutput,
    NivelFormacaoFindOneInput,
    NivelFormacaoFindOneOutput
  >
  implements INivelFormacaoRepositoryPort
{
  protected readonly alias = "nivel_formacao";
  protected readonly authzAction = "nivel_formacao:find";
  protected readonly outputDtoName = "NivelFormacaoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.nivelFormacaoRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<NivelFormacaoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "slug", "dateCreated"],
      sortableColumns: ["slug", "dateCreated"],
      searchableColumns: ["id", "slug"],
      defaultSortBy: [
        ["slug", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {},
    };
  }
}
