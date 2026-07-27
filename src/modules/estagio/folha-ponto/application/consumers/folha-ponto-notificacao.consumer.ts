import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Dep } from "@/domain/dependency-injection";
import { MessageBrokerContainerService } from "@/infrastructure.message-broker";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { FolhaPontoLinkService } from "../services/folha-ponto-link.service";
import { FolhaPontoWhatsappService } from "../services/folha-ponto-whatsapp.service";

export interface FolhaPontoCreatedEventPayload {
  folhaPontoId: string;
  estagioId: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  quantidadeHoras: number;
  telefoneSupervisor: string;
  nomeSupervisor: string;
  tokenAprovacaoId: string;
  tokenRejeicaoId: string;
  tokenCancelamentoId: string;
}

@Injectable()
export class FolhaPontoNotificacaoConsumer implements OnModuleInit {
  private readonly logger = new Logger(FolhaPontoNotificacaoConsumer.name);

  constructor(
    private readonly messageBrokerContainer: MessageBrokerContainerService,
    private readonly whatsappService: FolhaPontoWhatsappService,
    private readonly linkService: FolhaPontoLinkService,
    @Dep(IEstagioRepository) private readonly estagioRepository: IEstagioRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const broker = await this.messageBrokerContainer.getBroker();

      const subscription = await broker.subscribe("folha_ponto.notificacao.whatsapp");

      subscription.on("message", async (_message, content, ackOrNack) => {
        try {
          const payload = typeof content === "string" ? JSON.parse(content) : content;
          await this.processar(payload);
          ackOrNack(); // ACK
        } catch (error) {
          this.logger.error(`Erro ao processar evento FolhaPonto: ${error}`);
          ackOrNack(error as Error); // NACK → envia para DLQ ou Retry baseado na config
        }
      });

      this.logger.log("Consumer folha_ponto.notificacao.whatsapp inicializado com sucesso.");
    } catch (error) {
      this.logger.warn(`Message broker indisponível — consumer não registrado: ${error}`);
    }
  }

  private async processar(payload: FolhaPontoCreatedEventPayload): Promise<void> {
    const estagio = await this.estagioRepository.loadById(null, payload.estagioId);
    if (!estagio) {
      throw new Error(`Estágio ${payload.estagioId} não encontrado`);
    }

    const nomeEstagiario = "Estagiário";

    await this.whatsappService.enviarSolicitacaoAprovacao({
      folhaPontoId: payload.folhaPontoId,
      nomeEstagiario,
      telefoneSupervisor: payload.telefoneSupervisor,
      data: payload.data,
      horaInicio: payload.horaInicio,
      horaFim: payload.horaFim,
      quantidadeHoras: payload.quantidadeHoras,
      linkAprovar: this.linkService.gerarLink(payload.tokenAprovacaoId),
      linkRejeitar: this.linkService.gerarLink(payload.tokenRejeicaoId),
      linkCancelar: this.linkService.gerarLink(payload.tokenCancelamentoId),
    });
  }
}
