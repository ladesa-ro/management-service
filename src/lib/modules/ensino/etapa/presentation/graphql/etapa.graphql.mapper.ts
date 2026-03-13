import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaUpdateInputDto,
} from "@/modules/ensino/etapa";
import { CalendarioLetivoGraphqlMapper } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.mapper";
import {
  EtapaCreateInputGraphQlDto,
  EtapaFindOneOutputGraphQlDto,
  EtapaListInputGraphQlDto,
  EtapaListOutputGraphQlDto,
  EtapaUpdateInputGraphQlDto,
} from "./etapa.graphql.dto";

export class EtapaGraphqlMapper {
  static toListInput(dto: EtapaListInputGraphQlDto | null): EtapaListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new EtapaListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): EtapaFindOneInputDto {
    const input = new EtapaFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: EtapaCreateInputGraphQlDto): EtapaCreateInputDto {
    const input = new EtapaCreateInputDto();
    input.numero = dto.numero ?? null;
    input.dataInicio = dto.dataInicio;
    input.dataTermino = dto.dataTermino;
    input.cor = dto.cor ?? null;
    input.calendario = { id: dto.calendario.id };
    return input;
  }

  static toUpdateInput(dto: EtapaUpdateInputGraphQlDto): EtapaUpdateInputDto {
    const input = new EtapaUpdateInputDto();
    if (dto.numero !== undefined) {
      input.numero = dto.numero;
    }
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio;
    }
    if (dto.dataTermino !== undefined) {
      input.dataTermino = dto.dataTermino;
    }
    if (dto.cor !== undefined) {
      input.cor = dto.cor;
    }
    if (dto.calendario !== undefined) {
      input.calendario = { id: dto.calendario.id };
    }
    return input;
  }

  static toFindOneOutputDto(output: EtapaFindOneOutputDto): EtapaFindOneOutputGraphQlDto {
    const dto = new EtapaFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.numero = output.numero;
    dto.dataInicio = output.dataInicio as string;
    dto.dataTermino = output.dataTermino as string;
    dto.cor = output.cor;
    dto.calendario = CalendarioLetivoGraphqlMapper.toFindOneOutputDto(output.calendario);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EtapaListOutputGraphQlDto,
    EtapaGraphqlMapper.toFindOneOutputDto,
  );
}
