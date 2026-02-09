import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/modules/grade-horario-oferta-formacao";
import { CampusRestMapper } from "@/server/nest/modules/campus/rest";
import { OfertaFormacaoRestMapper } from "@/server/nest/modules/oferta-formacao/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  GradeHorarioOfertaFormacaoCreateInputRestDto,
  GradeHorarioOfertaFormacaoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoListInputRestDto,
  GradeHorarioOfertaFormacaoListOutputRestDto,
  GradeHorarioOfertaFormacaoUpdateInputRestDto,
} from "./grade-horario-oferta-formacao.rest.dto";

export class GradeHorarioOfertaFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(
    dto: GradeHorarioOfertaFormacaoFindOneInputRestDto,
  ): GradeHorarioOfertaFormacaoFindOneInputDto {
    const input = new GradeHorarioOfertaFormacaoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: GradeHorarioOfertaFormacaoListInputRestDto | null,
  ): GradeHorarioOfertaFormacaoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new GradeHorarioOfertaFormacaoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoCreateInputRestDto,
  ): GradeHorarioOfertaFormacaoCreateInputDto {
    const input = new GradeHorarioOfertaFormacaoCreateInputDto();
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: GradeHorarioOfertaFormacaoFindOneInputRestDto,
    dto: GradeHorarioOfertaFormacaoUpdateInputRestDto,
  ): GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto {
    const input =
      new GradeHorarioOfertaFormacaoFindOneInputDto() as GradeHorarioOfertaFormacaoFindOneInputDto &
        GradeHorarioOfertaFormacaoUpdateInputDto;
    input.id = params.id;
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: GradeHorarioOfertaFormacaoFindOneOutputDto,
  ): GradeHorarioOfertaFormacaoFindOneOutputRestDto {
    const dto = new GradeHorarioOfertaFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: GradeHorarioOfertaFormacaoListOutputDto,
  ): GradeHorarioOfertaFormacaoListOutputRestDto {
    const dto = new GradeHorarioOfertaFormacaoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
