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
import { ensureCapacidadeETurno } from "./calendario-agendamento-capacidade-turno.util";
import { ensureIfMatch } from "./calendario-agendamento-precondition.util";

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

    await ensureCapacidadeETurno(accessContext, {
      turmaIds,
      ambienteIds,
      horarioInicio: effectiveHorarioInicio,
      horarioFim: effectiveHorarioFim,
      turmaFindOneHandler: this.turmaFindOneHandler,
      ambienteFindOneHandler: this.ambienteFindOneHandler,
    });

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
