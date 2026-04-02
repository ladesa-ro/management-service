import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import * as AmbienteRestMapper from "@/modules/ambientes/ambiente/presentation.rest/ambiente.rest.mapper";
import * as CalendarioLetivoRestMapper from "@/modules/calendario/letivo/presentation.rest/calendario-letivo.rest.mapper";
import * as DiarioRestMapper from "@/modules/ensino/diario/presentation.rest/diario.rest.mapper";
import * as ModalidadeRestMapper from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.mapper";
import * as OfertaFormacaoRestMapper from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.mapper";
import * as TurmaRestMapper from "@/modules/ensino/turma/presentation.rest/turma.rest.mapper";
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
  input.turmas = dto.turmas;
  input.perfis = dto.perfis;
  input.calendariosLetivos = dto.calendariosLetivos;
  input.ofertasFormacao = dto.ofertasFormacao;
  input.modalidades = dto.modalidades;
  input.ambientes = dto.ambientes;
  input.diarios = dto.diarios;
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
  turmas: dto.turmas,
  perfis: dto.perfis,
  calendariosLetivos: dto.calendariosLetivos,
  ofertasFormacao: dto.ofertasFormacao,
  modalidades: dto.modalidades,
  ambientes: dto.ambientes,
  diarios: dto.diarios,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioAgendamentoFindOneQueryResult,
  CalendarioEventoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  identificadorExterno: output.identificadorExterno,
  nome: output.nome,
  dataInicio: output.dataInicio,
  dataFim: output.dataFim,
  diaInteiro: output.diaInteiro,
  horarioInicio: output.horarioInicio,
  horarioFim: output.horarioFim,
  cor: output.cor,
  repeticao: output.repeticao,
  status: output.status,
  version: output.version,
  turmas: TurmaRestMapper.findOneQueryResultToOutputDto.mapArray(output.turmas),
  perfis: PerfilRestMapper.findOneQueryResultToOutputDto.mapArray(output.perfis),
  calendariosLetivos: CalendarioLetivoRestMapper.findOneQueryResultToOutputDto.mapArray(
    output.calendariosLetivos,
  ),
  ofertasFormacao: OfertaFormacaoRestMapper.findOneQueryResultToOutputDto.mapArray(
    output.ofertasFormacao,
  ),
  modalidades: ModalidadeRestMapper.findOneQueryResultToOutputDto.mapArray(output.modalidades),
  ambientes: AmbienteRestMapper.findOneQueryResultToOutputDto.mapArray(output.ambientes),
  diarios: DiarioRestMapper.findOneQueryResultToOutputDto.mapArray(output.diarios),
}));
