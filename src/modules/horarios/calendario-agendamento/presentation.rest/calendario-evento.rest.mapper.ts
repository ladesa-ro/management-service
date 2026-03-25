import { CalendarioAgendamentoTipo } from "../domain/calendario-agendamento.types";
import { CalendarioAgendamentoCreateCommand } from "../domain/commands/calendario-agendamento-create.command";
import { CalendarioAgendamentoUpdateCommand } from "../domain/commands/calendario-agendamento-update.command";
import { CalendarioAgendamentoFindOneQuery } from "../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../domain/queries/calendario-agendamento-find-one.query.result";
import type {
  CalendarioEventoCreateInputRestDto,
  CalendarioEventoFindOneOutputRestDto,
  CalendarioEventoFindOneParamsRestDto,
  CalendarioEventoUpdateInputRestDto,
} from "./calendario-evento.rest.dto";

export class CalendarioEventoRestMapper {
  static toCreateInput(
    dto: CalendarioEventoCreateInputRestDto,
  ): CalendarioAgendamentoCreateCommand {
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
  }

  static toUpdateInput(
    params: CalendarioEventoFindOneParamsRestDto,
    dto: CalendarioEventoUpdateInputRestDto,
  ): CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoUpdateCommand {
    const input = new CalendarioAgendamentoFindOneQuery() as CalendarioAgendamentoFindOneQuery &
      CalendarioAgendamentoUpdateCommand;
    input.id = params.id;

    if (dto.nome !== undefined) input.nome = dto.nome;
    if (dto.dataInicio !== undefined) input.dataInicio = dto.dataInicio;
    if (dto.dataFim !== undefined) input.dataFim = dto.dataFim ?? null;
    if (dto.diaInteiro !== undefined) input.diaInteiro = dto.diaInteiro;
    if (dto.horarioInicio !== undefined) input.horarioInicio = dto.horarioInicio;
    if (dto.horarioFim !== undefined) input.horarioFim = dto.horarioFim;
    if (dto.cor !== undefined) input.cor = dto.cor ?? null;
    if (dto.repeticao !== undefined) input.repeticao = dto.repeticao ?? null;
    if (dto.turmaIds !== undefined) input.turmaIds = dto.turmaIds;
    if (dto.perfilIds !== undefined) input.perfilIds = dto.perfilIds;
    if (dto.calendarioLetivoIds !== undefined) input.calendarioLetivoIds = dto.calendarioLetivoIds;
    if (dto.ofertaFormacaoIds !== undefined) input.ofertaFormacaoIds = dto.ofertaFormacaoIds;
    if (dto.modalidadeIds !== undefined) input.modalidadeIds = dto.modalidadeIds;
    if (dto.ambienteIds !== undefined) input.ambienteIds = dto.ambienteIds;
    if (dto.diarioIds !== undefined) input.diarioIds = dto.diarioIds;

    return input;
  }

  static toFindOneOutputDto(
    output: CalendarioAgendamentoFindOneQueryResult,
  ): CalendarioEventoFindOneOutputRestDto {
    return {
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
    };
  }
}
