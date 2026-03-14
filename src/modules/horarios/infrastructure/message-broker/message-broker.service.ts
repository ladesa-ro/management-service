import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  IMessageBrokerOptions,
  IMessageBrokerOptions as IMessageBrokerOptionsToken,
} from "@/infrastructure.config/options/message-broker/message-broker-options.interface";
import { MessageBrokerContainerService } from "./message-broker-container.service";

@Injectable()
export class MessageBrokerService {
  private readonly logger = new Logger(MessageBrokerService.name);

  constructor(
    private messageBrokerContainerService: MessageBrokerContainerService,
    @Inject(IMessageBrokerOptionsToken)
    private readonly messageBrokerOptions: IMessageBrokerOptions,
  ) {}

  async publishTimetableRequest<TRequest, TResponse>(
    request: TRequest,
    timeoutMs = 60000,
  ): Promise<TResponse> {
    const broker = await this.messageBrokerContainerService.getBroker();
    const queueRequest = this.messageBrokerOptions.queueTimetableRequest;
    const queueResponse = this.messageBrokerOptions.queueTimetableResponse;

    return new Promise<TResponse>((resolve, reject) => {
      let subscription: any;

      const timeout = setTimeout(() => {
        subscription?.cancel();
        reject(new Error(`Timeout aguardando resposta da queue ${queueResponse}`));
      }, timeoutMs);

      broker
        .subscribe(queueResponse)
        .then((sub) => {
          subscription = sub;

          subscription.on("message", (_message, content, ackOrNoAck) => {
            clearTimeout(timeout);
            ackOrNoAck();
            subscription.cancel();

            try {
              const response = (
                typeof content === "string" ? JSON.parse(content) : content
              ) as TResponse;

              this.logger.log(`Resposta recebida da queue ${queueResponse}`);
              resolve(response);
            } catch (e) {
              reject(new Error("Erro ao parsear resposta JSON: " + e));
            }
          });

          subscription.on("error", (err) => {
            clearTimeout(timeout);
            subscription.cancel();
            reject(err);
          });

          this.logger.log(`Publicando mensagem na queue ${queueRequest}`);
          return broker.publish(queueRequest, JSON.stringify(request));
        })
        .catch((err) => {
          clearTimeout(timeout);
          subscription?.cancel();
          reject(err);
        });
    });
  }
}
