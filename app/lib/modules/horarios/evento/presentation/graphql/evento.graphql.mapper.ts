import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import { CalendarioLetivoGraphqlMapper } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.mapper";
import {
  EventoCreateInputDto,
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoUpdateInputDto,
} from "@/modules/horarios/evento";
import {
  AmbienteFindOneOutputForEventoGraphQlDto,
  EventoCreateInputGraphQlDto,
  EventoFindOneOutputGraphQlDto,
  EventoListInputGraphQlDto,
  EventoListOutputGraphQlDto,
  EventoUpdateInputGraphQlDto,
} from "./evento.graphql.dto";

export class EventoGraphqlMapper {
  static toListInput(dto: EventoListInputGraphQlDto | null): EventoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new EventoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): EventoFindOneInputDto {
    const input = new EventoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: EventoCreateInputGraphQlDto): EventoCreateInputDto {
    const input = new EventoCreateInputDto();
    input.nome = dto.nome ?? null;
    input.rrule = dto.rrule;
    input.cor = dto.cor ?? null;
    input.dataInicio = dto.dataInicio ?? null;
    input.dataFim = dto.dataFim ?? null;
    input.calendario = { id: dto.calendario.id };
    input.ambiente = dto.ambiente ? { id: dto.ambiente.id } : null;
    return input;
  }

  static toUpdateInput(dto: EventoUpdateInputGraphQlDto): EventoUpdateInputDto {
    const input = new EventoUpdateInputDto();
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

  private static mapAmbiente(
    ambiente: any | null,
  ): AmbienteFindOneOutputForEventoGraphQlDto | null {
    if (!ambiente) return null;
    const dto = new AmbienteFindOneOutputForEventoGraphQlDto();
    dto.id = ambiente.id;
    dto.nome = ambiente.nome;
    dto.descricao = ambiente.descricao;
    dto.codigo = ambiente.codigo;
    dto.capacidade = ambiente.capacidade;
    dto.tipo = ambiente.tipo;
    mapDatedFields(dto, ambiente);
    return dto;
  }

  static toFindOneOutputDto(output: EventoFindOneOutputDto): EventoFindOneOutputGraphQlDto {
    const dto = new EventoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.rrule = output.rrule;
    dto.cor = output.cor;
    dto.dataInicio = output.dataInicio as string | null;
    dto.dataFim = output.dataFim as string | null;
    dto.calendario = CalendarioLetivoGraphqlMapper.toFindOneOutputDto(output.calendario);
    dto.ambiente = this.mapAmbiente(output.ambiente);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EventoListOutputGraphQlDto,
    EventoGraphqlMapper.toFindOneOutputDto,
  );
}
