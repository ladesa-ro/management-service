import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeUpdateInputDto,
} from "@/modules/ensino/disponibilidade";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
} from "@/modules/@shared/application/mappers";
import {
  DisponibilidadeCreateInputRestDto,
  DisponibilidadeFindOneOutputRestDto,
  DisponibilidadeListOutputRestDto,
  DisponibilidadeUpdateInputRestDto,
} from "./disponibilidade.rest.dto";

export class DisponibilidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(DisponibilidadeFindOneInputDto);

  static toListInput = createListInputMapper(DisponibilidadeListInputDto, ["filter.id"]);

  static toCreateInput(dto: DisponibilidadeCreateInputRestDto): DisponibilidadeCreateInputDto {
    const input = new DisponibilidadeCreateInputDto();
    input.dataInicio = dto.dataInicio as unknown as string;
    input.dataFim = dto.dataFim as unknown as string | null;
    return input;
  }

  static toUpdateInput(dto: DisponibilidadeUpdateInputRestDto): DisponibilidadeUpdateInputDto {
    const input = new DisponibilidadeUpdateInputDto();
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio as unknown as string;
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim as unknown as string | null;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: DisponibilidadeFindOneOutputDto,
  ): DisponibilidadeFindOneOutputRestDto {
    const dto = new DisponibilidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio as unknown as Date;
    dto.dataFim = output.dataFim as unknown as Date | null;
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DisponibilidadeListOutputRestDto,
    DisponibilidadeRestMapper.toFindOneOutputDto,
  );
}
