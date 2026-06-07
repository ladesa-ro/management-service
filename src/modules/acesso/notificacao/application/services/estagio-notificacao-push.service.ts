import { Injectable } from "@nestjs/common";
import { getNowISO } from "@/utils/date";
import {
  ESTAGIO_WS_ROOMS,
  type EstagioNotificacaoPayload,
  type EstagioWsRoom,
} from "../../domain/estagio-notificacao.types";
import { NotificacaoGateway } from "../../presentation.websocket/notificacao.gateway";

/**
 * Serviço de push de notificações do módulo de Estágio.
 *
 * Orquestra a emissão de eventos WebSocket para os rooms corretos,
 * construindo os payloads padronizados a partir de dados de domínio.
 *
 * Usado pelos command handlers e pelo cron de alertas de prazo.
 */
@Injectable()
export class EstagioNotificacaoPushService {
  constructor(private readonly gateway: NotificacaoGateway) {}

  // ──────────────────────────────────────────────────────────────────────────
  // HELPERS PRIVADOS
  // ──────────────────────────────────────────────────────────────────────────

  private emit(
    room: EstagioWsRoom,
    payload: Omit<EstagioNotificacaoPayload, "room" | "timestamp">,
  ): void {
    const full: EstagioNotificacaoPayload = {
      ...payload,
      room,
      timestamp: getNowISO(),
    };
    this.gateway.emitToRoom(room, full);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STATUS DO ESTÁGIO
  // ──────────────────────────────────────────────────────────────────────────

  notificarEstagioFaseInicial(estagioId: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.STATUS, {
      evento: "estagio_criado",
      titulo: "Novo estágio cadastrado",
      conteudo: estagiarioNome
        ? `O estágio de ${estagiarioNome} foi criado com sucesso (fase inicial).`
        : `Estágio #${estagioId} cadastrado no sistema.`,
      prioridade: "media",
      categoria: "status",
      estagioId,
      estagiarioNome,
    });
  }

