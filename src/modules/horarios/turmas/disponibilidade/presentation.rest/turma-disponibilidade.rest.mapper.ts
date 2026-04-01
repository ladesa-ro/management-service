import type { TurmaDisponibilidadeConfiguracao } from "../domain/turma-disponibilidade";
import type {
  TurmaDisponibilidadeConfigOutputRestDto,
  TurmaDisponibilidadeConfigWithIdOutputRestDto,
} from "./turma-disponibilidade.rest.dto";

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export function mapConfigToOutput(
  config: TurmaDisponibilidadeConfiguracao,
): TurmaDisponibilidadeConfigOutputRestDto {
  const diasMap = new Map<number, { inicio: string; fim: string }[]>();

  for (const item of config.horarios) {
    const intervalos = diasMap.get(item.diaSemana) ?? [];
    intervalos.push({ inicio: item.inicio, fim: item.fim });
    diasMap.set(item.diaSemana, intervalos);
  }

  const horarios = Array.from(diasMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([diaSemana, intervalos]) => ({
      dia_semana: diaSemana,
      intervalos: intervalos.sort((a, b) => a.inicio.localeCompare(b.inicio)),
    }));

  return {
    data_inicio: config.dataInicio,
    data_fim: config.dataFim,
    identificador_externo_grade_horaria: config.identificadorExternoGradeHoraria ?? null,
    horarios,
  };
}

export function mapConfigToOutputWithId(
  config: TurmaDisponibilidadeConfiguracao,
): TurmaDisponibilidadeConfigWithIdOutputRestDto {
  return {
    id: config.id,
    ...mapConfigToOutput(config),
  };
}
