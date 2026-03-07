import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/turma-disponibilidade";
import {
  TurmaDisponibilidadeCreateInputRestDto,
  TurmaDisponibilidadeFindOneInputRestDto,
  TurmaDisponibilidadeFindOneOutputRestDto,
  TurmaDisponibilidadeListOutputRestDto,
  TurmaDisponibilidadeUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/TurmaDisponibilidadeRestDto";
import { DisponibilidadeRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/DisponibilidadeRestMapper";
import { TurmaRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/TurmaRestMapper";

export class TurmaDisponibilidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(TurmaDisponibilidadeFindOneInputDto);

  static toListInput = createListInputMapper(TurmaDisponibilidadeListInputDto, ["filter.id"]);
  static toListOutputDto = createListOutputMapper(
    TurmaDisponibilidadeListOutputRestDto,
    TurmaDisponibilidadeRestMapper.toFindOneOutputDto,
  );

  static toCreateInput(
    dto: TurmaDisponibilidadeCreateInputRestDto,
  ): TurmaDisponibilidadeCreateInputDto {
    const input = new TurmaDisponibilidadeCreateInputDto();
    input.disponibilidade = { id: dto.disponibilidade.id };
    input.turma = { id: dto.turma.id };
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

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
}
