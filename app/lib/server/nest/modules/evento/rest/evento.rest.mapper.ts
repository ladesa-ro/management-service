import {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoUpdateInputDto,
} from "@/modules/sisgha/evento";
import { AmbienteRestMapper } from "@/server/nest/modules/ambiente/rest";
import { CalendarioLetivoRestMapper } from "@/server/nest/modules/calendario-letivo/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  EventoCreateInputRestDto,
  EventoFindOneInputRestDto,
  EventoFindOneOutputRestDto,
  EventoListOutputRestDto,
  EventoUpdateInputRestDto,
} from "./evento.rest.dto";

export class EventoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(EventoFindOneInputDto);

  static toListInput = createListInputMapper(EventoListInputDto, [
    "filter.id",
    "filter.calendario.id",
  ]);

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EventoListOutputRestDto,
    EventoRestMapper.toFindOneOutputDto,
  );
}
