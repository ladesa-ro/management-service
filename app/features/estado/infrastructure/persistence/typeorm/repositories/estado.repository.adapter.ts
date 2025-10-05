import type { DataSource, Repository } from "typeorm";
import { type EstadoFindOneByIdInputDto, type EstadoFindOneByIdOutputDto, type EstadoListInputDto, type EstadoListOutputDto, EstadoListSettings, type IEstadoRepositoryPort } from "@/features";
import { EstadoDatabaseEntity } from "@/features/estado/infrastructure";
import { baseEntityList, EfficientLoadAndSelect, type IFilterRuleGroup, Inject, Injectable, type ListSettingsEntity } from "@/shared";
import { APP_DATA_SOURCE_TOKEN } from "@/shared/infrastructure/typeorm/data-source.ts";

@Injectable("Singleton")
export class EstadoRepositoryAdapter implements IEstadoRepositoryPort {
  private estadoRepository: Repository<EstadoDatabaseEntity>;

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN)
    dataSource: DataSource,
  ) {
    this.estadoRepository = dataSource.getRepository(EstadoDatabaseEntity);
  }

  public async findOneById(dto: EstadoFindOneByIdInputDto, selection?: string[]): Promise<EstadoFindOneByIdOutputDto | null> {
    const query = this.estadoRepository.createQueryBuilder("estado");
    EfficientLoadAndSelect(query, selection);
    query.andWhere("estado.id = :id", { id: dto.id });
    return query.getOne();
  }

  public async list(allowedFilters: boolean | IFilterRuleGroup, listInputDto: EstadoListInputDto, selection?: string[]): Promise<EstadoListOutputDto> {
    const listSettings: ListSettingsEntity = EstadoListSettings;

    const baseRepositoryList = baseEntityList(listSettings);

    const query = this.estadoRepository.createQueryBuilder("estado");
    return baseRepositoryList(query, allowedFilters, listInputDto, selection);
  }
}
