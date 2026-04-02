import { createMapper } from "@/shared/mapping";
import { CalendarioAgendamentoTipo } from "../domain/calendario-agendamento.types";
import { CalendarioAgendamentoCreateCommand } from "../domain/commands/calendario-agendamento-create.command";
import type { CalendarioAgendamentoUpdateCommand } from "../domain/commands/calendario-agendamento-update.command";
import type { CalendarioAgendamentoFindOneQuery } from "../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../domain/queries/calendario-agendamento-find-one.query.result";
import type {
  CalendarioEventoCreateInputRestDto,
  CalendarioEventoFindOneOutputRestDto,
  CalendarioEventoFindOneParamsRestDto,
  CalendarioEventoUpdateInputRestDto,
} from "./calendario-evento.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const createInputDtoToCreateCommand = createMapper<
  CalendarioEventoCreateInputRestDto,
  CalendarioAgendamentoCreateCommand
>((dto) => {
  const input = new CalendarioAgendamentoCreateCommand();
  input.tipo = CalendarioAgendamentoTipo.EVENTO;
  input.nome = dto.nome;
  input.dataInicio = dto.dataInicio;
  input.dataFim = dto.dataFim ?? null;
  input.diaInteiro = dto.diaInteiro;
  input.horarioInicio = dto.horarioInicio;
  input.horarioFim = dto.horarioFim;
  input.cor = dto.cor ?? null;
  input.repeticao = dto.repeticao ?? null;
  input.turmaIds = dto.turmaIds;
  input.perfilIds = dto.perfilIds;
  input.calendarioLetivoIds = dto.calendarioLetivoIds;
  input.ofertaFormacaoIds = dto.ofertaFormacaoIds;
  input.modalidadeIds = dto.modalidadeIds;
  input.ambienteIds = dto.ambienteIds;
  input.diarioIds = dto.diarioIds;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: CalendarioEventoFindOneParamsRestDto; dto: CalendarioEventoUpdateInputRestDto },
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim !== undefined ? (dto.dataFim ?? null) : undefined,
  diaInteiro: dto.diaInteiro,
  horarioInicio: dto.horarioInicio,
  horarioFim: dto.horarioFim,
  cor: dto.cor !== undefined ? (dto.cor ?? null) : undefined,
  repeticao: dto.repeticao !== undefined ? (dto.repeticao ?? null) : undefined,
  turmaIds: dto.turmaIds,
  perfilIds: dto.perfilIds,
  calendarioLetivoIds: dto.calendarioLetivoIds,
  ofertaFormacaoIds: dto.ofertaFormacaoIds,
  modalidadeIds: dto.modalidadeIds,
  ambienteIds: dto.ambienteIds,
  diarioIds: dto.diarioIds,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioAgendamentoFindOneQueryResult,
  CalendarioEventoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  dataInicio: output.dataInicio,
  dataFim: output.dataFim,
  diaInteiro: output.diaInteiro,
  horarioInicio: output.horarioInicio,
  horarioFim: output.horarioFim,
  cor: output.cor,
  repeticao: output.repeticao,
  status: output.status,
  turmaIds: output.turmaIds,
  perfilIds: output.perfilIds,
  calendarioLetivoIds: output.calendarioLetivoIds,
  ofertaFormacaoIds: output.ofertaFormacaoIds,
  modalidadeIds: output.modalidadeIds,
  ambienteIds: output.ambienteIds,
  diarioIds: output.diarioIds,
}));
