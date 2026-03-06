import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type {
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  IDisponibilidadeRepositoryPort,
} from "@/Ladesa.Management.Application/ensino/disponibilidade";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import type { DisponibilidadeEntity } from "./disponibilidade.entity";
import { createDisponibilidadeRepository } from "./disponibilidade.repository";

@Injectable()
export class DisponibilidadeTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    DisponibilidadeEntity,
    DisponibilidadeListInputDto,
    DisponibilidadeListOutputDto,
    DisponibilidadeFindOneInputDto,
    DisponibilidadeFindOneOutputDto
  >
  implements IDisponibilidadeRepositoryPort
{
  protected readonly alias = "disponibilidade";
  protected readonly authzAction = "disponibilidade:find";
  protected readonly outputDtoName = "DisponibilidadeFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createDisponibilidadeRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<DisponibilidadeEntity> {
    return {
      ...paginateConfig,
      select: ["id", "dataInicio", "dataFim", "dateCreated"],
      sortableColumns: ["dataInicio", "dataFim", "dateCreated"],
      searchableColumns: ["id", "dataInicio", "dataFim"],
      defaultSortBy: [
        ["dataInicio", "ASC"],
        ["dataFim", "ASC"],
      ],
      filterableColumns: {},
    };
  }
}
