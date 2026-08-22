import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import type { CalendarioAgendamentoUpdateCommand } from "../../domain/commands/calendario-agendamento-update.command";
import { ICalendarioAgendamentoUpdateCommandHandler } from "../../domain/commands/calendario-agendamento-update.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoConflitoService } from "../calendario-agendamento-conflito.service";
import { ensureIfMatch } from "./calendario-agendamento-precondition.util";

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
export class CalendarioAgendamentoUpdateCommandHandlerImpl
  implements ICalendarioAgendamentoUpdateCommandHandler
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
    dto: CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoUpdateCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioAgendamento.entityName, dto.id);
    ensureIfMatch(domain, dto.ifMatch, dto.id);

    // Detectar se ha campos de metadata (nome/cor)
    const hasMetadataChanges = dto.nome !== undefined || dto.cor !== undefined;

    // Detectar se ha campos versionados
    const hasVersionedChanges =
      dto.dataInicio !== undefined ||
      dto.dataFim !== undefined ||
      dto.diaInteiro !== undefined ||
      dto.horarioInicio !== undefined ||
      dto.horarioFim !== undefined ||
      dto.repeticao !== undefined ||
      dto.turmas !== undefined ||
      dto.perfis !== undefined ||
      dto.calendariosLetivos !== undefined ||
      dto.ofertasFormacao !== undefined ||
      dto.modalidades !== undefined ||
      dto.ambientes !== undefined ||
      dto.diarios !== undefined ||
      dto.campus !== undefined ||
      dto.colecao !== undefined ||
      dto.motivo !== undefined;

    // Atualizar metadata (nome/cor) sem gerar nova versao
    if (hasMetadataChanges) {
      await this.repository.updateMetadata(domain.identificadorExterno, {
        nome: dto.nome,
        cor: dto.cor,
      });
    }

    // Verificar conflitos de horario com os dados resultantes (dto sobrepoe domain)
    const effectiveDataInicio = dto.dataInicio ?? domain.dataInicio;
    const effectiveDataFim = dto.dataFim !== undefined ? dto.dataFim : domain.dataFim;
    const effectiveDiaInteiro = dto.diaInteiro !== undefined ? dto.diaInteiro : domain.diaInteiro;

    let effectiveHorarioInicio = dto.horarioInicio ?? domain.horarioInicio;
    let effectiveHorarioFim = dto.horarioFim ?? domain.horarioFim;

    // Quando dia inteiro, forçar horários para cobrir o dia completo
    if (effectiveDiaInteiro) {
      effectiveHorarioInicio = "00:00:00";
      effectiveHorarioFim = "23:59:59";
    }

    const effectiveTurmas = dto.turmas ?? domain.turmas;
    const effectivePerfis = dto.perfis ?? domain.perfis;
    const effectiveAmbientes = dto.ambientes ?? domain.ambientes;

    const turmaIds = effectiveTurmas.map((t) => t.id);
    const perfilIds = effectivePerfis.map((p) => p.id);
    const ambienteIds = effectiveAmbientes.map((a) => a.id);

    if (
      effectiveHorarioInicio &&
      effectiveHorarioFim &&
      (turmaIds.length > 0 || perfilIds.length > 0 || ambienteIds.length > 0)
    ) {
      await this.conflitoService.ensureSemConflito(accessContext, {
        dataInicio: effectiveDataInicio,
        dataFim: effectiveDataFim,
        horarioInicio: effectiveHorarioInicio,
        horarioFim: effectiveHorarioFim,
        turmaIds,
        perfilIds,
        ambienteIds,
        excludeIdentificadorExterno: domain.identificadorExterno,
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

    // Verificar se o horário efetivo do agendamento cabe dentro do turno da(s) turma(s)
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

    // Criar nova versao se campos versionados foram alterados
    let resultId = dto.id;

    if (hasVersionedChanges) {
      domain.close();
      const newVersion = CalendarioAgendamento.createNewVersion(domain, {
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim,
        diaInteiro: dto.diaInteiro,
        horarioInicio: dto.horarioInicio,
        horarioFim: dto.horarioFim,
        repeticao: dto.repeticao,
        turmas: dto.turmas,
        perfis: dto.perfis,
        calendariosLetivos: dto.calendariosLetivos,
        ofertasFormacao: dto.ofertasFormacao,
        modalidades: dto.modalidades,
        ambientes: dto.ambientes,
        diarios: dto.diarios,
        campus: dto.campus,
        colecao: dto.colecao,
        motivo: dto.motivo,
        autorId: accessContext?.requestActor?.id ?? null,
      });

      await this.repository.saveNewVersion(domain, newVersion);
      resultId = newVersion.id;

      if (newVersion.colecao) {
        await this.colecaoSyncService.registrarMudanca({
          colecaoId: newVersion.colecao.id,
          agendamentoId: newVersion.id,
          tipoOperacao: "update",
        });
      }
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, resultId);
    ensureExists(result, CalendarioAgendamento.entityName, resultId);

    return result;
  }
}
