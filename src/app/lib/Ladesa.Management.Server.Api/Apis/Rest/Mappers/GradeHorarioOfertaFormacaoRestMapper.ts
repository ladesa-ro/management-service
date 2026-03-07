import {
  createFindOneInputMapper,
  createListInputMapper,
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
  GradeHorarioOfertaFormacaoCreateInputRestDto,
  GradeHorarioOfertaFormacaoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoListOutputRestDto,
  GradeHorarioOfertaFormacaoUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/GradeHorarioOfertaFormacaoRestDto";
import { CampusRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/CampusRestMapper";
import { OfertaFormacaoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/OfertaFormacaoRestMapper";

export class GradeHorarioOfertaFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(GradeHorarioOfertaFormacaoFindOneInputDto);

  static toListInput = createListInputMapper(GradeHorarioOfertaFormacaoListInputDto, ["filter.id"]);
  static toListOutputDto = createListOutputMapper(
    GradeHorarioOfertaFormacaoListOutputRestDto,
    GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto,
  );

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoCreateInputRestDto,
  ): GradeHorarioOfertaFormacaoCreateInputDto {
    const input = new GradeHorarioOfertaFormacaoCreateInputDto();
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

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
}
