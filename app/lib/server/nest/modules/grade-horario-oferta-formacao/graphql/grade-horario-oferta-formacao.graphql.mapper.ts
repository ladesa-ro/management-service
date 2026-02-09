import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/modules/grade-horario-oferta-formacao";
import { CampusGraphqlMapper } from "@/server/nest/modules/campus/graphql/campus.graphql.mapper";
import { OfertaFormacaoGraphqlMapper } from "@/server/nest/modules/oferta-formacao/graphql/oferta-formacao.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  GradeHorarioOfertaFormacaoCreateInputGraphQlDto,
  GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto,
  GradeHorarioOfertaFormacaoListInputGraphQlDto,
  GradeHorarioOfertaFormacaoListOutputGraphQlDto,
  GradeHorarioOfertaFormacaoUpdateInputGraphQlDto,
} from "./grade-horario-oferta-formacao.graphql.dto";

export class GradeHorarioOfertaFormacaoGraphqlMapper {
  static toListInput(
    dto: GradeHorarioOfertaFormacaoListInputGraphQlDto | null,
  ): GradeHorarioOfertaFormacaoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new GradeHorarioOfertaFormacaoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(
    id: string,
    selection?: string[],
  ): GradeHorarioOfertaFormacaoFindOneInputDto {
    const input = new GradeHorarioOfertaFormacaoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoCreateInputGraphQlDto,
  ): GradeHorarioOfertaFormacaoCreateInputDto {
    const input = new GradeHorarioOfertaFormacaoCreateInputDto();
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    dto: GradeHorarioOfertaFormacaoUpdateInputGraphQlDto,
  ): GradeHorarioOfertaFormacaoUpdateInputDto {
    const input = new GradeHorarioOfertaFormacaoUpdateInputDto();
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: GradeHorarioOfertaFormacaoFindOneOutputDto,
  ): GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto {
    const dto = new GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.ofertaFormacao = OfertaFormacaoGraphqlMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(
    output: GradeHorarioOfertaFormacaoListOutputDto,
  ): GradeHorarioOfertaFormacaoListOutputGraphQlDto {
    const dto = new GradeHorarioOfertaFormacaoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
