import { createListMapper, createMapper } from "@/shared/mapping";
import {
  DiarioPreferenciaAgrupamentoBulkReplaceCommand,
  DiarioPreferenciaAgrupamentoListQuery,
} from "../domain";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "../domain/queries";
import * as DiarioRestMapper from "./diario.rest.mapper";
import {
  type DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
  DiarioPreferenciaAgrupamentoFindOneOutputRestDto,
  type DiarioPreferenciaAgrupamentoListInputRestDto,
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  type DiarioPreferenciaAgrupamentoParentParamsRestDto,
} from "./diario-preferencia-agrupamento.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export function toListInput(
  parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
  dto: DiarioPreferenciaAgrupamentoListInputRestDto,
): DiarioPreferenciaAgrupamentoListQuery {
  const input = new DiarioPreferenciaAgrupamentoListQuery();
  input.page = dto.page;
  input.limit = dto.limit;
  input.search = dto.search;
  input.sortBy = dto.sortBy;
  input["filter.id"] = dto["filter.id"];
  input["filter.diario.id"] = [parentParams.diarioId];
  return input;
}

export function toBulkReplaceInput(
  parentParams: DiarioPreferenciaAgrupamentoParentParamsRestDto,
  dto: DiarioPreferenciaAgrupamentoBulkReplaceInputRestDto,
): DiarioPreferenciaAgrupamentoBulkReplaceCommand {
  const input = new DiarioPreferenciaAgrupamentoBulkReplaceCommand();
  input.diarioId = parentParams.diarioId;
  input.preferenciasAgrupamento = dto.preferenciasAgrupamento.map((p) => ({
    dataInicio: p.dataInicio,
    dataFim: p.dataFim ?? null,
    diaSemanaIso: p.diaSemanaIso,
    aulasSeguidas: p.aulasSeguidas,
  }));
  return input;
}

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
  DiarioPreferenciaAgrupamentoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  dataInicio: output.dataInicio,
  dataFim: output.dataFim,
  diaSemanaIso: output.diaSemanaIso,
  aulasSeguidas: output.aulasSeguidas,
  diario: DiarioRestMapper.toFindOneOutput.map(output.diario),
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const toListOutput = createListMapper(
  DiarioPreferenciaAgrupamentoListOutputRestDto,
  toFindOneOutput,
);
