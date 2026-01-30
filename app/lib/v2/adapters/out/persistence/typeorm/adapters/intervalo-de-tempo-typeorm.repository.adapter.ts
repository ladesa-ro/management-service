import { Injectable } from "@nestjs/common";
import type {
  IIntervaloDeTempoRepositoryPort,
  IntervaloDeTempoFindOneInput,
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInput,
  IntervaloDeTempoListInput,
  IntervaloDeTempoListOutput,
} from "@/core/intervalo-de-tempo";
import type { IntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";

@Injectable()
export class IntervaloDeTempoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    IntervaloDeTempoEntity,
    IntervaloDeTempoListInput,
    IntervaloDeTempoListOutput,
    IntervaloDeTempoFindOneInput,
    IntervaloDeTempoFindOneOutput
  >
  implements IIntervaloDeTempoRepositoryPort
{
  protected readonly alias = "intervalo_de_tempo";
  protected readonly authzAction = "intervalo_de_tempo:find";
  protected readonly outputDtoName = "IntervaloDeTempoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.intervaloDeTempoRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<IntervaloDeTempoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "periodoInicio", "periodoFim", "dateCreated"],
      sortableColumns: ["periodoInicio", "periodoFim", "dateCreated"],
      searchableColumns: ["id"],
      defaultSortBy: [
        ["periodoInicio", "ASC"],
        ["periodoFim", "ASC"],
      ],
      filterableColumns: {},
    };
  }

  // Custom methods specific to IntervaloDeTempo
  async findOne(domain: IntervaloDeTempoInput): Promise<IntervaloDeTempoEntity | null> {
    return this.repository.findOne({
      where: {
        periodoFim: domain.periodoFim,
        periodoInicio: domain.periodoInicio,
      },
    });
  }

  async findOneByIdOrFail(id: string): Promise<IntervaloDeTempoEntity> {
    return this.repository.findOneByOrFail({ id });
  }
}
