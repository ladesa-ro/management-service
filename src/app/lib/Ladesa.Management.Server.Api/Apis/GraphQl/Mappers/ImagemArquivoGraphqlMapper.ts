import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
} from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo";
import {
  ArquivoFindOneOutputGraphQlDto,
  ImagemArquivoFindOneOutputGraphQlDto,
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
  ImagemFindOneFromImagemArquivoOutputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/ImagemArquivoGraphqlDto";

export class ImagemArquivoGraphqlMapper {
  static toFindOneInput = createFindOneInputMapper(ImagemArquivoFindOneInputDto);
  static toListOutputDto = createListOutputMapper(
    ImagemArquivoListOutputGraphQlDto,
    ImagemArquivoGraphqlMapper.toFindOneOutputDto,
  );

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
}
