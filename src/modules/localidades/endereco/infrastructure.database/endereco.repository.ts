import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  BaseTypeOrmRepositoryAdapter,
  IAppTypeormConnection,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  EnderecoFindOneQuery,
  EnderecoFindOneQueryResult,
  EnderecoListQuery,
  EnderecoListQueryResult,
  IEnderecoRepository,
} from "@/modules/localidades/endereco";
import type { EnderecoEntity } from "@/modules/localidades/endereco/infrastructure.database/typeorm";
import { createEnderecoRepository } from "./typeorm/endereco.typeorm.repository";

@DeclareImplementation()
export class EnderecoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EnderecoEntity,
    EnderecoListQuery,
    EnderecoListQueryResult,
    EnderecoFindOneQuery,
    EnderecoFindOneQueryResult
  >
  implements IEnderecoRepository
{
  protected readonly alias = "endereco";
  protected readonly outputDtoName = "EnderecoFindOneQueryResult";

  constructor(
    @DeclareDependency(IAppTypeormConnection)
    protected readonly appTypeormConnection: IAppTypeormConnection,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createEnderecoRepository(this.appTypeormConnection);
  }

  // Custom method for internal lookup
  async findOneById(id: string): Promise<EnderecoFindOneQueryResult | null> {
    const endereco = await this.repository.findOne({
      where: { id },
      relations: ["cidade", "cidade.estado"],
    });

    return endereco as EnderecoFindOneQueryResult | null;
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
