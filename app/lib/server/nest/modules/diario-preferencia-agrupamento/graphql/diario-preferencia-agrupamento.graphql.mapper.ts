import {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoListInputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "@/modules/ensino/diario-preferencia-agrupamento";
import { IntervaloDeTempoGraphqlMapper } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.mapper";
import { createListOutputMapper, mapDatedFields } from "@/server/nest/shared/mappers";
import {
  DiarioPreferenciaAgrupamentoCreateInputGraphQlDto,
  DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto,
  DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto,
  DiarioPreferenciaAgrupamentoListInputGraphQlDto,
  DiarioPreferenciaAgrupamentoListOutputGraphQlDto,
  DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto,
} from "./diario-preferencia-agrupamento.graphql.dto";

export class DiarioPreferenciaAgrupamentoGraphqlMapper {
  static toListInput(
    dto: DiarioPreferenciaAgrupamentoListInputGraphQlDto | null,
  ): DiarioPreferenciaAgrupamentoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioPreferenciaAgrupamentoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.diario.id"] = dto.filterDiarioId;
    return input;
  }

  static toFindOneInput(
    id: string,
    selection?: string[],
  ): DiarioPreferenciaAgrupamentoFindOneInputDto {
    const input = new DiarioPreferenciaAgrupamentoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: DiarioPreferenciaAgrupamentoCreateInputGraphQlDto,
  ): DiarioPreferenciaAgrupamentoCreateInputDto {
    const input = new DiarioPreferenciaAgrupamentoCreateInputDto();
    input.dataInicio = dto.dataInicio as unknown as string;
    input.dataFim = dto.dataFim as unknown as string | null;
    input.diaSemanaIso = dto.diaSemanaIso;
    input.aulasSeguidas = dto.aulasSeguidas;
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    input.diario = { id: dto.diario.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto,
  ): DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto {
    const input =
      new DiarioPreferenciaAgrupamentoFindOneInputDto() as DiarioPreferenciaAgrupamentoFindOneInputDto &
        DiarioPreferenciaAgrupamentoUpdateInputDto;
    input.id = params.id;
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio as unknown as string;
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim as unknown as string | null;
    }
    if (dto.diaSemanaIso !== undefined) {
      input.diaSemanaIso = dto.diaSemanaIso;
    }
    if (dto.aulasSeguidas !== undefined) {
      input.aulasSeguidas = dto.aulasSeguidas;
    }
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    }
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: DiarioPreferenciaAgrupamentoFindOneOutputDto,
  ): DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto {
    const dto = new DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio as unknown as Date;
    dto.dataFim = output.dataFim as unknown as Date | null;
    dto.diaSemanaIso = output.diaSemanaIso;
    dto.aulasSeguidas = output.aulasSeguidas;
    dto.intervaloDeTempo = IntervaloDeTempoGraphqlMapper.toFindOneOutputDto(
      output.intervaloDeTempo,
    );
    dto.diario = output.diario as unknown as DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioPreferenciaAgrupamentoListOutputGraphQlDto,
    DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto,
  );
}