  notificarEstagioEmAndamento(estagioId: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.STATUS, {
      evento: "estagio_iniciado",
      titulo: "Estágio iniciado",
      conteudo: estagiarioNome
        ? `O estágio de ${estagiarioNome} passou para EM ANDAMENTO.`
        : `Estágio #${estagioId} iniciado.`,
      prioridade: "media",
      categoria: "status",
      estagioId,
      estagiarioNome,
    });
  }

  notificarEstagioAptoEncerramento(estagioId: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.STATUS, {
      evento: "estagio_apto_encerramento",
      titulo: "Estágio apto para encerramento",
      conteudo: estagiarioNome
        ? `${estagiarioNome} cumpriu todas as horas. Estágio apto para encerrar.`
        : `Estágio #${estagioId} apto para encerramento.`,
      prioridade: "alta",
      categoria: "status",
      estagioId,
      estagiarioNome,
    });
  }

  notificarEstagioEncerrado(
    estagioId: string,
    estagiarioNome?: string,
    encerramentoPor?: string | null,
  ): void {
    this.emit(ESTAGIO_WS_ROOMS.STATUS, {
      evento: "estagio_encerrado",
      titulo: "Estágio encerrado",
      conteudo: estagiarioNome
        ? `Estágio de ${estagiarioNome} encerrado.${encerramentoPor ? ` Responsável: ${encerramentoPor}.` : ""}`
        : `Estágio #${estagioId} encerrado.`,
      prioridade: "media",
      categoria: "status",
      estagioId,
      estagiarioNome,
    });
  }

  notificarEstagioRescindido(
    estagioId: string,
    estagiarioNome?: string,
    motivoRescisao?: string | null,
  ): void {
    this.emit(ESTAGIO_WS_ROOMS.STATUS, {
      evento: "estagio_rescindido",
      titulo: "Estágio rescindido",
      conteudo: estagiarioNome
        ? `Estágio de ${estagiarioNome} rescindido.${motivoRescisao ? ` Motivo: ${motivoRescisao}.` : ""}`
        : `Estágio #${estagioId} rescindido.`,
      prioridade: "alta",
      categoria: "status",
      estagioId,
      estagiarioNome,
    });
  }

  notificarEstagioComPendencia(
    estagioId: string,
    resumoPendencias: string,
    estagiarioNome?: string,
  ): void {
    // Emite em dois rooms: status e alertas
    const base = {
      evento: "estagio_com_pendencia",
      titulo: "Estágio com pendência",
      conteudo: estagiarioNome
        ? `Estágio de ${estagiarioNome} com pendência: ${resumoPendencias}`
        : `Estágio #${estagioId} pendente: ${resumoPendencias}`,
      prioridade: "alta" as const,
      categoria: "alerta" as const,
      estagioId,
      estagiarioNome,
    };

    this.emit(ESTAGIO_WS_ROOMS.ALERTAS, base);
  }

  notificarStatusAtualizado(estagioId: string, novoStatus: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.STATUS, {
      evento: "estagio_status_atualizado",
      titulo: "Status do estágio atualizado",
      conteudo: estagiarioNome
        ? `Status do estágio de ${estagiarioNome} alterado para ${novoStatus}.`
        : `Estágio #${estagioId}: status → ${novoStatus}.`,
      prioridade: "baixa",
      categoria: "status",
      estagioId,
      estagiarioNome,
      metadata: { novoStatus },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // ALERTAS DE PRAZO
  // ──────────────────────────────────────────────────────────────────────────

  notificarPrazoVencendo(
    estagioId: string,
    diasRestantes: number,
    dataFim: string,
    estagiarioNome?: string,
  ): void {
    const isCritico = diasRestantes <= 7;
    const isAlto = diasRestantes <= 15;

    this.emit(ESTAGIO_WS_ROOMS.PRAZOS, {
      evento:
        diasRestantes <= 0
          ? "prazo_vencido"
          : diasRestantes <= 7
            ? "prazo_vencendo_7d"
            : diasRestantes <= 15
              ? "prazo_vencendo_15d"
              : "prazo_vencendo_30d",
      titulo:
        diasRestantes <= 0
          ? "Estágio com prazo vencido"
          : `Estágio vence em ${diasRestantes} dia${diasRestantes > 1 ? "s" : ""}`,
      conteudo:
        diasRestantes <= 0
          ? estagiarioNome
            ? `Estágio de ${estagiarioNome} passou da data de encerramento (${dataFim}) sem ser finalizado.`
            : `Estágio #${estagioId} venceu em ${dataFim} e não foi encerrado.`
          : estagiarioNome
            ? `Estágio de ${estagiarioNome} vence em ${diasRestantes} dia(s) — ${dataFim}.`
            : `Estágio #${estagioId} vence em ${diasRestantes} dia(s) — ${dataFim}.`,
      prioridade: isCritico ? "critica" : isAlto ? "alta" : "media",
      categoria: "prazo",
      estagioId,
      estagiarioNome,
      metadata: { diasRestantes, dataFim },
    });
  }

  notificarAditivoNecessario(estagioId: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.PRAZOS, {
      evento: "aditivo_necessario",
      titulo: "Aditivo de prazo necessário",
      conteudo: estagiarioNome
        ? `O estágio de ${estagiarioNome} requer aditivo — vigência expirada.`
        : `Estágio #${estagioId}: aditivo necessário para prorrogação.`,
      prioridade: "alta",
      categoria: "prazo",
      estagioId,
      estagiarioNome,
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // DOCUMENTOS E SEGUROS
  // ──────────────────────────────────────────────────────────────────────────

  notificarSeguroAusente(estagioId: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.DOCUMENTOS, {
      evento: "seguro_ausente",
      titulo: "Seguro não cadastrado",
      conteudo: estagiarioNome
        ? `Estágio de ${estagiarioNome} sem apólice de seguro. Regularize.`
        : `Estágio #${estagioId} sem seguro cadastrado.`,
      prioridade: "alta",
      categoria: "documento",
      estagioId,
      estagiarioNome,
    });
  }

  notificarOrientadorAusente(estagioId: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.DOCUMENTOS, {
      evento: "orientador_sem_vinculo",
      titulo: "Estágio sem orientador",
      conteudo: estagiarioNome
        ? `O estágio de ${estagiarioNome} não tem orientador vinculado.`
        : `Estágio #${estagioId} sem orientador atribuído.`,
      prioridade: "media",
      categoria: "documento",
      estagioId,
      estagiarioNome,
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // VISITAS
  // ──────────────────────────────────────────────────────────────────────────

  notificarVisitasAVencer(
    estagioId: string,
    visitasAVencer: number,
    estagiarioNome?: string,
  ): void {
    this.emit(ESTAGIO_WS_ROOMS.VISITAS, {
      evento: "visita_a_vencer",
      titulo: "Visita de orientação a vencer",
      conteudo: estagiarioNome
        ? `${visitasAVencer} visita(s) pendente(s) no estágio de ${estagiarioNome}.`
        : `Estágio #${estagioId}: ${visitasAVencer} visita(s) a vencer.`,
      prioridade: "alta",
      categoria: "visita",
      estagioId,
      estagiarioNome,
      metadata: { visitasAVencer },
    });
  }

  notificarVisitasNaoRealizadas(
    estagioId: string,
    visitasNaoRealizadas: number,
    estagiarioNome?: string,
  ): void {
    this.emit(ESTAGIO_WS_ROOMS.VISITAS, {
      evento: "visita_nao_realizada",
      titulo: "Visita não realizada",
      conteudo: estagiarioNome
        ? `${visitasNaoRealizadas} visita(s) não realizada(s) no estágio de ${estagiarioNome}.`
        : `Estágio #${estagioId}: ${visitasNaoRealizadas} visita(s) não realizada(s).`,
      prioridade: "alta",
      categoria: "visita",
      estagioId,
      estagiarioNome,
      metadata: { visitasNaoRealizadas },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // IMPORTAÇÃO CSV
  // ──────────────────────────────────────────────────────────────────────────

  notificarImportacaoIniciada(totalLinhas: number): void {
    this.emit(ESTAGIO_WS_ROOMS.IMPORTACAO, {
      evento: "importacao_iniciada",
      titulo: "Importação de estágios iniciada",
      conteudo: `Processando ${totalLinhas} linha(s) em background. Aguarde a conclusão.`,
      prioridade: "baixa",
      categoria: "importacao",
      metadata: { totalLinhas },
    });
  }

  notificarImportacaoConcluida(criados: number, falhas: number, erros: string[]): void {
    const temErros = falhas > 0;
    this.emit(ESTAGIO_WS_ROOMS.IMPORTACAO, {
      evento: temErros ? "importacao_erro_parcial" : "importacao_concluida",
      titulo: temErros ? "Importação concluída com erros" : "Importação concluída",
      conteudo: `Sucessos: ${criados} | Falhas: ${falhas}.${
        erros.length > 0 ? ` Primeiros erros: ${erros.slice(0, 3).join("; ")}` : ""
      }`,
      prioridade: falhas === 0 ? "media" : criados === 0 ? "critica" : "alta",
      categoria: "importacao",
      metadata: { criados, falhas, erros: erros.slice(0, 10) },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // ALERTAS GERAIS
  // ──────────────────────────────────────────────────────────────────────────

  notificarCargaHorariaExcedida(
    estagioId: string,
    horasRegistradas: number,
    cargaHorariaContratada: number,
    estagiarioNome?: string,
  ): void {
    this.emit(ESTAGIO_WS_ROOMS.ALERTAS, {
      evento: "carga_horaria_excedida",
      titulo: "Carga horária excedida",
      conteudo: estagiarioNome
        ? `Estágio de ${estagiarioNome}: ${horasRegistradas}h registradas (máx: ${cargaHorariaContratada}h). Regularize.`
        : `Estágio #${estagioId}: carga horária excedida.`,
      prioridade: "alta",
      categoria: "alerta",
      estagioId,
      estagiarioNome,
      metadata: { horasRegistradas, cargaHorariaContratada },
    });
  }

  notificarEstagiarioContratado(estagioId: string, estagiarioNome?: string): void {
    this.emit(ESTAGIO_WS_ROOMS.ALERTAS, {
      evento: "contratado_pos_estagio",
      titulo: "Estagiário foi contratado",
      conteudo: estagiarioNome
        ? `${estagiarioNome} foi ou será contratado pela empresa após o estágio!`
        : `Estagiário do estágio #${estagioId} foi contratado!`,
      prioridade: "baixa",
      categoria: "alerta",
      estagioId,
      estagiarioNome,
    });
  }
}
