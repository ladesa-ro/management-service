import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.mapper";
import { OfertaFormacaoGraphqlMapper } from "@/modules/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.mapper";
import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/modules/horarios/grade-horario-oferta-formacao";
import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
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

  static toFindOneInput = createFindOneInputMapper(GradeHorarioOfertaFormacaoFindOneInputDto);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    GradeHorarioOfertaFormacaoListOutputGraphQlDto,
    GradeHorarioOfertaFormacaoGraphqlMapper.toFindOneOutputDto,
  );
}
