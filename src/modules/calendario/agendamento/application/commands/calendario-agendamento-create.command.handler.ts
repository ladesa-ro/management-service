import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoMetadata } from "../../domain/calendario-agendamento-metadata";
import type { CalendarioAgendamentoCreateCommand } from "../../domain/commands/calendario-agendamento-create.command";
import { ICalendarioAgendamentoCreateCommandHandler } from "../../domain/commands/calendario-agendamento-create.command.handler.interface";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoConflitoService } from "../calendario-agendamento-conflito.service";

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

@Impl()
export class CalendarioAgendamentoCreateCommandHandlerImpl
  implements ICalendarioAgendamentoCreateCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(ICalendarioAgendamentoPermissionChecker)
    private readonly permissionChecker: ICalendarioAgendamentoPermissionChecker,
    @Dep(ITurmaFindOneQueryHandler)
    private readonly turmaFindOneHandler: ITurmaFindOneQueryHandler,
    @Dep(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
    @Dep(CalendarioColecaoSyncService)
    private readonly colecaoSyncService: CalendarioColecaoSyncService,
    @Dep(CalendarioAgendamentoConflitoService)
    private readonly conflitoService: CalendarioAgendamentoConflitoService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoCreateCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    // Verificar conflitos de horario se ha dados suficientes
    const turmaIds = (dto.turmas ?? []).map((t) => t.id);
    const perfilIds = (dto.perfis ?? []).map((p) => p.id);
    const ambienteIds = (dto.ambientes ?? []).map((a) => a.id);

    // Quando dia inteiro, forçar horários para cobrir o dia completo
    let effectiveHorarioInicio = dto.horarioInicio;
    let effectiveHorarioFim = dto.horarioFim;

    if (dto.diaInteiro) {
      effectiveHorarioInicio = "00:00:00";
      effectiveHorarioFim = "23:59:59";
    }

    if (
      effectiveHorarioInicio &&
      effectiveHorarioFim &&
      (turmaIds.length > 0 || perfilIds.length > 0 || ambienteIds.length > 0)
    ) {
      await this.conflitoService.ensureSemConflito(accessContext, {
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim ?? null,
        horarioInicio: effectiveHorarioInicio,
        horarioFim: effectiveHorarioFim,
        turmaIds,
        perfilIds,
        ambienteIds,
      });
    }

    // Validar se a soma do numero estimado de alunos das turmas cabe na capacidade
    // do(s) ambiente(s) agendado(s). Pula silenciosamente quando falta dado de
    // qualquer um dos dois lados — mesma filosofia da checagem de turno abaixo.
    if (ambienteIds.length > 0 && turmaIds.length > 0) {
      let somaAlunosEstimados = 0;
      let temNumeroEstimadoAlunos = false;

      for (const turmaId of turmaIds) {
        const turma = await this.turmaFindOneHandler.execute(accessContext, { id: turmaId });
        if (turma?.numeroEstimadoAlunos != null) {
          somaAlunosEstimados += turma.numeroEstimadoAlunos;
          temNumeroEstimadoAlunos = true;
        }
      }

      if (temNumeroEstimadoAlunos) {
        const capacidadeExcedida: string[] = [];

        for (const ambienteId of ambienteIds) {
          const ambiente = await this.ambienteFindOneHandler.execute(accessContext, {
            id: ambienteId,
          });
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

    // Herdar a coleção padrão do curso da primeira turma vinculada quando o dto não
    // traz colecaoId explícito. A escolha explícita do chamador sempre prevalece.
    let effectiveColecao = dto.colecao;
    if (effectiveColecao === undefined && turmaIds.length > 0) {
      const primeiraTurma = await this.turmaFindOneHandler.execute(accessContext, {
        id: turmaIds[0],
      });
      if (primeiraTurma?.curso?.colecaoPadrao) {
        effectiveColecao = primeiraTurma.curso.colecaoPadrao;
      }
    }

    // Verificar se o horário do agendamento cabe dentro do turno da(s) turma(s)
    if (effectiveHorarioInicio && effectiveHorarioFim && turmaIds.length > 0) {
      const foraDoTurno: string[] = [];

      for (const turmaId of turmaIds) {
        const turma = await this.turmaFindOneHandler.execute(accessContext, { id: turmaId });
        if (!turma) continue;

        const janela = getJanelaTurno(turma.periodo);
        // Período sem correspondência conhecida: campo é texto livre, então a ausência
        // de match não pode bloquear um uso legítimo — pulamos silenciosamente.
        if (!janela) continue;

        if (effectiveHorarioFim <= janela.inicio || effectiveHorarioInicio >= janela.fim) {
          foraDoTurno.push(
            `A turma ${turma.nome ?? turma.id} é do turno ${turma.periodo} (${janela.label}), mas o agendamento é de ${effectiveHorarioInicio} a ${effectiveHorarioFim}`,
          );
        }
      }

      if (foraDoTurno.length > 0) {
        throw new BadRequestException(`Horário fora do turno da turma. ${foraDoTurno.join("; ")}.`);
      }
    }

    const { nome, cor, ...domainData } = dto;
    const domain = CalendarioAgendamento.create({
      ...domainData,
      colecao: effectiveColecao,
      autorId: accessContext?.requestActor?.id ?? null,
    });

    // Criar metadata (nome/cor) na tabela separada
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: domain.identificadorExterno,
      nome,
      cor,
    });

    await this.repository.save(domain);
    await this.repository.saveMetadata(metadata);

    if (domain.colecao) {
      await this.colecaoSyncService.registrarMudanca({
        colecaoId: domain.colecao.id,
        agendamentoId: domain.id,
        tipoOperacao: "create",
      });
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, domain.id);
    ensureExists(result, CalendarioAgendamento.entityName, domain.id);

    return result;
  }
}
