import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { calendarioWsRoom } from "@/modules/acesso/notificacao/domain/calendario-ws-room.types";
import { NotificacaoGateway } from "@/modules/acesso/notificacao/presentation.websocket/notificacao.gateway";
import type { CalendarioColecaoSyncPayload } from "../domain/calendario-colecao-sync.types";

/**
 * Ponto único do marcador de sincronização (sync-token, RFC 6578) de
 * `calendario_colecao`.
 *
 * `sync_token` vive fora do aggregate `CalendarioColecao`: é um contador de
 * infraestrutura incrementado por escrita em qualquer agendamento vinculado
 * à coleção, não um dado de domínio da coleção em si — por isso é lido/escrito
 * via SQL direto em vez de passar pelo `ICalendarioColecaoRepository`.
 *
 * Chamado pelos 5 command handlers de escrita de `calendario_agendamento`
 * (create, update, editar-ocorrencia, editar-serie, cancelar-ocorrencia) —
 * sempre que o agendamento afetado tem `colecao` preenchida — para manter o
 * contador e o push WebSocket em sincronia num único lugar.
 */
@Impl()
export class CalendarioColecaoSyncService {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly gateway: NotificacaoGateway,
  ) {}

  async registrarMudanca(params: {
    colecaoId: string;
    agendamentoId: string;
    tipoOperacao: string;
  }): Promise<number> {
    const rows: Array<{ sync_token: string | number }> = await this.appTypeormConnection.query(
      `UPDATE calendario_colecao SET sync_token = sync_token + 1 WHERE id = $1 RETURNING sync_token`,
      [params.colecaoId],
    );

    const syncToken = Number(rows[0]?.sync_token ?? 0);

    const payload: CalendarioColecaoSyncPayload = {
      colecaoId: params.colecaoId,
      agendamentoId: params.agendamentoId,
      tipoOperacao: params.tipoOperacao,
      syncToken,
    };

    this.gateway.emitToRoom(calendarioWsRoom(params.colecaoId), payload);

    return syncToken;
  }

  async obterSyncTokenAtual(colecaoId: string): Promise<number> {
    const rows: Array<{ sync_token: string | number }> = await this.appTypeormConnection.query(
      `SELECT sync_token FROM calendario_colecao WHERE id = $1`,
      [colecaoId],
    );

    return Number(rows[0]?.sync_token ?? 0);
  }
}
