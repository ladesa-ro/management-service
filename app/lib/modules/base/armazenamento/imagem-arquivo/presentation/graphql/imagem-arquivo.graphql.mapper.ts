import {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
} from "@/modules/base/armazenamento/imagem-arquivo";
import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
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

  static toFindOneInput = createFindOneInputMapper(ImagemArquivoFindOneInputDto);

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
    mapDatedFields(arquivo, output.arquivo);
    dto.arquivo = arquivo;

    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    ImagemArquivoListOutputGraphQlDto,
    ImagemArquivoGraphqlMapper.toFindOneOutputDto,
  );
}
