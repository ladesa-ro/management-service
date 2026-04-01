import { ValidationError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { TurmaDisponibilidadeSaveCommand } from "../../domain/commands/turma-disponibilidade-save.command";
import { ITurmaDisponibilidadeSaveCommandHandler } from "../../domain/commands/turma-disponibilidade-save.command-handler.interface";
import { ITurmaDisponibilidadeRepository } from "../../domain/repositories";
import { TurmaDisponibilidadeConfiguracao } from "../../domain/turma-disponibilidade";
import type { ITurmaDisponibilidadeItem } from "../../domain/turma-disponibilidade.types";

@DeclareImplementation()
export class TurmaDisponibilidadeSaveCommandHandlerImpl
  implements ITurmaDisponibilidadeSaveCommandHandler
{
  constructor(
    @DeclareDependency(ITurmaDisponibilidadeRepository)
    private readonly repository: ITurmaDisponibilidadeRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: TurmaDisponibilidadeSaveCommand,
  ): Promise<TurmaDisponibilidadeConfiguracao[]> {
    const turmaId = command.turmaId;

    if (command.configs.length === 0) {
      return [];
    }

    const results: TurmaDisponibilidadeConfiguracao[] = [];

    for (const configInput of command.configs) {
      const saved = await this.processConfig(turmaId, configInput);
      if (saved) {
        results.push(saved);
      }
    }

    return results;
  }

  private async processConfig(
    turmaId: string,
    configInput: TurmaDisponibilidadeSaveCommand["configs"][number],
  ): Promise<TurmaDisponibilidadeConfiguracao | null> {
    const domingo = this.normalizeToDomingo(configInput.dataInicio);
    const sabado = this.addDays(domingo, 6);

    // Guard: semana passada
    const today = new Date().toISOString().split("T")[0];
    if (sabado < today) {
      throw ValidationError.fromField(
        "data_inicio",
        "Nao e possivel alterar disponibilidade de semanas passadas",
      );
    }

    const horarios: ITurmaDisponibilidadeItem[] = configInput.horarios.flatMap((dia) =>
      dia.intervalos.map((intervalo) => ({
        diaSemana: dia.diaSemana,
        inicio: intervalo.inicio,
        fim: intervalo.fim,
      })),
    );

    const dataInicio = domingo;
    // data_fim null = aplicar para esta semana e futuras; com valor = apenas o range especificado
    const dataFim = configInput.dataFim;

    // Encontrar configs ativas que se sobrepoem ao novo range
    const affected = await this.repository.findActiveOverlapping(turmaId, dataInicio, dataFim);

    for (const existing of affected) {
      await this.repository.deactivateById(existing.id);

      // Fragmento "antes": preservar a config existente ate o dia anterior ao novo range
      if (existing.dataInicio < dataInicio) {
        const before = TurmaDisponibilidadeConfiguracao.clone(existing, {
          dataInicio: existing.dataInicio,
          dataFim: this.subtractOneDay(dataInicio),
        });
        await this.repository.save(before);
      }

      // Fragmento "depois": apenas no modo "so esta semana",
      // retomar a config existente apos o range editado
      if (dataFim !== null && (existing.dataFim === null || existing.dataFim > dataFim)) {
        const after = TurmaDisponibilidadeConfiguracao.clone(existing, {
          dataInicio: this.addOneDay(dataFim),
          dataFim: existing.dataFim,
        });
        await this.repository.save(after);
      }
    }

    // Criar nova config
    const newConfig = TurmaDisponibilidadeConfiguracao.create({
      turma: { id: turmaId },
      dataInicio,
      dataFim,
      horarios,
    });
    await this.repository.save(newConfig);

    // Retornar a config salva
    return this.repository.findByWeek(turmaId, domingo);
  }

  private normalizeToDomingo(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getUTCDay();
    date.setUTCDate(date.getUTCDate() - day);
    return date.toISOString().split("T")[0];
  }

  private subtractOneDay(dateStr: string): string {
    const date = new Date(dateStr);
    date.setUTCDate(date.getUTCDate() - 1);
    return date.toISOString().split("T")[0];
  }

  private addOneDay(dateStr: string): string {
    const date = new Date(dateStr);
    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().split("T")[0];
  }

  private addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().split("T")[0];
  }
}
