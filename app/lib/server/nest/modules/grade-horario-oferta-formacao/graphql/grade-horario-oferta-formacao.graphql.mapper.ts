import {
  GradeHorarioOfertaFormacaoCreateInput,
  GradeHorarioOfertaFormacaoFindOneInput,
  GradeHorarioOfertaFormacaoFindOneOutput,
  GradeHorarioOfertaFormacaoListInput,
  GradeHorarioOfertaFormacaoListOutput,
  GradeHorarioOfertaFormacaoUpdateInput,
} from "@/modules/grade-horario-oferta-formacao";
import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "../rest/grade-horario-oferta-formacao.rest.dto";
import {
  GradeHorarioOfertaFormacaoListInputGqlDto,
  GradeHorarioOfertaFormacaoListOutputGqlDto,
} from "./grade-horario-oferta-formacao.graphql.dto";

export class GradeHorarioOfertaFormacaoGraphqlMapper {
  static toListInput(
    dto: GradeHorarioOfertaFormacaoListInputGqlDto | null,
  ): GradeHorarioOfertaFormacaoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new GradeHorarioOfertaFormacaoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): GradeHorarioOfertaFormacaoFindOneInput {
    const input = new GradeHorarioOfertaFormacaoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): GradeHorarioOfertaFormacaoCreateInput {
    return dto as unknown as GradeHorarioOfertaFormacaoCreateInput;
  }

  static toUpdateInput(
    dto: GradeHorarioOfertaFormacaoUpdateInputDto,
  ): GradeHorarioOfertaFormacaoUpdateInput {
    return dto as unknown as GradeHorarioOfertaFormacaoUpdateInput;
  }

  static toFindOneOutputDto(
    output: GradeHorarioOfertaFormacaoFindOneOutput,
  ): GradeHorarioOfertaFormacaoFindOneOutputDto {
    return output as unknown as GradeHorarioOfertaFormacaoFindOneOutputDto;
  }

  static toListOutputDto(
    output: GradeHorarioOfertaFormacaoListOutput,
  ): GradeHorarioOfertaFormacaoListOutputGqlDto {
    const dto = new GradeHorarioOfertaFormacaoListOutputGqlDto();
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
