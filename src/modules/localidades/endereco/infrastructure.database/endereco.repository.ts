import type { IAccessContext } from "@/domain/abstractions";
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
import type { IEndereco } from "@/modules/localidades/endereco/domain/endereco";
import type {
  EnderecoFindOneQuery,
  EnderecoFindOneQueryResult,
  EnderecoListQuery,
  EnderecoListQueryResult,
} from "@/modules/localidades/endereco/domain/queries";
import type { IEnderecoRepository } from "@/modules/localidades/endereco/domain/repositories";
import { EnderecoEntity, EnderecoTypeormMapper } from "./typeorm";

const config = {
  alias: "endereco",
} as const;

const enderecoPaginateConfig: ITypeOrmPaginationConfig<EnderecoEntity> = {
  ...paginateConfig,
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

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: EnderecoListQuery | null = null,
  ) {
    return typeormFindAll<EnderecoEntity, EnderecoListQuery, EnderecoListQueryResult>(
      this.appTypeormConnection,
      EnderecoEntity,
      { ...config, paginateConfig: enderecoPaginateConfig },
      this.paginationAdapter,
      dto,
      EnderecoTypeormMapper.entityToOutput.map,
    );
  }

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: EnderecoFindOneQuery) {
    return typeormFindById<EnderecoEntity, EnderecoFindOneQuery, EnderecoFindOneQueryResult>(
      this.appTypeormConnection,
      EnderecoEntity,
      { ...config, paginateConfig: enderecoPaginateConfig },
      dto,
      EnderecoTypeormMapper.entityToOutput.map,
    );
  }

  findByIdSimple(accessContext: IAccessContext | null, id: string) {
    return this.getFindOneQueryResult(accessContext, { id } as EnderecoFindOneQuery);
  }

  async findOneById(id: string): Promise<EnderecoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(EnderecoEntity);
    const endereco = await repo.findOne({
      where: { id },
      relations: ["cidade", "cidade.estado"],
    });

    if (!endereco) return null;
    return EnderecoTypeormMapper.entityToOutput.map(endereco);
  }

  async exists(id: string): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(EnderecoEntity);
    return repo.exists({ where: { id } });
  }

  create(data: Partial<IEndereco>) {
    const entityData = EnderecoTypeormMapper.domainToPersistence.map(data as IEndereco);
    return typeormCreate(this.appTypeormConnection, EnderecoEntity, entityData);
  }

  update(id: string | number, data: Partial<IEndereco>) {
    const entityData = EnderecoTypeormMapper.domainToPersistence.map(data as IEndereco);
    return typeormUpdate(this.appTypeormConnection, EnderecoEntity, id, entityData);
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, EnderecoEntity, config.alias, id);
  }
}
