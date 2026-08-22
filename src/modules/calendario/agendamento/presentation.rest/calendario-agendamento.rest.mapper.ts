import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import * as AmbienteRestMapper from "@/modules/ambientes/ambiente/presentation.rest/ambiente.rest.mapper";
import * as CalendarioLetivoRestMapper from "@/modules/calendario/letivo/presentation.rest/calendario-letivo.rest.mapper";
import * as DiarioRestMapper from "@/modules/ensino/diario/presentation.rest/diario.rest.mapper";
import * as ModalidadeRestMapper from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.mapper";
import * as OfertaFormacaoRestMapper from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.mapper";
import * as TurmaRestMapper from "@/modules/ensino/turma/presentation.rest/turma.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type {
  CalendarioAgendamentoEscopoEdicaoSerie,
  CalendarioAgendamentoTipo,
} from "../domain/calendario-agendamento.types";
import type { CalendarioAgendamentoCancelarOcorrenciaCommand } from "../domain/commands/calendario-agendamento-cancelar-ocorrencia.command";
import { CalendarioAgendamentoCreateCommand } from "../domain/commands/calendario-agendamento-create.command";
import type { CalendarioAgendamentoEditarOcorrenciaCommand } from "../domain/commands/calendario-agendamento-editar-ocorrencia.command";
import type { CalendarioAgendamentoEditarSerieCommand } from "../domain/commands/calendario-agendamento-editar-serie.command";
import type { CalendarioAgendamentoUpdateCommand } from "../domain/commands/calendario-agendamento-update.command";
import type { CalendarioAgendamentoFindOneQuery } from "../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../domain/queries/calendario-agendamento-find-one.query.result";
import { CalendarioAgendamentoListQuery } from "../domain/queries/calendario-agendamento-list.query";
import type {
  CalendarioAgendamentoCancelarOcorrenciaInputRestDto,
  CalendarioAgendamentoCreateInputRestDto,
  CalendarioAgendamentoEditarOcorrenciaInputRestDto,
  CalendarioAgendamentoEditarSerieInputRestDto,
  CalendarioAgendamentoFindOneOutputRestDto,
  CalendarioAgendamentoFindOneParamsRestDto,
  CalendarioAgendamentoListInputRestDto,
  CalendarioAgendamentoUpdateInputRestDto,
} from "./calendario-agendamento.rest.dto";
import { CalendarioAgendamentoListOutputRestDto } from "./calendario-agendamento.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const createInputDtoToCreateCommand = createMapper<
  CalendarioAgendamentoCreateInputRestDto,
  CalendarioAgendamentoCreateCommand
>((dto) => {
  const command = new CalendarioAgendamentoCreateCommand();
  command.tipo = dto.tipo as CalendarioAgendamentoTipo;
  command.nome = dto.nome;
  command.dataInicio = dto.dataInicio;
  command.dataFim = dto.dataFim ?? null;
  command.diaInteiro = dto.diaInteiro;
  command.horarioInicio = dto.horarioInicio;
  command.horarioFim = dto.horarioFim;
  command.cor = dto.cor ?? null;
  command.repeticao = dto.repeticao ?? null;
  command.campus = dto.campus ? { id: dto.campus.id } : null;
  command.colecao = dto.colecao ? { id: dto.colecao.id } : null;
  command.motivo = dto.motivo ?? null;
  command.turmas = dto.turmas;
  command.perfis = dto.perfis;
  command.calendariosLetivos = dto.calendariosLetivos;
  command.ofertasFormacao = dto.ofertasFormacao;
  command.modalidades = dto.modalidades;
  command.ambientes = dto.ambientes;
  command.diarios = dto.diarios;
  return command;
});

