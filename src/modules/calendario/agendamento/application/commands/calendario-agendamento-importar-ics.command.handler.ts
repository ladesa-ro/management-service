import { BadRequestException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { uuidSchema } from "@/shared/validation/schemas";
import { ICalendarioAgendamentoPermissionChecker } from "../../domain/authorization";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoMetadata } from "../../domain/calendario-agendamento-metadata";
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import type { CalendarioAgendamentoImportarIcsCommand } from "../../domain/commands/calendario-agendamento-importar-ics.command";
import { ICalendarioAgendamentoImportarIcsCommandHandler } from "../../domain/commands/calendario-agendamento-importar-ics.command.handler.interface";
import type {
  CalendarioAgendamentoImportarIcsRejeitado,
  CalendarioAgendamentoImportarIcsResult,
} from "../../domain/commands/calendario-agendamento-importar-ics.command.result";
import { ICalendarioAgendamentoRepository } from "../../domain/repositories/calendario-agendamento.repository.interface";
import { type IIcsVeventParseado, parseIcs } from "./calendario-agendamento-importar-ics.util";

function isValidUuid(value: string): boolean {
  return uuidSchema.safeParse(value).success;
}

@Impl()
export class CalendarioAgendamentoImportarIcsCommandHandlerImpl
  implements ICalendarioAgendamentoImportarIcsCommandHandler
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
    dto: CalendarioAgendamentoImportarIcsCommand,
  ): Promise<CalendarioAgendamentoImportarIcsResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, {
      dto: { colecao: dto.colecao ?? null },
    });

    let parsed: ReturnType<typeof parseIcs>;
    try {
      parsed = parseIcs(dto.conteudo);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : "Conteúdo .ics inválido.",
      );
    }

    const rejeitados: CalendarioAgendamentoImportarIcsRejeitado[] = [...parsed.rejeitados];

    let criados = 0;
    let puladosPorUidDuplicado = 0;
    const idsCriados: string[] = [];

    for (const evento of parsed.eventos) {
      try {
        const uidReaproveitavel = evento.uid && isValidUuid(evento.uid) ? evento.uid : null;

        if (uidReaproveitavel) {
          const jaExiste = await this.repository.existsByIdentificadorExterno(uidReaproveitavel);
          if (jaExiste) {
            puladosPorUidDuplicado++;
            continue;
          }
        }

        const { domain, metadata } = this.criarAgendamento(accessContext, dto, evento);
        if (uidReaproveitavel) {
          domain.identificadorExterno = uidReaproveitavel;
          metadata.identificadorExternoCalendarioAgendamento = uidReaproveitavel;
        }

        await this.repository.save(domain);
        await this.repository.saveMetadata(metadata);

        if (domain.colecao) {
          await this.colecaoSyncService.registrarMudanca({
            colecaoId: domain.colecao.id,
            agendamentoId: domain.id,
            tipoOperacao: "importar-ics",
          });
        }

        criados++;
        idsCriados.push(domain.id);
      } catch (error) {
        rejeitados.push({
          index: evento.index,
          uid: evento.uid,
          motivo:
            error instanceof Error ? error.message : "Erro desconhecido ao criar agendamento.",
        });
      }
    }

    rejeitados.sort((a, b) => a.index - b.index);

    return { criados, puladosPorUidDuplicado, rejeitados, idsCriados };
  }

  private criarAgendamento(
    accessContext: IAccessContext | null,
    dto: CalendarioAgendamentoImportarIcsCommand,
    evento: IIcsVeventParseado,
  ): { domain: CalendarioAgendamento; metadata: CalendarioAgendamentoMetadata } {
    const domain = CalendarioAgendamento.create({
      tipo: CalendarioAgendamentoTipo.EVENTO,
      dataInicio: evento.dataInicio,
      dataFim: evento.dataFim,
      diaInteiro: evento.diaInteiro,
      horarioInicio: evento.horarioInicio,
      horarioFim: evento.horarioFim,
      repeticao: evento.rrule,
      campus: dto.campus ?? null,
      colecao: dto.colecao ?? null,
      motivo: evento.description,
      autorId: accessContext?.requestActor?.id ?? null,
    });

    const metadata = CalendarioAgendamentoMetadata.create({
      identificadorExternoCalendarioAgendamento: domain.identificadorExterno,
      nome: evento.summary,
      cor: null,
    });

    return { domain, metadata };
  }
}
