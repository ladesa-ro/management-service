import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoListInputDto,
  EnderecoListOutputDto,
  IEnderecoRepositoryPort,
} from "@/Ladesa.Management.Application/localidades/endereco";
import type { EnderecoEntity } from "@/Ladesa.Management.Application/localidades/endereco/infrastructure/persistence/typeorm/index";
import { createEnderecoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/localidades/endereco/endereco.repository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class EnderecoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EnderecoEntity,
    EnderecoListInputDto,
    EnderecoListOutputDto,
    EnderecoFindOneInputDto,
    EnderecoFindOneOutputDto
  >
  implements IEnderecoRepositoryPort
{
  protected readonly alias = "endereco";
  protected readonly authzAction = "endereco:find";
  protected readonly outputDtoName = "EnderecoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createEnderecoRepository(this.dataSource);
  }

  // Custom method for internal lookup
  async findOneById(id: string): Promise<EnderecoFindOneOutputDto | null> {
    const endereco = await this.repository.findOne({
      where: { id },
      relations: ["cidade", "cidade.estado"],
    });

    return endereco as EnderecoFindOneOutputDto | null;
  }

  async exists(id: string): Promise<boolean> {
    return this.repository.exists({ where: { id } });
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<EnderecoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "cep", "logradouro", "numero", "bairro", "dateCreated"],
      relations: {
        cidade: {
          estado: true,
        },
      },
      sortableColumns: ["cep", "logradouro", "dateCreated"],
      searchableColumns: ["id", "cep", "logradouro", "bairro"],
      defaultSortBy: [
        ["logradouro", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "cidade.id": true,
      },
    };
  }
}
