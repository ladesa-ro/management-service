import { BadRequestException } from "@nestjs/common";
import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoMetadata } from "../../domain/calendario-agendamento-metadata";
import type { CalendarioAgendamentoEditarOcorrenciaCommand } from "../../domain/commands/calendario-agendamento-editar-ocorrencia.command";
import { ICalendarioAgendamentoEditarOcorrenciaCommandHandler } from "../../domain/commands/calendario-agendamento-editar-ocorrencia.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";

@Impl()
export class CalendarioAgendamentoEditarOcorrenciaCommandHandlerImpl
  implements ICalendarioAgendamentoEditarOcorrenciaCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(ICalendarioAgendamentoPermissionChecker)
    private readonly permissionChecker: ICalendarioAgendamentoPermissionChecker,
    @Dep(CalendarioColecaoSyncService)
    private readonly colecaoSyncService: CalendarioColecaoSyncService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoEditarOcorrenciaCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const serieOrigem = await this.repository.loadById(accessContext, dto.id);
    ensureExists(serieOrigem, CalendarioAgendamento.entityName, dto.id);
    ensureActiveEntity(serieOrigem, CalendarioAgendamento.entityName, dto.id);

    if (!serieOrigem.repeticao) {
      throw new BadRequestException(
        "Só é possível editar uma ocorrência isolada de um agendamento recorrente.",
      );
    }

    const { id: _id, dataOcorrencia, ...dadosExcecao } = dto;

    const excecao = CalendarioAgendamento.criarExcecao(serieOrigem, dataOcorrencia, {
      ...dadosExcecao,
      autorId: accessContext?.requestActor?.id ?? null,
    });

    const turmaIds = excecao.turmas.map((t) => t.id);
    const perfilIds = excecao.perfis.map((p) => p.id);
    const ambienteIds = excecao.ambientes.map((a) => a.id);

    if (turmaIds.length > 0 || perfilIds.length > 0 || ambienteIds.length > 0) {
      const conflicts = await this.repository.findConflicting({
        dataInicio: excecao.dataInicio,
        dataFim: excecao.dataFim,
        horarioInicio: excecao.horarioInicio,
        horarioFim: excecao.horarioFim,
        turmaIds,
        perfilIds,
        ambienteIds,
        excludeIdentificadorExterno: serieOrigem.identificadorExterno,
      });

      if (conflicts.length > 0) {
        const descricoes = conflicts.map(
          (c) => `${c.recurso} (${c.recursoId}) no agendamento ${c.identificadorExterno}`,
        );
        throw new BadRequestException(
          `Conflito de horário detectado. Os seguintes recursos já possuem agendamento no mesmo período: ${descricoes.join("; ")}.`,
        );
      }
    }

    await this.repository.save(excecao);

    if (excecao.colecao) {
      await this.colecaoSyncService.registrarMudanca({
        colecaoId: excecao.colecao.id,
        agendamentoId: excecao.id,
        tipoOperacao: "editar-ocorrencia",
      });
    }

    const metadataOrigem = await this.repository.loadMetadata(serieOrigem.identificadorExterno);
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: excecao.identificadorExterno,
      nome: metadataOrigem?.nome ?? null,
      cor: metadataOrigem?.cor ?? null,
    });
    await this.repository.saveMetadata(metadata);

    const result = await this.repository.getFindOneQueryResult(accessContext, excecao.id);
    ensureExists(result, CalendarioAgendamento.entityName, excecao.id);

    return result;
  }
}
