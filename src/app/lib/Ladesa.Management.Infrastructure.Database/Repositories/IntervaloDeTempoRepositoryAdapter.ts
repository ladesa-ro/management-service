import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type {
  IIntervaloDeTempoRepository,
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";
import type { IntervaloDeTempoEntity } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/infrastructure/persistence/typeorm/index";
import { createIntervaloDeTempoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateIntervaloDeTempoRepository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class IntervaloDeTempoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    IntervaloDeTempoEntity,
    IntervaloDeTempoListInputDto,
    IntervaloDeTempoListOutputDto,
    IntervaloDeTempoFindOneInputDto,
    IntervaloDeTempoFindOneOutputDto
  >
  implements IIntervaloDeTempoRepository
{
  protected readonly alias = "intervalo_de_tempo";
  protected readonly authzAction = "intervalo_de_tempo:find";
  protected readonly outputDtoName = "IntervaloDeTempoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createIntervaloDeTempoRepository(this.dataSource);
  }

  // Custom methods specific to IntervaloDeTempo
  async findOne(
    domain: IntervaloDeTempoInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto | null> {
    const entity = await this.repository.findOne({
      where: {
        periodoFim: domain.periodoFim,
        periodoInicio: domain.periodoInicio,
      },
    });

    if (!entity) return null;

    return this.findById(null, { id: entity.id });
  }

  async findOneByIdOrFail(id: string): Promise<IntervaloDeTempoFindOneOutputDto> {
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
