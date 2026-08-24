import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoEscopoEdicaoSerie } from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoMetadata } from "../../domain/calendario-agendamento-metadata";
import type { CalendarioAgendamentoEditarSerieCommand } from "../../domain/commands/calendario-agendamento-editar-serie.command";
import { ICalendarioAgendamentoEditarSerieCommandHandler } from "../../domain/commands/calendario-agendamento-editar-serie.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoConflitoService } from "../calendario-agendamento-conflito.service";
import { ensureCapacidadeETurno } from "./calendario-agendamento-capacidade-turno.util";
import { normalizeDate } from "./calendario-agendamento-data.util";
import { ensureIfMatch } from "./calendario-agendamento-precondition.util";
import { dividirRegraRecorrencia } from "./calendario-agendamento-rrule-split.util";

@Impl()
export class CalendarioAgendamentoEditarSerieCommandHandlerImpl
  implements ICalendarioAgendamentoEditarSerieCommandHandler
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
    dto: CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoEditarSerieCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const serieOrigem = await this.repository.loadById(accessContext, dto.id);
    ensureExists(serieOrigem, CalendarioAgendamento.entityName, dto.id);
    ensureIfMatch(serieOrigem, dto.ifMatch, dto.id);

    if (!serieOrigem.repeticao) {
      throw new BadRequestException("Só é possível editar a série de um agendamento recorrente.");
    }

    if (dto.escopo === CalendarioAgendamentoEscopoEdicaoSerie.TODAS) {
      return this.editarTodasAsOcorrencias(accessContext, serieOrigem, dto);
    }

    return this.editarEstaESeguintes(accessContext, serieOrigem, dto);
  }

  private async editarTodasAsOcorrencias(
    accessContext: IAccessContext | null,
    serieOrigem: CalendarioAgendamento,
    dto: CalendarioAgendamentoEditarSerieCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    const effectiveTurmas = dto.turmas ?? serieOrigem.turmas;
    const effectivePerfis = dto.perfis ?? serieOrigem.perfis;
    const effectiveAmbientes = dto.ambientes ?? serieOrigem.ambientes;

    const effectiveHorarioInicio = dto.horarioInicio ?? serieOrigem.horarioInicio;
    const effectiveHorarioFim = dto.horarioFim ?? serieOrigem.horarioFim;
    const effectiveTurmaIds = effectiveTurmas.map((t) => t.id);
    const effectiveAmbienteIds = effectiveAmbientes.map((a) => a.id);

    await this.conflitoService.ensureSemConflito(accessContext, {
      dataInicio: dto.dataInicio ?? serieOrigem.dataInicio,
      dataFim: dto.dataFim !== undefined ? dto.dataFim : serieOrigem.dataFim,
      horarioInicio: effectiveHorarioInicio,
      horarioFim: effectiveHorarioFim,
      turmaIds: effectiveTurmaIds,
      perfilIds: effectivePerfis.map((p) => p.id),
      ambienteIds: effectiveAmbienteIds,
      excludeIdentificadorExterno: serieOrigem.identificadorExterno,
    });

    await ensureCapacidadeETurno(accessContext, {
      turmaIds: effectiveTurmaIds,
      ambienteIds: effectiveAmbienteIds,
      horarioInicio: effectiveHorarioInicio,
      horarioFim: effectiveHorarioFim,
      turmaFindOneHandler: this.turmaFindOneHandler,
      ambienteFindOneHandler: this.ambienteFindOneHandler,
    });

    serieOrigem.close();
    const novaVersao = CalendarioAgendamento.createNewVersion(serieOrigem, {
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diaInteiro: dto.diaInteiro,
      horarioInicio: dto.horarioInicio,
      horarioFim: dto.horarioFim,
      repeticao: dto.repeticao,
      campus: dto.campus,
      colecao: dto.colecao,
      motivo: dto.motivo,
      turmas: dto.turmas,
      perfis: dto.perfis,
      calendariosLetivos: dto.calendariosLetivos,
      ofertasFormacao: dto.ofertasFormacao,
      modalidades: dto.modalidades,
      ambientes: dto.ambientes,
      diarios: dto.diarios,
      autorId: accessContext?.requestActor?.id ?? null,
    });

    await this.repository.saveNewVersion(serieOrigem, novaVersao);

    if (novaVersao.colecao) {
      await this.colecaoSyncService.registrarMudanca({
        colecaoId: novaVersao.colecao.id,
        agendamentoId: novaVersao.id,
        tipoOperacao: "editar-serie",
      });
    }

    const result = await this.repository.getFindOneQueryResult(accessContext, novaVersao.id);
    ensureExists(result, CalendarioAgendamento.entityName, novaVersao.id);

    return result;
  }

  private async editarEstaESeguintes(
    accessContext: IAccessContext | null,
    serieOrigem: CalendarioAgendamento,
    dto: CalendarioAgendamentoEditarSerieCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    const dtstartOriginal = normalizeDate(serieOrigem.dataInicio);
    const dataCorte = normalizeDate(dto.dataOcorrencia);

    const { regraAntiga, regraNova } = dividirRegraRecorrencia(
      serieOrigem.repeticao!,
      dtstartOriginal,
      dataCorte,
    );

    const duracaoMs = serieOrigem.dataFim
      ? normalizeDate(serieOrigem.dataFim).getTime() - dtstartOriginal.getTime()
      : 0;
    const novaDataFim = serieOrigem.dataFim
      ? new Date(dataCorte.getTime() + duracaoMs).toISOString().slice(0, 10)
      : null;

    const novaTurmas = dto.turmas ?? serieOrigem.turmas;
    const novaPerfis = dto.perfis ?? serieOrigem.perfis;
    const novaAmbientes = dto.ambientes ?? serieOrigem.ambientes;
    const novoHorarioInicio = dto.horarioInicio ?? serieOrigem.horarioInicio;
    const novoHorarioFim = dto.horarioFim ?? serieOrigem.horarioFim;

    const novaTurmaIds = novaTurmas.map((t) => t.id);
    const novaAmbienteIds = novaAmbientes.map((a) => a.id);

    await this.conflitoService.ensureSemConflito(accessContext, {
      dataInicio: dto.dataOcorrencia,
      dataFim: novaDataFim,
      horarioInicio: novoHorarioInicio,
      horarioFim: novoHorarioFim,
      turmaIds: novaTurmaIds,
      perfilIds: novaPerfis.map((p) => p.id),
      ambienteIds: novaAmbienteIds,
      excludeIdentificadorExterno: serieOrigem.identificadorExterno,
    });

    await ensureCapacidadeETurno(accessContext, {
      turmaIds: novaTurmaIds,
      ambienteIds: novaAmbienteIds,
      horarioInicio: novoHorarioInicio,
      horarioFim: novoHorarioFim,
      turmaFindOneHandler: this.turmaFindOneHandler,
      ambienteFindOneHandler: this.ambienteFindOneHandler,
    });

    const novaSerie = CalendarioAgendamento.create({
      tipo: serieOrigem.tipo,
      dataInicio: dto.dataOcorrencia,
      dataFim: novaDataFim,
      diaInteiro: dto.diaInteiro ?? serieOrigem.diaInteiro,
      horarioInicio: novoHorarioInicio,
      horarioFim: novoHorarioFim,
      repeticao: regraNova,
      status: serieOrigem.status ?? undefined,
      campus: dto.campus !== undefined ? dto.campus : serieOrigem.campus,
      colecao: dto.colecao !== undefined ? dto.colecao : serieOrigem.colecao,
      motivo: dto.motivo ?? null,
      autorId: accessContext?.requestActor?.id ?? null,
      turmas: novaTurmas,
      perfis: novaPerfis,
      calendariosLetivos: dto.calendariosLetivos ?? serieOrigem.calendariosLetivos,
      ofertasFormacao: dto.ofertasFormacao ?? serieOrigem.ofertasFormacao,
      modalidades: dto.modalidades ?? serieOrigem.modalidades,
      ambientes: novaAmbientes,
      diarios: dto.diarios ?? serieOrigem.diarios,
    });

    serieOrigem.close();
    const serieAntigaTruncada = CalendarioAgendamento.createNewVersion(serieOrigem, {
      repeticao: regraAntiga,
    });
    await this.repository.saveNewVersion(serieOrigem, serieAntigaTruncada);

    await this.repository.save(novaSerie);

    if (novaSerie.colecao) {
      await this.colecaoSyncService.registrarMudanca({
        colecaoId: novaSerie.colecao.id,
        agendamentoId: novaSerie.id,
        tipoOperacao: "editar-serie",
      });
    }

    const metadataOrigem = await this.repository.loadMetadata(serieOrigem.identificadorExterno);
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: novaSerie.identificadorExterno,
      nome: metadataOrigem?.nome ?? null,
      cor: metadataOrigem?.cor ?? null,
    });
    await this.repository.saveMetadata(metadata);

    await this.repository.reatribuirExcecoesParaNovaSerie({
      deIdentificadorExterno: serieOrigem.identificadorExterno,
      paraIdentificadorExterno: novaSerie.identificadorExterno,
      aPartirDe: dto.dataOcorrencia,
    });

    const result = await this.repository.getFindOneQueryResult(accessContext, novaSerie.id);
    ensureExists(result, CalendarioAgendamento.entityName, novaSerie.id);

    return result;
  }
}
