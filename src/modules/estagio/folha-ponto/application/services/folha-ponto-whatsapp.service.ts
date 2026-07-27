import { Injectable, Logger } from "@nestjs/common";
import { WhatsappNotificationsService } from "@/notifications/services/whatsapp-notifications.service";

export interface FolhaPontoNotificacaoData {
  folhaPontoId: string;
  nomeEstagiario: string;
  telefoneSupervisor: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  quantidadeHoras: number;
  linkAprovar: string;
  linkRejeitar: string;
  linkCancelar: string;
}

@Injectable()
export class FolhaPontoWhatsappService {
  private readonly logger = new Logger(FolhaPontoWhatsappService.name);

  constructor(private readonly whatsappService: WhatsappNotificationsService) {}

  async enviarSolicitacaoAprovacao(dados: FolhaPontoNotificacaoData): Promise<void> {
    const mensagem = this.formatarMensagem(dados);
    this.logger.log(
      `Enviando solicitação de aprovação para supervisor (folhaPonto: ${dados.folhaPontoId})`,
    );

    const result = await this.whatsappService.sendNotification({
      phone: dados.telefoneSupervisor,
      message: mensagem,
    });

    if (!result.success) {
      this.logger.error(
        `Falha no envio WhatsApp para folhaPonto ${dados.folhaPontoId}: ${result.error}`,
      );
      throw new Error(`Falha ao enviar notificação WhatsApp: ${result.error}`);
    }
  }

  private formatarMensagem(dados: FolhaPontoNotificacaoData): string {
    return [
      `📋 *Folha de Ponto — Aprovação Pendente*`,
      ``,
      `👤 Estagiário: *${dados.nomeEstagiario}*`,
      `📅 Data: *${dados.data}*`,
      `⏰ Horário: *${dados.horaInicio}* até *${dados.horaFim}*`,
      `⌚ Total: *${dados.quantidadeHoras}h*`,
      ``,
      `Por favor, confirme uma ação acessando os links abaixo:`,
      ``,
      `✅ Aprovar: ${dados.linkAprovar}`,
      `❌ Rejeitar: ${dados.linkRejeitar}`,
      `↩️ Cancelar/Desfazer: ${dados.linkCancelar}`,
      ``,
      `_Estes links expiram em 72 horas._`,
    ].join("\n");
  }
}
