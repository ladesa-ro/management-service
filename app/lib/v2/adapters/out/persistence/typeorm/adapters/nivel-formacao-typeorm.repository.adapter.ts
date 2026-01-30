import { Injectable } from "@nestjs/common";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type {
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
} from "@/v2/server/modules/nivel-formacao/http/dto";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { INivelFormacaoRepositoryPort } from "@/v2/core/nivel-formacao/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { NivelFormacaoEntity } from "../typeorm/entities";

@Injectable()
export class NivelFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    NivelFormacaoEntity,
    NivelFormacaoListInputDto,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneInputDto,
    NivelFormacaoFindOneOutputDto
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
