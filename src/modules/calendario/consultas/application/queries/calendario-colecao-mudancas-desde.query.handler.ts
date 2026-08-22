import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { CalendarioColecaoSyncService } from "@/modules/calendario/colecao/application/calendario-colecao-sync.service";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories";
import type { CalendarioColecaoMudancasDesdeQuery } from "../../domain/queries/calendario-colecao-mudancas-desde.query";
import { ICalendarioColecaoMudancasDesdeQueryHandler } from "../../domain/queries/calendario-colecao-mudancas-desde.query.handler.interface";
import type { CalendarioColecaoMudancasDesdeQueryResult } from "../../domain/queries/calendario-colecao-mudancas-desde.query.result";

/**
 * Consulta de sincronização (RFC 6578-like) para `calendario_colecao`.
 *
 * Não existe tabela de auditoria por trás do `sync_token`, então esta consulta
 * NÃO devolve um diff exato de "quais agendamentos mudaram entre o token X e
 * o atual" — isso exigiria registrar, a cada `registrarMudanca`, qual
 * agendamento mudou e em qual token, o que é escopo novo (tabela nova) fora
 * do que foi pedido.
 *
 * Aproximação adotada: se `desde` já bate com o token atual, nada mudou,
 * devolve lista vazia. Caso contrário, devolve o snapshot completo dos
 * agendamentos ativos da coleção — o cliente reconcilia por cima do que já
 * tem localmente. Correto, porém conservador (pode devolver agendamentos que
 * na prática não mudaram desde o `desde` informado).
 */
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
