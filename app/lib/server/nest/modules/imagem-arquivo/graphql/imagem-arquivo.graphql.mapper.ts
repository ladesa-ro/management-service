import {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "@/modules/base/armazenamento/imagem-arquivo";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ArquivoFindOneOutputGraphQlDto,
  ImagemArquivoFindOneOutputGraphQlDto,
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
  ImagemFindOneFromImagemArquivoOutputGraphQlDto,
} from "./imagem-arquivo.graphql.dto";

export class ImagemArquivoGraphqlMapper {
  static toListInput(
    dto: ImagemArquivoListInputGraphQlDto | null,
  ): ImagemArquivoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new ImagemArquivoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): ImagemArquivoFindOneInputDto {
    const input = new ImagemArquivoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(
    output: ImagemArquivoFindOneOutputDto,
  ): ImagemArquivoFindOneOutputGraphQlDto {
    const dto = new ImagemArquivoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.largura = output.largura;
    dto.altura = output.altura;
    dto.formato = output.formato;
    dto.mimeType = output.mimeType;

    const imagem = new ImagemFindOneFromImagemArquivoOutputGraphQlDto();
    imagem.id = output.imagem.id;
    dto.imagem = imagem;

    const arquivo = new ArquivoFindOneOutputGraphQlDto();
    arquivo.id = output.arquivo.id;
    arquivo.name = output.arquivo.name;
    arquivo.mimeType = output.arquivo.mimeType;
    arquivo.sizeBytes = output.arquivo.sizeBytes;
    arquivo.storageType = output.arquivo.storageType;
    arquivo.dateCreated = output.arquivo.dateCreated as unknown as Date;
    arquivo.dateUpdated = output.arquivo.dateUpdated as unknown as Date;
    arquivo.dateDeleted = output.arquivo.dateDeleted as unknown as Date | null;
    dto.arquivo = arquivo;

    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: ImagemArquivoListOutputDto): ImagemArquivoListOutputGraphQlDto {
    const dto = new ImagemArquivoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
