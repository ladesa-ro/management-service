import {
  ImagemArquivoFindOneInput,
  ImagemArquivoFindOneOutput,
  ImagemArquivoListInput,
  ImagemArquivoListOutput,
} from "@/modules/imagem-arquivo";
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
    return output as any;
  }

  static toListOutputDto(output: ImagemArquivoListOutput): ImagemArquivoListOutputGqlDto {
    const dto = new ImagemArquivoListOutputGqlDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
