import {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/modules/sisgha/grade-horario-oferta-formacao";
import { CampusRestMapper } from "@/server/nest/modules/campus/rest";
import { OfertaFormacaoRestMapper } from "@/server/nest/modules/oferta-formacao/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  GradeHorarioOfertaFormacaoCreateInputRestDto,
  GradeHorarioOfertaFormacaoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoListOutputRestDto,
  GradeHorarioOfertaFormacaoUpdateInputRestDto,
} from "./grade-horario-oferta-formacao.rest.dto";

export class GradeHorarioOfertaFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(GradeHorarioOfertaFormacaoFindOneInputDto);

  static toListInput = createListInputMapper(GradeHorarioOfertaFormacaoListInputDto, ["filter.id"]);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    GradeHorarioOfertaFormacaoListOutputRestDto,
    GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto,
  );
}
