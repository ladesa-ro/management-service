import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
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
import { imagemArquivoPaginationSpec } from "@/modules/armazenamento/imagem-arquivo/domain/queries";
import type { IImagemArquivoQueryRepository } from "@/modules/armazenamento/imagem-arquivo/domain/repositories";
import { ImagemArquivoEntity } from "./typeorm/imagem-arquivo.typeorm.entity";

const config = {
  alias: "imagem_arquivo",
} as const;

const imagemArquivoRelations = {
  imagem: true,
  arquivo: true,
};

const imagemArquivoPaginateConfig = buildTypeOrmPaginateConfig<ImagemArquivoEntity>(
  imagemArquivoPaginationSpec,
  imagemArquivoRelations,
);

@DeclareImplementation()
export class ImagemArquivoQueryTypeOrmRepositoryAdapter implements IImagemArquivoQueryRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: ImagemArquivoListQuery | null = null,
  ) {
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

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: ImagemArquivoFindOneQuery) {
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
