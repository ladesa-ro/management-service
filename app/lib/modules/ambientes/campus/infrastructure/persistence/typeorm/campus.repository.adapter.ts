import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  ICampusRepositoryPort,
} from "@/modules/ambientes/campus";
import type { CampusEntity } from "./campus.entity";
import { createCampusRepository } from "./campus.repository";

@Injectable()
export class CampusTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CampusEntity,
    CampusListInputDto,
    CampusListOutputDto,
    CampusFindOneInputDto,
    CampusFindOneOutputDto
  >
  implements ICampusRepositoryPort
{
  protected readonly alias = "campus";
  protected readonly authzAction = "campus:find";
  protected readonly outputDtoName = "CampusFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createCampusRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<CampusEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        "endereco.cidade.id",
        "endereco.cidade.nome",
        "endereco.cidade.estado.id",
        "endereco.cidade.estado.nome",
        "endereco.cidade.estado.sigla",
      ],
      relations: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
      sortableColumns: [
        "id",
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        "endereco.cidade.id",
        "endereco.cidade.nome",
        "endereco.cidade.estado.id",
        "endereco.cidade.estado.nome",
        "endereco.cidade.estado.sigla",
      ],
      searchableColumns: [
        "id",
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        "endereco.cidade.nome",
        "endereco.cidade.estado.nome",
        "endereco.cidade.estado.sigla",
      ],
      defaultSortBy: [
        ["nomeFantasia", "ASC"],
        ["endereco.cidade.estado.nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "endereco.cidade.id": [FilterOperator.EQ],
        "endereco.cidade.nome": [FilterOperator.EQ],
        "endereco.cidade.estado.id": [FilterOperator.EQ],
        "endereco.cidade.estado.nome": [FilterOperator.EQ],
        "endereco.cidade.estado.sigla": [FilterOperator.EQ],
      },
    };
  }
}
