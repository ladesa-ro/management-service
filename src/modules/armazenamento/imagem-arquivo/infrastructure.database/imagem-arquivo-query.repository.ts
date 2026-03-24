import { FilterOperator } from "nestjs-paginate";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { paginateConfig } from "@/infrastructure.database/pagination/config/paginate-config";
import type { ITypeOrmPaginationConfig } from "@/infrastructure.database/pagination/interfaces/pagination-config.types";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import type {
  ImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult,
  ImagemArquivoListQuery,
  ImagemArquivoListQueryResult,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries";
import type { IImagemArquivoQueryRepository } from "@/modules/armazenamento/imagem-arquivo/domain/repositories";
import { ImagemArquivoEntity } from "./typeorm/imagem-arquivo.typeorm.entity";

const config = {
  alias: "imagem_arquivo",
  hasSoftDelete: true,
} as const;

const imagemArquivoPaginateConfig: ITypeOrmPaginationConfig<ImagemArquivoEntity> = {
  ...paginateConfig,
  relations: {
    imagem: true,
    arquivo: true,
  },
  sortableColumns: ["id", "dateCreated"],
  searchableColumns: ["id"],
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    id: [FilterOperator.EQ],
    "imagem.id": [FilterOperator.EQ],
  },
};

@DeclareImplementation()
export class ImagemArquivoQueryTypeOrmRepositoryAdapter implements IImagemArquivoQueryRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  findAll(accessContext: IAccessContext | null, dto: ImagemArquivoListQuery | null = null) {
    return typeormFindAll<
      ImagemArquivoEntity,
      ImagemArquivoListQuery,
      ImagemArquivoListQueryResult
    >(
      this.appTypeormConnection,
      ImagemArquivoEntity,
      { ...config, paginateConfig: imagemArquivoPaginateConfig },
      this.paginationAdapter,
      dto,
    );
  }

  findById(accessContext: IAccessContext | null, dto: ImagemArquivoFindOneQuery) {
    return typeormFindById<
      ImagemArquivoEntity,
      ImagemArquivoFindOneQuery,
      ImagemArquivoFindOneQueryResult
    >(
      this.appTypeormConnection,
      ImagemArquivoEntity,
      { ...config, paginateConfig: imagemArquivoPaginateConfig },
      dto,
    );
  }
}
