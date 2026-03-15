import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  ImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult,
  ImagemArquivoListQuery,
  ImagemArquivoListQueryResult,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries";
import type { IImagemArquivoQueryRepository } from "@/modules/armazenamento/imagem-arquivo/domain/repositories";
import type { ImagemArquivoEntity } from "./typeorm/imagem-arquivo.typeorm.entity";
import { createImagemArquivoRepository } from "./typeorm/imagem-arquivo.typeorm.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de consulta de ImagemArquivo.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 */

@DeclareImplementation()
export class ImagemArquivoQueryTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ImagemArquivoEntity,
    ImagemArquivoListQuery,
    ImagemArquivoListQueryResult,
    ImagemArquivoFindOneQuery,
    ImagemArquivoFindOneQueryResult
  >
  implements IImagemArquivoQueryRepository
{
  protected readonly alias = "imagem_arquivo";
  protected readonly outputDtoName = "ImagemArquivoFindOneQueryResult";

  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return createImagemArquivoRepository(this.dataSource);
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<ImagemArquivoEntity> {
    return {
      ...paginateConfig,
      select: [
        "id",
        "largura",
        "altura",
        "formato",
        "mimeType",
        "dateCreated",
        "dateUpdated",
        "dateDeleted",
      ],
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
  }
}
