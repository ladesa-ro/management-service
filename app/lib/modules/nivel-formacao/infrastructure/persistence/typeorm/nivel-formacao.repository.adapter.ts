import { Injectable } from "@nestjs/common";
import type { ITypeOrmPaginationConfig } from "@/@shared/infrastructure/persistence/typeorm";
import {
  BaseTypeOrmRepositoryAdapter,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  INivelFormacaoRepositoryPort,
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
} from "@/modules/nivel-formacao";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { NivelFormacaoEntity } from "./nivel-formacao.entity";

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

  protected getPaginateConfig(): ITypeOrmPaginationConfig<NivelFormacaoEntity> {
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
