import { Injectable } from "@nestjs/common";
import type { DeepPartial } from "typeorm";
import type {
  EnderecoFindOneInput,
  EnderecoFindOneOutput,
  EnderecoInputDto,
  EnderecoListInput,
  EnderecoListOutput,
  IEnderecoRepositoryPort,
} from "@/core/endereco";
import type { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";

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

  protected getPaginateConfig(): IPaginationConfig<EnderecoEntity> {
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
}
