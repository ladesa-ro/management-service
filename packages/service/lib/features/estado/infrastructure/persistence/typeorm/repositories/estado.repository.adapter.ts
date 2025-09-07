import { DataSource, Repository } from "typeorm";
import {
  EstadoDatabaseEntity,
  EstadoFindOneByIdOutputDto,
  EstadoListInputDto,
  EstadoListOutputDto,
  EstadoListSettings,
  type IEstadoRepositoryPort
} from "@/features/estado";
import { EfficientLoadAndSelect } from "@/infrastructure/persistence/typeorm/utils";
import { IFilterRuleGroup, ListSettings } from "@/shared";
import {
  baseEntityListRepositoryProvider
} from "@/shared/base-entity/infrastructure/typeorm/base-entity-list.repository.provider";

export class EstadoRepositoryAdapter implements IEstadoRepositoryPort {
  private estadoRepository: Repository<EstadoDatabaseEntity>;

  constructor(dataSource: DataSource) {
    this.estadoRepository = dataSource.getRepository(EstadoDatabaseEntity);
  }

  public async findById(id: number, selection?: string[]): Promise<EstadoFindOneByIdOutputDto | null> {
    const query = this.estadoRepository.createQueryBuilder("estado");

    const consideredSelection = selection && selection.length > 0 ? selection : ["id"];
    EfficientLoadAndSelect(query, consideredSelection);

    query.andWhere("estado.id = :id", {id});
    return query.getOne();
  }

  public async list(allowedFilters: boolean | IFilterRuleGroup, listInputDto: EstadoListInputDto, selection?: string[]): Promise<EstadoListOutputDto> {
    const listSettings: ListSettings = EstadoListSettings;
    const baseRepositoryList = baseEntityListRepositoryProvider(listSettings);

    const query = this.estadoRepository.createQueryBuilder("estado");
    return baseRepositoryList(query, allowedFilters, listInputDto, selection);
  }
}
