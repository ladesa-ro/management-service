import {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorUpdateInputDto,
} from "@/modules/ensino/diario-professor";
import { DiarioRestMapper } from "@/server/nest/modules/diario/rest";
import { PerfilRestMapper } from "@/server/nest/modules/perfil/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  DiarioProfessorCreateInputRestDto,
  DiarioProfessorFindOneInputRestDto,
  DiarioProfessorFindOneOutputRestDto,
  DiarioProfessorListOutputRestDto,
  DiarioProfessorUpdateInputRestDto,
} from "./diario-professor.rest.dto";

export class DiarioProfessorRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(DiarioProfessorFindOneInputDto);

  static toListInput = createListInputMapper(DiarioProfessorListInputDto, [
    "filter.id",
    "filter.diario.id",
    "filter.perfil.id",
    "filter.perfil.usuario.id",
  ]);

  static toCreateInput(dto: DiarioProfessorCreateInputRestDto): DiarioProfessorCreateInputDto {
    const input = new DiarioProfessorCreateInputDto();
    input.situacao = dto.situacao;
    input.diario = { id: dto.diario.id };
    input.perfil = { id: dto.perfil.id };
    return input;
  }

  static toUpdateInput(
    params: DiarioProfessorFindOneInputRestDto,
    dto: DiarioProfessorUpdateInputRestDto,
  ): DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto {
    const input = new DiarioProfessorFindOneInputDto() as DiarioProfessorFindOneInputDto &
      DiarioProfessorUpdateInputDto;
    input.id = params.id;
    if (dto.situacao !== undefined) {
      input.situacao = dto.situacao;
    }
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    if (dto.perfil !== undefined) {
      input.perfil = { id: dto.perfil.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: DiarioProfessorFindOneOutputDto,
  ): DiarioProfessorFindOneOutputRestDto {
    const dto = new DiarioProfessorFindOneOutputRestDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    dto.perfil = PerfilRestMapper.toFindOneOutputDto(output.perfil);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioProfessorListOutputRestDto,
    DiarioProfessorRestMapper.toFindOneOutputDto,
  );
}
