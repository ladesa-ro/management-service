import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormCreate,
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
  typeormUpdate,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  EnderecoFindOneQuery,
  EnderecoFindOneQueryResult,
  EnderecoListQuery,
  EnderecoListQueryResult,
} from "@/modules/localidades/endereco/domain/queries";
import type { IEnderecoRepository } from "@/modules/localidades/endereco/domain/repositories";
import { EnderecoEntity } from "./typeorm/endereco.typeorm.entity";

const config = {
  alias: "endereco",
  outputDtoName: "EnderecoFindOneQueryResult",
} as const;

const enderecoPaginateConfig: ITypeOrmPaginationConfig<EnderecoEntity> = {
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

@DeclareImplementation()
export class EnderecoTypeOrmRepositoryAdapter implements IEnderecoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(
    accessContext: unknown,
    dto: EnderecoListQuery | null = null,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindAll<EnderecoEntity, EnderecoListQuery, EnderecoListQueryResult>(
      this.appTypeormConnection,
      EnderecoEntity,
      { ...config, paginateConfig: enderecoPaginateConfig },
      this.paginationAdapter,
      dto,
      selection,
    );
  }

  findById(
    accessContext: unknown,
    dto: EnderecoFindOneQuery,
    selection?: string[] | boolean | null,
  ) {
    return typeormFindById<EnderecoEntity, EnderecoFindOneQuery, EnderecoFindOneQueryResult>(
      this.appTypeormConnection,
      EnderecoEntity,
      config,
      dto,
      selection,
    );
  }

  findByIdSimple(accessContext: unknown, id: string, selection?: string[] | boolean | null) {
    return this.findById(accessContext, { id } as EnderecoFindOneQuery, selection);
  }

  async findOneById(id: string): Promise<EnderecoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(EnderecoEntity);
    const endereco = await repo.findOne({
      where: { id },
      relations: ["cidade", "cidade.estado"],
    });

    return endereco as EnderecoFindOneQueryResult | null;
  }

  async exists(id: string): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(EnderecoEntity);
    return repo.exists({ where: { id } });
  }

  create(data: Record<string, any>) {
    return typeormCreate(this.appTypeormConnection, EnderecoEntity, data);
  }

  update(id: string | number, data: Record<string, any>) {
    return typeormUpdate(this.appTypeormConnection, EnderecoEntity, id, data);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, EnderecoEntity, config.alias, id);
  }
}
