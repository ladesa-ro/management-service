import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories";
import type { CalendarioColecaoMudancasDesdeQuery } from "../../domain/queries/calendario-colecao-mudancas-desde.query";
import { ICalendarioColecaoMudancasDesdeQueryHandler } from "../../domain/queries/calendario-colecao-mudancas-desde.query.handler.interface";
import type { CalendarioColecaoMudancasDesdeQueryResult } from "../../domain/queries/calendario-colecao-mudancas-desde.query.result";

@DeclareImplementation()
export class CalendarioColecaoMudancasDesdeQueryHandlerImpl
  implements ICalendarioColecaoMudancasDesdeQueryHandler
{
  constructor(
    @DeclareDependency(ICalendarioAgendamentoRepository)
    private readonly agendamentoRepository: ICalendarioAgendamentoRepository,
    @DeclareDependency(CalendarioColecaoSyncService)
    private readonly colecaoSyncService: CalendarioColecaoSyncService,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    query: CalendarioColecaoMudancasDesdeQuery,
  ): Promise<CalendarioColecaoMudancasDesdeQueryResult> {
    const syncToken = await this.colecaoSyncService.obterSyncTokenAtual(query.colecaoId);

    if (query.desde >= syncToken) {
      return { syncToken, agendamentos: [] };
    }

    const agendamentos = await this.agendamentoRepository.findByColecaoId(query.colecaoId);

    return { syncToken, agendamentos };
  }
}
