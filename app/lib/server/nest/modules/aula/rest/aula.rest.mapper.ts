import {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaUpdateInputDto,
} from "@/modules/sisgha/aula";
import { AmbienteRestMapper } from "@/server/nest/modules/ambiente/rest";
import { DiarioRestMapper } from "@/server/nest/modules/diario/rest";
import { IntervaloDeTempoRestMapper } from "@/server/nest/modules/intervalo-de-tempo/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  AulaCreateInputRestDto,
  AulaFindOneInputRestDto,
  AulaFindOneOutputRestDto,
  AulaListOutputRestDto,
  AulaUpdateInputRestDto,
} from "./aula.rest.dto";

export class AulaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(AulaFindOneInputDto);

  static toListInput = createListInputMapper(AulaListInputDto, [
    "filter.id",
    "filter.diario.id",
    "filter.intervaloDeTempo.id",
  ]);

  static toCreateInput(dto: AulaCreateInputRestDto): AulaCreateInputDto {
    const input = new AulaCreateInputDto();
    input.data = dto.data;
    input.modalidade = dto.modalidade ?? null;
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    input.diario = { id: dto.diario.id };
    if (dto.ambiente !== undefined) {
      input.ambiente = dto.ambiente ? { id: dto.ambiente.id } : null;
    }
    return input;
  }

  static toUpdateInput(
    params: AulaFindOneInputRestDto,
    dto: AulaUpdateInputRestDto,
  ): AulaFindOneInputDto & AulaUpdateInputDto {
    const input = new AulaFindOneInputDto() as AulaFindOneInputDto & AulaUpdateInputDto;
    input.id = params.id;
    if (dto.data !== undefined) {
      input.data = dto.data;
    }
    if (dto.modalidade !== undefined) {
      input.modalidade = dto.modalidade ?? null;
    }
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    }
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    if (dto.ambiente !== undefined) {
      input.ambiente = dto.ambiente ? { id: dto.ambiente.id } : null;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: AulaFindOneOutputDto): AulaFindOneOutputRestDto {
    const dto = new AulaFindOneOutputRestDto();
    dto.id = output.id;
    dto.data = output.data;
    dto.modalidade = output.modalidade;
    dto.intervaloDeTempo = IntervaloDeTempoRestMapper.toFindOneOutputDto(output.intervaloDeTempo);
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    dto.ambiente = output.ambiente ? AmbienteRestMapper.toFindOneOutputDto(output.ambiente) : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    AulaListOutputRestDto,
    AulaRestMapper.toFindOneOutputDto,
  );
}
