import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import {
  BaseTypeOrmRepositoryAdapter,
  ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
} from "@/@shared/infrastructure/persistence/typeorm";
import { DatabaseContextService } from "@/database-context";
import type {
  ImagemArquivoFindOneInput,
  ImagemArquivoFindOneOutput,
  ImagemArquivoListInput,
  ImagemArquivoListOutput,
} from "@/modules/imagem-arquivo/application/dtos";
import type { IImagemArquivoQueryRepositoryPort } from "@/modules/imagem-arquivo/application/ports";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import type { ImagemArquivoEntity } from "./imagem-arquivo.entity";

/**
 * Adapter TypeORM que implementa o port de repositório de consulta de ImagemArquivo.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 */
@Injectable()
export class ImagemArquivoQueryTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ImagemArquivoEntity,
    ImagemArquivoListInput,
    ImagemArquivoListOutput,
    ImagemArquivoFindOneInput,
    ImagemArquivoFindOneOutput
  >
  implements IImagemArquivoQueryRepositoryPort
{
  protected readonly alias = "imagem_arquivo";
  protected readonly authzAction = "imagem_arquivo:find";
  protected readonly outputDtoName = "ImagemArquivoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.imagemArquivoRepository;
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
