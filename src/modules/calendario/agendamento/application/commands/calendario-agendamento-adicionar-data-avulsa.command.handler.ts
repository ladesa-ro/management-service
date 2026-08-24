import { BadRequestException } from "@nestjs/common";
import { rrulestr } from "rrule";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoMetadata } from "../../domain/calendario-agendamento-metadata";
import type { CalendarioAgendamentoAdicionarDataAvulsaCommand } from "../../domain/commands/calendario-agendamento-adicionar-data-avulsa.command";
import { ICalendarioAgendamentoAdicionarDataAvulsaCommandHandler } from "../../domain/commands/calendario-agendamento-adicionar-data-avulsa.command.handler.interface";
import type { CalendarioAgendamentoFindOneQuery } from "../../domain/queries/calendario-agendamento-find-one.query";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { CalendarioAgendamentoConflitoService } from "../calendario-agendamento-conflito.service";
import { normalizeDate } from "./calendario-agendamento-data.util";
import { ensureIfMatch } from "./calendario-agendamento-precondition.util";

@Impl()
export class CalendarioAgendamentoAdicionarDataAvulsaCommandHandlerImpl
  implements ICalendarioAgendamentoAdicionarDataAvulsaCommandHandler
{
  constructor(
    @Dep(ICalendarioAgendamentoRepository)
    private readonly repository: ICalendarioAgendamentoRepository,
    @Dep(ICalendarioAgendamentoPermissionChecker)
    private readonly permissionChecker: ICalendarioAgendamentoPermissionChecker,
    @Dep(CalendarioColecaoSyncService)
    private readonly colecaoSyncService: CalendarioColecaoSyncService,
    @Dep(CalendarioAgendamentoConflitoService)
    private readonly conflitoService: CalendarioAgendamentoConflitoService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoFindOneQuery & CalendarioAgendamentoAdicionarDataAvulsaCommand,
  ): Promise<CalendarioAgendamentoFindOneQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const serieOrigem = await this.repository.loadById(accessContext, dto.id);
    ensureExists(serieOrigem, CalendarioAgendamento.entityName, dto.id);
    ensureIfMatch(serieOrigem, dto.ifMatch, dto.id);

    if (!serieOrigem.repeticao) {
      throw new BadRequestException(
        "Só é possível adicionar uma data avulsa a um agendamento recorrente.",
      );
    }

    if (this.ehDataGeradaPelaRegra(serieOrigem, dto.dataOcorrencia)) {
      throw new BadRequestException(
        "Essa data já é gerada pela regra de recorrência da série. Use editar-ocorrência para alterá-la.",
      );
    }

    const { id: _id, dataOcorrencia, ...dadosAvulsa } = dto;

    const avulsa = CalendarioAgendamento.adicionarDataAvulsa(serieOrigem, dataOcorrencia, {
      ...dadosAvulsa,
      autorId: accessContext?.requestActor?.id ?? null,
    });

    const turmaIds = avulsa.turmas.map((t) => t.id);
    const perfilIds = avulsa.perfis.map((p) => p.id);
    const ambienteIds = avulsa.ambientes.map((a) => a.id);

    if (turmaIds.length > 0 || perfilIds.length > 0 || ambienteIds.length > 0) {
      await this.conflitoService.ensureSemConflito(accessContext, {
        dataInicio: avulsa.dataInicio,
        dataFim: avulsa.dataFim,
        horarioInicio: avulsa.horarioInicio,
        horarioFim: avulsa.horarioFim,
        turmaIds,
        perfilIds,
        ambienteIds,
        excludeIdentificadorExterno: serieOrigem.identificadorExterno,
      });
    }

    await this.repository.save(avulsa);

    if (avulsa.colecao) {
      await this.colecaoSyncService.registrarMudanca({
        colecaoId: avulsa.colecao.id,
        agendamentoId: avulsa.id,
        tipoOperacao: "adicionar-data-avulsa",
      });
    }

    const metadataOrigem = await this.repository.loadMetadata(serieOrigem.identificadorExterno);
    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: avulsa.identificadorExterno,
      nome: metadataOrigem?.nome ?? null,
      cor: metadataOrigem?.cor ?? null,
    });
    await this.repository.saveMetadata(metadata);

    const result = await this.repository.getFindOneQueryResult(accessContext, avulsa.id);
    ensureExists(result, CalendarioAgendamento.entityName, avulsa.id);

    return result;
  }

  private ehDataGeradaPelaRegra(
    serieOrigem: CalendarioAgendamento,
    dataOcorrencia: string,
  ): boolean {
    try {
      const dtstart = normalizeDate(serieOrigem.dataInicio);
      const data = normalizeDate(dataOcorrencia);
      const rule = rrulestr(serieOrigem.repeticao!, { dtstart });
      return rule.between(data, data, true).length > 0;
    } catch {
      // Se a RRULE for inválida, deixa a validação para outro lugar — não bloqueia aqui
      return false;
    }
  }
}
