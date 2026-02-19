import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "@/modules/@base/armazenamento/imagem-arquivo/application/dtos";
import type { IImagemArquivoQueryRepositoryPort } from "@/modules/@base/armazenamento/imagem-arquivo/application/ports";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { ImagemArquivoEntity } from "./imagem-arquivo.entity";
import { createImagemArquivoRepository } from "./imagem-arquivo.repository";

/**
 * Adapter TypeORM que implementa o port de repositório de consulta de ImagemArquivo.
 * Estende BaseTypeOrmRepositoryAdapter para reutilizar operações de leitura.
 */
@Injectable()
export class ImagemArquivoQueryTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    ImagemArquivoEntity,
    ImagemArquivoListInputDto,
    ImagemArquivoListOutputDto,
    ImagemArquivoFindOneInputDto,
    ImagemArquivoFindOneOutputDto
  >
  implements IImagemArquivoQueryRepositoryPort
{
  protected readonly alias = "imagem_arquivo";
  protected readonly authzAction = "imagem_arquivo:find";
  protected readonly outputDtoName = "ImagemArquivoFindOneOutputDto";

  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) protected readonly dataSource: DataSource,
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
