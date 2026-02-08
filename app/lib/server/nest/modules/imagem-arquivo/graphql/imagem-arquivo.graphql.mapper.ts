import {
  ImagemArquivoFindOneInput,
  ImagemArquivoFindOneOutput,
  ImagemArquivoListInput,
  ImagemArquivoListOutput,
} from "@/modules/imagem-arquivo";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { ImagemArquivoFindOneOutputDto } from "../rest/imagem-arquivo.rest.dto";
import {
  ImagemArquivoListInputGqlDto,
  ImagemArquivoListOutputGqlDto,
} from "./imagem-arquivo.graphql.dto";

export class ImagemArquivoGraphqlMapper {
  static toListInput(dto: ImagemArquivoListInputGqlDto | null): ImagemArquivoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new ImagemArquivoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): ImagemArquivoFindOneInput {
    const input = new ImagemArquivoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: ImagemArquivoFindOneOutput): ImagemArquivoFindOneOutputDto {
    return output as unknown as ImagemArquivoFindOneOutputDto;
  }

  static toListOutputDto(output: ImagemArquivoListOutput): ImagemArquivoListOutputGqlDto {
    const dto = new ImagemArquivoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
