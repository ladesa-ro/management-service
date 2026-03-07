import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import {
  GradeHorarioOfertaFormacaoCreateInputGraphQlDto,
  GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto,
  GradeHorarioOfertaFormacaoListInputGraphQlDto,
  GradeHorarioOfertaFormacaoListOutputGraphQlDto,
  GradeHorarioOfertaFormacaoUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/GradeHorarioOfertaFormacaoGraphqlDto";
import { CampusGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/CampusGraphqlMapper";
import { OfertaFormacaoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/OfertaFormacaoGraphqlMapper";

export class GradeHorarioOfertaFormacaoGraphqlMapper {
  static toFindOneInput = createFindOneInputMapper(GradeHorarioOfertaFormacaoFindOneInputDto);
  static toListOutputDto = createListOutputMapper(
    GradeHorarioOfertaFormacaoListOutputGraphQlDto,
    GradeHorarioOfertaFormacaoGraphqlMapper.toFindOneOutputDto,
  );

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
}
