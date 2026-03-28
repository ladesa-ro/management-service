import {
  HorariosDeAulaFindAtualQuery,
  type HorariosDeAulaFindAtualQueryResult,
  HorariosDeAulaReplaceCommand,
} from "@/modules/horarios/horarios-de-aula";
import { createMapper } from "@/shared/mapping";
import type {
  HorarioDeAulaCampusParamsRestDto,
  HorarioDeAulaListOutputRestDto,
  HorarioDeAulaReplaceInputRestDto,
} from "./horario-aula-configuracao.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findAtualInputDtoToFindAtualQuery = createMapper<
  HorarioDeAulaCampusParamsRestDto,
  HorariosDeAulaFindAtualQuery
>((dto) => {
  const query = new HorariosDeAulaFindAtualQuery();
  query.campusId = dto.campusId;
  return query;
});

export const replaceInputDtoToReplaceCommand = createMapper<
  { params: HorarioDeAulaCampusParamsRestDto; dto: HorarioDeAulaReplaceInputRestDto },
  HorariosDeAulaReplaceCommand
>(({ params, dto }) => {
  const command = new HorariosDeAulaReplaceCommand();
  command.campusId = params.campusId;
  command.horarios = dto.horarios.map((h) => ({ inicio: h.inicio, fim: h.fim }));
  return command;
});

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findAtualQueryResultToOutputDto = createMapper<
  HorariosDeAulaFindAtualQueryResult,
  HorarioDeAulaListOutputRestDto
>((queryResult) => ({
  data: queryResult.data.map((h) => ({ inicio: h.inicio, fim: h.fim })),
}));
