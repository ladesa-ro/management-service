import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import type { IQueueService } from "@/domain/abstractions/message-broker";
import { IQueueService as IQueueServiceToken } from "@/domain/abstractions/message-broker";
import { Dep } from "@/domain/dependency-injection";
import type { IQueueOptions } from "@/infrastructure.config/options/queue/queue-options.interface";
import { IQueueOptions as IQueueOptionsToken } from "@/infrastructure.config/options/queue/queue-options.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
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
  nomeEstagiario?: string;
  tokenAprovacaoId: string;
  tokenRejeicaoId: string;
  tokenCancelamentoId: string;
}

@Injectable()
export class FolhaPontoNotificacaoConsumer implements OnModuleInit {
  private readonly logger = new Logger(FolhaPontoNotificacaoConsumer.name);

  constructor(
    @Dep(IQueueServiceToken) private readonly queueService: IQueueService,
    @Dep(IQueueOptionsToken) private readonly queueOptions: IQueueOptions | null,
    private readonly whatsappService: FolhaPontoWhatsappService,
    private readonly linkService: FolhaPontoLinkService,
    @Dep(IEstagioRepository) private readonly estagioRepository: IEstagioRepository,
    @Dep(IEstagiarioRepository) private readonly estagiarioRepository: IEstagiarioRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.queueOptions) {
      this.logger.warn("Fila não configurada, notificação de folha de ponto não será consumida.");
      return;
    }

    try {
      await this.queueService.process<FolhaPontoCreatedEventPayload, void>(
        this.queueOptions.queueFolhaPontoWhatsapp,
        (payload) => this.processar(payload),
      );
    } catch (error) {
      this.logger.error(
        `Falha ao registrar consumer de notificação de folha de ponto: ${error}`,
      );
    }
  }

  private async processar(payload: FolhaPontoCreatedEventPayload): Promise<void> {
    const estagio = await this.estagioRepository.loadById(null, payload.estagioId);
    if (!estagio) {
      throw new Error(`Estágio ${payload.estagioId} não encontrado`);
    }

    let nomeEstagiario = payload.nomeEstagiario;

    if (!nomeEstagiario && estagio.estagiario?.id) {
      const estagiarioResult = await this.estagiarioRepository.getFindOneQueryResult(null, {
        id: estagio.estagiario.id,
      });
      nomeEstagiario = estagiarioResult?.perfil?.usuario?.nome ?? undefined;
    }

    if (!nomeEstagiario) {
      nomeEstagiario = "Estagiário";
    }

    await this.whatsappService.enviarSolicitacaoAprovacao({
      folhaPontoId: payload.folhaPontoId,
      nomeEstagiario,
      telefoneSupervisor: payload.telefoneSupervisor,
      data: payload.data,
      horaInicio: payload.horaInicio,
      horaFim: payload.horaFim,
      quantidadeHoras: payload.quantidadeHoras,
      linkAprovar: this.linkService.gerarLinkPublic(payload.tokenAprovacaoId),
      linkRejeitar: this.linkService.gerarLinkPublic(payload.tokenRejeicaoId),
      linkCancelar: this.linkService.gerarLinkPublic(payload.tokenCancelamentoId),
    });
  }
}
