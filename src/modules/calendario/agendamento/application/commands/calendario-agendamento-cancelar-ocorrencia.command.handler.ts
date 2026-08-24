import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoMetadata } from "../../domain/calendario-agendamento-metadata";
import type { CalendarioAgendamentoCancelarOcorrenciaCommand } from "../../domain/commands/calendario-agendamento-cancelar-ocorrencia.command";
import { ICalendarioAgendamentoCancelarOcorrenciaCommandHandler } from "../../domain/commands/calendario-agendamento-cancelar-ocorrencia.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { ensureIfMatch } from "./calendario-agendamento-precondition.util";

@Impl()
export class CalendarioAgendamentoCancelarOcorrenciaCommandHandlerImpl
  implements ICalendarioAgendamentoCancelarOcorrenciaCommandHandler
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
    dto: CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoCancelarOcorrenciaCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCancelarPropria(accessContext, dto.id);

    const serieOrigem = await this.repository.loadById(accessContext, dto.id);
    ensureExists(serieOrigem, CalendarioAgendamento.entityName, dto.id);
    ensureIfMatch(serieOrigem, dto.ifMatch, dto.id);

    if (!serieOrigem.repeticao) {
      throw new BadRequestException(
        "Só é possível cancelar uma ocorrência isolada de um agendamento recorrente.",
      );
    }

    const cancelamento = CalendarioAgendamento.cancelarOcorrencia(
      serieOrigem,
      dto.dataOcorrencia,
      accessContext?.requestActor?.id ?? null,
      dto.motivo ?? null,
    );

    await this.repository.save(cancelamento);

    if (cancelamento.colecao) {
      await this.colecaoSyncService.registrarMudanca({
        colecaoId: cancelamento.colecao.id,
        agendamentoId: cancelamento.id,
        tipoOperacao: "cancelar-ocorrencia",
      });
    }

    const metadataOrigem = await this.repository.loadMetadata(serieOrigem.identificadorExterno);
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: cancelamento.identificadorExterno,
      nome: metadataOrigem?.nome ?? null,
      cor: metadataOrigem?.cor ?? null,
    });
    await this.repository.saveMetadata(metadata);

    const result = await this.repository.getFindOneQueryResult(accessContext, cancelamento.id);
    ensureExists(result, CalendarioAgendamento.entityName, cancelamento.id);

    return result;
  }
}
