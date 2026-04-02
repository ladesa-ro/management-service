import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioAgendamento } from "@/modules/calendario/agendamento/domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import { CalendarioAgendamentoMetadata } from "@/modules/calendario/agendamento/domain/calendario-agendamento-metadata";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
import type { IHorarioEdicaoApplicator } from "../domain/repositories";
import {
  type HorarioEdicaoMudancaEntity,
  HorarioEdicaoMudancaTipoOperacao,
} from "./typeorm/horario-edicao-mudanca.typeorm.entity";

@Impl()
export class HorarioEdicaoApplicatorTypeOrmAdapter implements IHorarioEdicaoApplicator {
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
  ) {}

  async applyMudancas(mudancas: HorarioEdicaoMudancaEntity[]): Promise<void> {
    for (const mudanca of mudancas) {
      const dados = mudanca.dados;

      switch (mudanca.tipoOperacao) {
        case HorarioEdicaoMudancaTipoOperacao.CRIAR: {
          const domain = CalendarioAgendamento.create({
            tipo: (dados.tipo as CalendarioAgendamentoTipo) ?? CalendarioAgendamentoTipo.AULA,
            dataInicio: dados.dataInicio as string,
            dataFim: (dados.dataFim as string) ?? null,
            diaInteiro: (dados.diaInteiro as boolean) ?? false,
            horarioInicio: (dados.horarioInicio as string) ?? "00:00:00",
            horarioFim: (dados.horarioFim as string) ?? "23:59:59",
            repeticao: (dados.repeticao as string) ?? null,
          });
          await this.calendarioAgendamentoRepository.save(domain);

          // Criar metadata separadamente
          const metadata = CalendarioAgendamentoMetadata.create({
            identificadorExternoCalendarioAgendamento: domain.identificadorExterno,
            nome: (dados.nome as string) ?? null,
            cor: (dados.cor as string) ?? null,
          });
          await this.calendarioAgendamentoRepository.saveMetadata(metadata);
          break;
        }

        case HorarioEdicaoMudancaTipoOperacao.MOVER: {
          if (!mudanca.calendarioAgendamento?.id) break;
          const existing = await this.calendarioAgendamentoRepository.loadById(
            null,
            mudanca.calendarioAgendamento.id,
          );
          if (!existing) break;

          // Separar metadata vs versionados
          const hasMetadata = dados.nome !== undefined;
          const hasVersioned =
            dados.dataInicio !== undefined ||
            dados.dataFim !== undefined ||
            dados.horarioInicio !== undefined ||
            dados.horarioFim !== undefined ||
            dados.diaInteiro !== undefined;

          if (hasMetadata) {
            await this.calendarioAgendamentoRepository.updateMetadata(
              existing.identificadorExterno,
              { nome: dados.nome as string | null | undefined },
            );
          }

          if (hasVersioned) {
            existing.close();
            const newVersion = CalendarioAgendamento.createNewVersion(existing, {
              dataInicio: dados.dataInicio as string | undefined,
              dataFim: dados.dataFim as string | null | undefined,
              horarioInicio: dados.horarioInicio as string | undefined,
              horarioFim: dados.horarioFim as string | undefined,
              diaInteiro: dados.diaInteiro as boolean | undefined,
            });
            await this.calendarioAgendamentoRepository.saveNewVersion(existing, newVersion);
          }
          break;
        }

        case HorarioEdicaoMudancaTipoOperacao.REMOVER: {
          if (!mudanca.calendarioAgendamento?.id) break;
          const toClose = await this.calendarioAgendamentoRepository.loadById(
            null,
            mudanca.calendarioAgendamento.id,
          );
          if (!toClose) break;
          toClose.close();
          await this.calendarioAgendamentoRepository.closeVersion(toClose);
          break;
        }
      }
    }
  }
}
