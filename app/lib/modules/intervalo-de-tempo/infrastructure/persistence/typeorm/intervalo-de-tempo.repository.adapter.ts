import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  IIntervaloDeTempoRepositoryPort,
  IntervaloDeTempoFindOneInput,
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInput,
  IntervaloDeTempoListInput,
  IntervaloDeTempoListOutput,
} from "@/modules/intervalo-de-tempo";
import type { IntervaloDeTempoEntity } from "@/modules/intervalo-de-tempo/infrastructure/persistence/typeorm";

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

  // Custom methods specific to IntervaloDeTempo
  async findOne(domain: IntervaloDeTempoInput): Promise<IntervaloDeTempoFindOneOutput | null> {
    const entity = await this.repository.findOne({
      where: {
        periodoFim: domain.periodoFim,
        periodoInicio: domain.periodoInicio,
      },
    });

    if (!entity) return null;

    return this.findById(null, { id: entity.id });
  }

  async findOneByIdOrFail(id: string): Promise<IntervaloDeTempoFindOneOutput> {
    const result = await this.findById(null, { id });
    if (!result) {
      throw new Error(`IntervaloDeTempo with id ${id} not found`);
    }
    return result;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<IntervaloDeTempoEntity> {
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
}
