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
import { ensureCapacidadeETurno } from "./calendario-agendamento-capacidade-turno.util";

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

    let effectiveColecao = dto.colecao;
    if (effectiveColecao === undefined && turmaIds.length > 0) {
      const primeiraTurma = await this.turmaFindOneHandler.execute(accessContext, {
        id: turmaIds[0],
      });
      if (primeiraTurma?.curso?.colecaoPadrao) {
        effectiveColecao = primeiraTurma.curso.colecaoPadrao;
      }
    }

    await ensureCapacidadeETurno(accessContext, {
      turmaIds,
      ambienteIds,
      horarioInicio: effectiveHorarioInicio ?? null,
      horarioFim: effectiveHorarioFim ?? null,
      turmaFindOneHandler: this.turmaFindOneHandler,
      ambienteFindOneHandler: this.ambienteFindOneHandler,
    });

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
