import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  DiarioPreferenciaAgrupamentoCreateCommand,
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoUpdateCommand,
} from "@/modules/ensino/diario-preferencia-agrupamento";
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
  ): DiarioPreferenciaAgrupamentoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioPreferenciaAgrupamentoListQuery();
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
  ): DiarioPreferenciaAgrupamentoFindOneQuery {
    const input = new DiarioPreferenciaAgrupamentoFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: DiarioPreferenciaAgrupamentoCreateInputGraphQlDto,
  ): DiarioPreferenciaAgrupamentoCreateCommand {
    const input = new DiarioPreferenciaAgrupamentoCreateCommand();
    input.dataInicio = dto.dataInicio as unknown as string;
    input.dataFim = dto.dataFim as unknown as string | null;
    input.diaSemanaIso = dto.diaSemanaIso;
    input.aulasSeguidas = dto.aulasSeguidas;
    input.diario = { id: dto.diario.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto,
  ): DiarioPreferenciaAgrupamentoFindOneQuery & DiarioPreferenciaAgrupamentoUpdateCommand {
    const input =
      new DiarioPreferenciaAgrupamentoFindOneQuery() as DiarioPreferenciaAgrupamentoFindOneQuery &
        DiarioPreferenciaAgrupamentoUpdateCommand;
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
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: DiarioPreferenciaAgrupamentoFindOneQueryResult,
  ): DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto {
    const dto = new DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio as unknown as Date;
    dto.dataFim = output.dataFim as unknown as Date | null;
    dto.diaSemanaIso = output.diaSemanaIso;
    dto.aulasSeguidas = output.aulasSeguidas;
    dto.diario = output.diario as unknown as DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioPreferenciaAgrupamentoListOutputGraphQlDto,
    DiarioPreferenciaAgrupamentoGraphqlMapper.toFindOneOutputDto,
  );
}
