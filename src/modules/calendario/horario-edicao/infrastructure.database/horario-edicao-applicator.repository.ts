import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "@/modules/calendario/agendamento/domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
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
          const domain = CalendarioAgendamento.create({
            tipo: (dados.tipo as CalendarioAgendamentoTipo) ?? CalendarioAgendamentoTipo.AULA,
            nome: (dados.nome as string) ?? null,
            dataInicio: dados.dataInicio as string,
            dataFim: (dados.dataFim as string) ?? null,
            diaInteiro: (dados.diaInteiro as boolean) ?? false,
            horarioInicio: (dados.horarioInicio as string) ?? "00:00:00",
            horarioFim: (dados.horarioFim as string) ?? "23:59:59",
            repeticao: (dados.repeticao as string) ?? null,
            cor: (dados.cor as string) ?? null,
          });
          await this.calendarioAgendamentoRepository.save(domain);
          break;
        }

        case HorarioEdicaoMudancaTipoOperacao.MOVER: {
          if (!mudanca.calendarioAgendamento?.id) break;
          const existing = await this.calendarioAgendamentoRepository.loadById(
            null,
            mudanca.calendarioAgendamento.id,
          );
          if (!existing) break;

          existing.update({
            dataInicio: dados.dataInicio as string | undefined,
            dataFim: dados.dataFim as string | null | undefined,
            horarioInicio: dados.horarioInicio as string | undefined,
            horarioFim: dados.horarioFim as string | undefined,
            nome: dados.nome as string | undefined,
            diaInteiro: dados.diaInteiro as boolean | undefined,
          });
          await this.calendarioAgendamentoRepository.save(existing);
          break;
        }

        case HorarioEdicaoMudancaTipoOperacao.REMOVER: {
          if (!mudanca.calendarioAgendamento?.id) break;
          await this.calendarioAgendamentoRepository.inactivateById(
            mudanca.calendarioAgendamento.id,
          );
          break;
        }
      }
    }
  }
}
