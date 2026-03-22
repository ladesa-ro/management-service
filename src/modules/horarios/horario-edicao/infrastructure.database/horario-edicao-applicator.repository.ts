import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { ICalendarioAgendamentoRepository } from "@/modules/horarios/calendario-agendamento/domain/repositories/calendario-agendamento.repository.interface";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import type { IHorarioEdicaoApplicator } from "../domain/repositories";
import {
  type HorarioEdicaoMudancaEntity,
  HorarioEdicaoMudancaTipoOperacao,
} from "./typeorm/horario-edicao-mudanca.typeorm.entity";

@DeclareImplementation()
export class HorarioEdicaoApplicatorTypeOrmAdapter implements IHorarioEdicaoApplicator {
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
  ) {}

  async applyMudancas(mudancas: HorarioEdicaoMudancaEntity[]): Promise<void> {
    for (const mudanca of mudancas) {
      const dados = mudanca.dados;

      switch (mudanca.tipoOperacao) {
        case HorarioEdicaoMudancaTipoOperacao.CRIAR: {
          const agendamento = new CalendarioAgendamentoEntity();
          agendamento.id = generateUuidV7();
          agendamento.tipo =
            (dados.tipo as CalendarioAgendamentoTipo) ?? CalendarioAgendamentoTipo.AULA;
          agendamento.nome = (dados.nome as string) ?? null;
          agendamento.dataInicio = new Date(dados.dataInicio as string);
          agendamento.dataFim = dados.dataFim ? new Date(dados.dataFim as string) : null;
          agendamento.diaInteiro = (dados.diaInteiro as boolean) ?? false;
          agendamento.horarioInicio = (dados.horarioInicio as string) ?? "00:00:00";
          agendamento.horarioFim = (dados.horarioFim as string) ?? "23:59:59";
          agendamento.repeticao = (dados.repeticao as string) ?? null;
          agendamento.cor = (dados.cor as string) ?? null;
          agendamento.status = CalendarioAgendamentoStatus.ATIVO;
          await this.calendarioAgendamentoRepository.save(agendamento);
          break;
        }

        case HorarioEdicaoMudancaTipoOperacao.MOVER: {
          if (!mudanca.calendarioAgendamento?.id) break;
          const existing = await this.calendarioAgendamentoRepository.findById(
            mudanca.calendarioAgendamento?.id,
          );
          if (!existing) break;

          if (dados.dataInicio !== undefined)
            existing.dataInicio = new Date(dados.dataInicio as string);
          if (dados.dataFim !== undefined)
            existing.dataFim = dados.dataFim ? new Date(dados.dataFim as string) : null;
          if (dados.horarioInicio !== undefined)
            existing.horarioInicio = dados.horarioInicio as string;
          if (dados.horarioFim !== undefined) existing.horarioFim = dados.horarioFim as string;
          if (dados.nome !== undefined) existing.nome = dados.nome as string;
          if (dados.diaInteiro !== undefined) existing.diaInteiro = dados.diaInteiro as boolean;
          await this.calendarioAgendamentoRepository.save(existing);
          break;
        }

        case HorarioEdicaoMudancaTipoOperacao.REMOVER: {
          if (!mudanca.calendarioAgendamento?.id) break;
          const toRemove = await this.calendarioAgendamentoRepository.findById(
            mudanca.calendarioAgendamento?.id,
          );
          if (!toRemove) break;
          toRemove.status = CalendarioAgendamentoStatus.INATIVO;
          await this.calendarioAgendamentoRepository.save(toRemove);
          break;
        }
      }
    }
  }
}
