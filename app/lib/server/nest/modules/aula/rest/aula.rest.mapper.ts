import {
  AulaCreateInput,
  AulaFindOneInput,
  AulaFindOneOutput,
  AulaListInput,
  AulaListOutput,
  AulaUpdateInput,
} from "@/modules/aula";
import { AmbienteRestMapper } from "@/server/nest/modules/ambiente/rest";
import { DiarioRestMapper } from "@/server/nest/modules/diario/rest";
import { IntervaloDeTempoRestMapper } from "@/server/nest/modules/intervalo-de-tempo/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "./aula.rest.dto";

export class AulaRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: AulaFindOneInputDto): AulaFindOneInput {
    const input = new AulaFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: AulaListInputDto | null): AulaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new AulaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.diario.id"] = dto["filter.diario.id"];
    input["filter.intervaloDeTempo.id"] = dto["filter.intervaloDeTempo.id"];
    return input;
  }

  static toCreateInput(dto: AulaCreateInputDto): AulaCreateInput {
    const input = new AulaCreateInput();
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
    params: AulaFindOneInputDto,
    dto: AulaUpdateInputDto,
  ): AulaFindOneInput & AulaUpdateInput {
    const input = new AulaFindOneInput() as AulaFindOneInput & AulaUpdateInput;
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

  static toFindOneOutputDto(output: AulaFindOneOutput): AulaFindOneOutputDto {
    const dto = new AulaFindOneOutputDto();
    dto.id = output.id;
    dto.data = output.data;
    dto.modalidade = output.modalidade;
    dto.intervaloDeTempo = IntervaloDeTempoRestMapper.toFindOneOutputDto(output.intervaloDeTempo);
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    dto.ambiente = output.ambiente ? AmbienteRestMapper.toFindOneOutputDto(output.ambiente) : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: AulaListOutput): AulaListOutputDto {
    const dto = new AulaListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
