import {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
  EventoUpdateInputDto,
} from "@/modules/evento";
import { AmbienteRestMapper } from "@/server/nest/modules/ambiente/rest";
import { CalendarioLetivoRestMapper } from "@/server/nest/modules/calendario-letivo/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  EventoCreateInputRestDto,
  EventoFindOneInputRestDto,
  EventoFindOneOutputRestDto,
  EventoListInputRestDto,
  EventoListOutputRestDto,
  EventoUpdateInputRestDto,
} from "./evento.rest.dto";

export class EventoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: EventoFindOneInputRestDto): EventoFindOneInputDto {
    const input = new EventoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: EventoListInputRestDto | null): EventoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new EventoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.calendario.id"] = dto["filter.calendario.id"];
    return input;
  }

  static toCreateInput(dto: EventoCreateInputRestDto): EventoCreateInputDto {
    const input = new EventoCreateInputDto();
    input.nome = dto.nome;
    input.rrule = dto.rrule;
    input.cor = dto.cor;
    input.dataInicio = dto.dataInicio;
    input.dataFim = dto.dataFim;
    input.calendario = { id: dto.calendario.id };
    input.ambiente = dto.ambiente ? { id: dto.ambiente.id } : undefined;
    return input;
  }

  static toUpdateInput(
    params: EventoFindOneInputRestDto,
    dto: EventoUpdateInputRestDto,
  ): EventoFindOneInputDto & EventoUpdateInputDto {
    const input = new EventoFindOneInputDto() as EventoFindOneInputDto & EventoUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.rrule !== undefined) {
      input.rrule = dto.rrule;
    }
    if (dto.cor !== undefined) {
      input.cor = dto.cor;
    }
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio;
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim;
    }
    if (dto.calendario !== undefined) {
      input.calendario = { id: dto.calendario.id };
    }
    if (dto.ambiente !== undefined) {
      input.ambiente = dto.ambiente ? { id: dto.ambiente.id } : null;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: EventoFindOneOutputDto): EventoFindOneOutputRestDto {
    const dto = new EventoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.rrule = output.rrule;
    dto.cor = output.cor;
    dto.dataInicio = output.dataInicio;
    dto.dataFim = output.dataFim;
    dto.calendario = CalendarioLetivoRestMapper.toFindOneOutputDto(output.calendario);
    dto.ambiente = output.ambiente ? AmbienteRestMapper.toFindOneOutputDto(output.ambiente) : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: EventoListOutputDto): EventoListOutputRestDto {
    const dto = new EventoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
