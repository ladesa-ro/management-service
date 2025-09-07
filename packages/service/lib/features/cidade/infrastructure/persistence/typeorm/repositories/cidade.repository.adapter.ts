import { DataSource, Repository } from "typeorm";
import {
  CidadeDatabaseEntity,
  CidadeFindOneByIdOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
  CidadeListSettings,
  type ICidadeRepositoryPort
} from "@/features/cidade";
import { EfficientLoadAndSelect } from "@/infrastructure/persistence/typeorm/utils";
import { IFilterRuleGroup, ListSettings } from "@/shared";
import {
  baseEntityListRepositoryProvider
} from "@/shared/base-entity/infrastructure/typeorm/base-entity-list.repository.provider";

export class CidadeRepositoryAdapter implements ICidadeRepositoryPort {
  private cidadeRepository: Repository<CidadeDatabaseEntity>;

  constructor(dataSource: DataSource) {
    this.cidadeRepository = dataSource.getRepository(CidadeDatabaseEntity);
  }

  public async findById(id: number, selection?: string[]): Promise<CidadeFindOneByIdOutputDto | null> {
    const query = this.cidadeRepository.createQueryBuilder("cidade");

    const consideredSelection = selection && selection.length > 0 ? selection : ["id"];
    EfficientLoadAndSelect(query, consideredSelection);

    query.andWhere("cidade.id = :id", {id});
    return query.getOne();
  }

  public async list(allowedFilters: boolean | IFilterRuleGroup, listInputDto: CidadeListInputDto, selection?: string[]): Promise<CidadeListOutputDto> {
    const listSettings: ListSettings = CidadeListSettings;
    const baseRepositoryList = baseEntityListRepositoryProvider(listSettings);

    const query = this.cidadeRepository.createQueryBuilder("cidade");
    return baseRepositoryList(query, allowedFilters, listInputDto, selection);
  }
}
