import { Injectable } from "@nestjs/common";
import type { DeepPartial } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  EnderecoFindOneInput,
  EnderecoFindOneOutput,
  EnderecoInputDto,
  EnderecoListInput,
  EnderecoListOutput,
  IEnderecoRepositoryPort,
} from "@/modules/endereco";
import type { EnderecoEntity } from "@/modules/endereco/infrastructure/persistence/typeorm";

@Injectable()
export class EnderecoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    EnderecoEntity,
    EnderecoListInput,
    EnderecoListOutput,
    EnderecoFindOneInput,
    EnderecoFindOneOutput
  >
  implements IEnderecoRepositoryPort
{
  protected readonly alias = "endereco";
  protected readonly authzAction = "endereco:find";
  protected readonly outputDtoName = "EnderecoFindOneOutput";

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
  async findOneById(id: string): Promise<EnderecoFindOneOutput | null> {
    const endereco = await this.repository.findOne({
      where: { id },
      relations: ["cidade", "cidade.estado"],
    });

    return endereco as EnderecoFindOneOutput | null;
  }

  async exists(id: string): Promise<boolean> {
    return this.repository.exists({ where: { id } });
  }

  override merge(
    endereco: EnderecoEntity,
    data: EnderecoInputDto | DeepPartial<EnderecoEntity>,
  ): void {
    this.repository.merge(endereco, data as DeepPartial<EnderecoEntity>);
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