export const updateInputDtoToUpdateCommand = createMapper<
  {
    params: CalendarioAgendamentoFindOneParamsRestDto;
    dto: CalendarioAgendamentoUpdateInputRestDto;
  },
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  tipo: dto.tipo as CalendarioAgendamentoTipo | undefined,
  nome: dto.nome,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim !== undefined ? (dto.dataFim ?? null) : undefined,
  diaInteiro: dto.diaInteiro,
  horarioInicio: dto.horarioInicio,
  horarioFim: dto.horarioFim,
  cor: dto.cor !== undefined ? (dto.cor ?? null) : undefined,
  repeticao: dto.repeticao !== undefined ? (dto.repeticao ?? null) : undefined,
  campus: dto.campus !== undefined ? (dto.campus ? { id: dto.campus.id } : null) : undefined,
  colecao: dto.colecao !== undefined ? (dto.colecao ? { id: dto.colecao.id } : null) : undefined,
  motivo: dto.motivo !== undefined ? (dto.motivo ?? null) : undefined,
  turmas: dto.turmas,
  perfis: dto.perfis,
  calendariosLetivos: dto.calendariosLetivos,
  ofertasFormacao: dto.ofertasFormacao,
  modalidades: dto.modalidades,
  ambientes: dto.ambientes,
  diarios: dto.diarios,
}));

export const editarOcorrenciaInputDtoToCommand = createMapper<
  {
    params: CalendarioAgendamentoFindOneParamsRestDto;
    dto: CalendarioAgendamentoEditarOcorrenciaInputRestDto;
  },
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoEditarOcorrenciaCommand
>(({ params, dto }) => ({
  id: params.id,
  dataOcorrencia: dto.dataOcorrencia,
  diaInteiro: dto.diaInteiro,
  horarioInicio: dto.horarioInicio,
  horarioFim: dto.horarioFim,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  colecao: dto.colecao ? { id: dto.colecao.id } : undefined,
  motivo: dto.motivo,
  turmas: dto.turmas,
  perfis: dto.perfis,
  calendariosLetivos: dto.calendariosLetivos,
  ofertasFormacao: dto.ofertasFormacao,
  modalidades: dto.modalidades,
  ambientes: dto.ambientes,
  diarios: dto.diarios,
}));

export const cancelarOcorrenciaInputDtoToCommand = createMapper<
  {
    params: CalendarioAgendamentoFindOneParamsRestDto;
    dto: CalendarioAgendamentoCancelarOcorrenciaInputRestDto;
  },
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoCancelarOcorrenciaCommand
>(({ params, dto }) => ({
  id: params.id,
  dataOcorrencia: dto.dataOcorrencia,
  motivo: dto.motivo,
}));

export const editarSerieInputDtoToCommand = createMapper<
  {
    params: CalendarioAgendamentoFindOneParamsRestDto;
    dto: CalendarioAgendamentoEditarSerieInputRestDto;
  },
  CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoEditarSerieCommand
>(({ params, dto }) => ({
  id: params.id,
  dataOcorrencia: dto.dataOcorrencia,
  escopo: dto.escopo as CalendarioAgendamentoEscopoEdicaoSerie,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim,
  diaInteiro: dto.diaInteiro,
  horarioInicio: dto.horarioInicio,
  horarioFim: dto.horarioFim,
  repeticao: dto.repeticao,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  colecao: dto.colecao ? { id: dto.colecao.id } : undefined,
  motivo: dto.motivo,
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
  CalendarioAgendamentoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  identificadorExterno: output.identificadorExterno,
  tipo: output.tipo,
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
  campus: output.campus,
  colecao: output.colecao,
  autorId: output.autorId,
  motivo: output.motivo,
  identificadorExternoSerieOrigem: output.identificadorExternoSerieOrigem,
  dataOcorrenciaReferenciada: output.dataOcorrenciaReferenciada,
  detalhesOcultos: output.detalhesOcultos,
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

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CalendarioAgendamentoListInputRestDto,
  CalendarioAgendamentoListQuery
>(CalendarioAgendamentoListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.tipo").from(dto);
  into(query).field("filter.status").from(dto);
  into(query).field("filter.turma.id").from(dto);
  into(query).field("filter.perfil.id").from(dto);
  into(query).field("filter.calendarioLetivo.id").from(dto);
  into(query).field("filter.ofertaFormacao.id").from(dto);
  into(query).field("filter.modalidade.id").from(dto);
  into(query).field("filter.ambiente.id").from(dto);
  into(query).field("filter.diario.id").from(dto);
});

export const listQueryResultToListOutputDto = createListMapper(
  CalendarioAgendamentoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
