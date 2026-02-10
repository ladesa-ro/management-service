import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoListInputDto,
  EnderecoListOutputDto,
  IEnderecoRepositoryPort,
} from "@/modules/endereco";
import type { EnderecoEntity } from "@/modules/endereco/infrastructure/persistence/typeorm";

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
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.enderecoRepository;
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
