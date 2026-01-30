import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  CampusFindOneInput,
  CampusFindOneOutput,
  CampusListInput,
  CampusListOutput,
  ICampusRepositoryPort,
} from "@/core/campus";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { CampusEntity } from "../typeorm/entities";

@Injectable()
export class CampusTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    CampusEntity,
    CampusListInput,
    CampusListOutput,
    CampusFindOneInput,
    CampusFindOneOutput
  >
  implements ICampusRepositoryPort
{
  protected readonly alias = "campus";
  protected readonly authzAction = "campus:find";
  protected readonly outputDtoName = "CampusFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.campusRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<CampusEntity> {
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
