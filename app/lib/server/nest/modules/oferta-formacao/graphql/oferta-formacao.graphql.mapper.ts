import {
  OfertaFormacaoCreateInput,
  OfertaFormacaoFindOneInput,
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoListInput,
  OfertaFormacaoListOutput,
  OfertaFormacaoUpdateInput,
} from "@/modules/oferta-formacao";
import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "../rest/oferta-formacao.rest.dto";
import {
  OfertaFormacaoListInputGqlDto,
  OfertaFormacaoListOutputGqlDto,
} from "./oferta-formacao.graphql.dto";

export class OfertaFormacaoGraphqlMapper {
  static toListInput(dto: OfertaFormacaoListInputGqlDto | null): OfertaFormacaoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.modalidade.id"] = dto.filterModalidadeId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): OfertaFormacaoFindOneInput {
    const input = new OfertaFormacaoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: OfertaFormacaoCreateInputDto): OfertaFormacaoCreateInput {
    const input = new OfertaFormacaoCreateInput();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.modalidade = { id: dto.modalidade.id };
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: OfertaFormacaoUpdateInputDto,
  ): OfertaFormacaoFindOneInput & OfertaFormacaoUpdateInput {
    const input = new OfertaFormacaoFindOneInput() as OfertaFormacaoFindOneInput &
      OfertaFormacaoUpdateInput;
    input.id = id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    if (dto.modalidade !== undefined) {
      input.modalidade = { id: dto.modalidade.id };
    }
    return input;
  }

  static toFindOneOutputDto(output: OfertaFormacaoFindOneOutput): OfertaFormacaoFindOneOutputDto {
    const dto = new OfertaFormacaoFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.modalidade = output.modalidade as any;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: OfertaFormacaoListOutput): OfertaFormacaoListOutputGqlDto {
    const dto = new OfertaFormacaoListOutputGqlDto();
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
