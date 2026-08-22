import * as UsuarioRestMapper from "@/modules/acesso/usuario/presentation.rest/usuario.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { CalendarioSolicitacaoMudancaTipoOperacao } from "../domain/calendario-solicitacao-mudanca.types";
import { CalendarioSolicitacaoMudancaCreateCommand } from "../domain/commands/calendario-solicitacao-mudanca-create.command";
import type { CalendarioSolicitacaoMudancaRecusarCommand } from "../domain/commands/calendario-solicitacao-mudanca-recusar.command";
import { CalendarioSolicitacaoMudancaFindOneQuery } from "../domain/queries/calendario-solicitacao-mudanca-find-one.query";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "../domain/queries/calendario-solicitacao-mudanca-find-one.query.result";
import { CalendarioSolicitacaoMudancaListQuery } from "../domain/queries/calendario-solicitacao-mudanca-list.query";
import {
  type CalendarioSolicitacaoMudancaCreateInputRestDto,
  type CalendarioSolicitacaoMudancaFindOneInputRestDto,
  CalendarioSolicitacaoMudancaFindOneOutputRestDto,
  type CalendarioSolicitacaoMudancaListInputRestDto,
  CalendarioSolicitacaoMudancaListOutputRestDto,
  type CalendarioSolicitacaoMudancaRecusarInputRestDto,
} from "./calendario-solicitacao-mudanca.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  CalendarioSolicitacaoMudancaFindOneInputRestDto,
  CalendarioSolicitacaoMudancaFindOneQuery
>((dto) => {
  const input = new CalendarioSolicitacaoMudancaFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CalendarioSolicitacaoMudancaListInputRestDto,
  CalendarioSolicitacaoMudancaListQuery
>(CalendarioSolicitacaoMudancaListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.status").from(dto);
  into(query).field("filter.calendarioAgendamento.id").from(dto);
  into(query).field("filter.autor.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  CalendarioSolicitacaoMudancaCreateInputRestDto,
  CalendarioSolicitacaoMudancaCreateCommand
>((dto) => {
  const input = new CalendarioSolicitacaoMudancaCreateCommand();
  input.calendarioAgendamentoId = dto.calendarioAgendamentoId;
  input.tipoOperacao = dto.tipoOperacao as CalendarioSolicitacaoMudancaTipoOperacao;
  input.dadosPropostos = dto.dadosPropostos;
  input.justificativa = dto.justificativa;
  return input;
});

export const recusarInputDtoToRecusarCommand = createMapper<
  {
    params: CalendarioSolicitacaoMudancaFindOneInputRestDto;
    dto: CalendarioSolicitacaoMudancaRecusarInputRestDto;
  },
  CalendarioSolicitacaoMudancaFindOneQuery & CalendarioSolicitacaoMudancaRecusarCommand
>(({ params, dto }) => ({
  id: params.id,
  motivoRecusa: dto.motivoRecusa ?? undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioSolicitacaoMudancaFindOneQueryResult,
  CalendarioSolicitacaoMudancaFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioSolicitacaoMudancaFindOneOutputRestDto();
  dto.id = output.id;
  dto.autor = UsuarioRestMapper.findOneQueryResultToOutputDto.map(output.autor);
  dto.calendarioAgendamentoId = output.calendarioAgendamentoId;
  dto.tipoOperacao = output.tipoOperacao;
  dto.dadosPropostos = output.dadosPropostos;
  dto.justificativa = output.justificativa;
  dto.status = output.status;
  dto.motivoRecusa = output.motivoRecusa;
  dto.sessaoEdicaoId = output.sessaoEdicaoId;
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  CalendarioSolicitacaoMudancaListOutputRestDto,
  findOneQueryResultToOutputDto,
);
