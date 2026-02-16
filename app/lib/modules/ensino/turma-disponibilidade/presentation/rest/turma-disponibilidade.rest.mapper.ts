import { DisponibilidadeRestMapper } from "@/modules/ensino/disponibilidade/presentation/rest";
import { TurmaRestMapper } from "@/modules/ensino/turma/presentation/rest";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "@/modules/ensino/turma-disponibilidade";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  TurmaDisponibilidadeCreateInputRestDto,
  TurmaDisponibilidadeFindOneInputRestDto,
  TurmaDisponibilidadeFindOneOutputRestDto,
  TurmaDisponibilidadeListOutputRestDto,
  TurmaDisponibilidadeUpdateInputRestDto,
} from "./turma-disponibilidade.rest.dto";

export class TurmaDisponibilidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(TurmaDisponibilidadeFindOneInputDto);

  static toListInput = createListInputMapper(TurmaDisponibilidadeListInputDto, ["filter.id"]);

  static toCreateInput(
    dto: TurmaDisponibilidadeCreateInputRestDto,
  ): TurmaDisponibilidadeCreateInputDto {
    const input = new TurmaDisponibilidadeCreateInputDto();
    input.disponibilidade = { id: dto.disponibilidade.id };
    input.turma = { id: dto.turma.id };
    return input;
  }

  static toUpdateInput(
    params: TurmaDisponibilidadeFindOneInputRestDto,
    dto: TurmaDisponibilidadeUpdateInputRestDto,
  ): TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto {
    const input = new TurmaDisponibilidadeFindOneInputDto() as TurmaDisponibilidadeFindOneInputDto &
      TurmaDisponibilidadeUpdateInputDto;
    input.id = params.id;
    if (dto.disponibilidade !== undefined) {
      input.disponibilidade = { id: dto.disponibilidade.id };
    }
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: TurmaDisponibilidadeFindOneOutputDto,
  ): TurmaDisponibilidadeFindOneOutputRestDto {
    const dto = new TurmaDisponibilidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.disponibilidade = DisponibilidadeRestMapper.toFindOneOutputDto(output.disponibilidade);
    dto.turma = TurmaRestMapper.toFindOneOutputDto(output.turma);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    TurmaDisponibilidadeListOutputRestDto,
    TurmaDisponibilidadeRestMapper.toFindOneOutputDto,
  );
}
