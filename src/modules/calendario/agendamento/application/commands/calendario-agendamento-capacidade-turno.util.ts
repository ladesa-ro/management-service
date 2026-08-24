import { BadRequestException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import type { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import type { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";

// Janelas de horário conhecidas para os nomes de turno mais comuns em pt-BR.
// `Turma.periodo` é texto livre (sem enum) — só validamos quando o valor bate
// com um destes padrões; "integral"/"diurno" cobrem o dia inteiro e por isso
// não entram na lista (nada a validar).
const TURNOS_CONHECIDOS: Array<{ padroes: string[]; inicio: string; fim: string; label: string }> =
  [
    { padroes: ["matutino", "manha"], inicio: "06:00:00", fim: "12:00:00", label: "06:00–12:00" },
    { padroes: ["vespertino", "tarde"], inicio: "12:00:00", fim: "18:00:00", label: "12:00–18:00" },
    { padroes: ["noturno", "noite"], inicio: "18:00:00", fim: "23:59:59", label: "18:00–23:59" },
  ];

function normalizarPeriodo(periodo: string): string {
  return periodo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getJanelaTurno(periodo: string) {
  const normalizado = normalizarPeriodo(periodo);
  return (
    TURNOS_CONHECIDOS.find((turno) =>
      turno.padroes.some((padrao) => normalizado.includes(padrao)),
    ) ?? null
  );
}

/**
 * Capacidade do ambiente e turno da turma: as duas validações que `create` e
 * `update` já aplicavam, extraídas para reuso nos demais pontos de escrita de
 * agendamento (editar-ocorrência, editar-série, adicionar-data-avulsa), que
 * podem alterar turma/ambiente/horário de uma ocorrência sem passar por
 * nenhum dos dois.
 */
export async function ensureCapacidadeETurno(
  accessContext: IAccessContext | null,
  params: {
    turmaIds: string[];
    ambienteIds: string[];
    horarioInicio: string | null;
    horarioFim: string | null;
    turmaFindOneHandler: ITurmaFindOneQueryHandler;
    ambienteFindOneHandler: IAmbienteFindOneQueryHandler;
  },
): Promise<void> {
  const {
    turmaIds,
    ambienteIds,
    horarioInicio,
    horarioFim,
    turmaFindOneHandler,
    ambienteFindOneHandler,
  } = params;

  // Validar se a soma do numero estimado de alunos das turmas cabe na capacidade
  // do(s) ambiente(s) agendado(s). Pula silenciosamente quando falta dado de
  // qualquer um dos dois lados — mesma filosofia da checagem de turno abaixo.
  if (ambienteIds.length > 0 && turmaIds.length > 0) {
    let somaAlunosEstimados = 0;
    let temNumeroEstimadoAlunos = false;

    for (const turmaId of turmaIds) {
      const turma = await turmaFindOneHandler.execute(accessContext, { id: turmaId });
      if (turma?.numeroEstimadoAlunos != null) {
        somaAlunosEstimados += turma.numeroEstimadoAlunos;
        temNumeroEstimadoAlunos = true;
      }
    }

    if (temNumeroEstimadoAlunos) {
      const capacidadeExcedida: string[] = [];

      for (const ambienteId of ambienteIds) {
        const ambiente = await ambienteFindOneHandler.execute(accessContext, { id: ambienteId });
        if (ambiente?.capacidade != null && somaAlunosEstimados > ambiente.capacidade) {
          capacidadeExcedida.push(
            `O ambiente ${ambiente.nome} tem capacidade para ${ambiente.capacidade} aluno(s), mas o total estimado de alunos é ${somaAlunosEstimados}`,
          );
        }
      }

      if (capacidadeExcedida.length > 0) {
        throw new BadRequestException(
          `Capacidade do ambiente excedida. ${capacidadeExcedida.join("; ")}.`,
        );
      }
    }
  }

  // Verificar se o horário efetivo do agendamento cabe dentro do turno da(s) turma(s)
  if (horarioInicio && horarioFim && turmaIds.length > 0) {
    const foraDoTurno: string[] = [];

    for (const turmaId of turmaIds) {
      const turma = await turmaFindOneHandler.execute(accessContext, { id: turmaId });
      if (!turma) continue;

      const janela = getJanelaTurno(turma.periodo);
      // Período sem correspondência conhecida: campo é texto livre, então a ausência
      // de match não pode bloquear um uso legítimo — pulamos silenciosamente.
      if (!janela) continue;

      if (horarioFim <= janela.inicio || horarioInicio >= janela.fim) {
        foraDoTurno.push(
          `A turma ${turma.nome ?? turma.id} é do turno ${turma.periodo} (${janela.label}), mas o agendamento é de ${horarioInicio} a ${horarioFim}`,
        );
      }
    }

    if (foraDoTurno.length > 0) {
      throw new BadRequestException(`Horário fora do turno da turma. ${foraDoTurno.join("; ")}.`);
    }
  }
}
