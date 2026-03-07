import { Inject, Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { DataSource } from "typeorm";
import type { IImagemArquivoQueryRepository } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/application/ports";
import { type ImagemArquivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoFindOneInputDto";
import { type ImagemArquivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoFindOneOutputDto";
import { type ImagemArquivoListInputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoListInputDto";
import { type ImagemArquivoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoListOutputDto";
import type { ImagemArquivoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ImagemArquivoEntity";
import { createImagemArquivoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateImagemArquivoRepository";
import {
  APP_DATA_SOURCE_TOKEN,
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
  implements IImagemArquivoQueryRepository
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
