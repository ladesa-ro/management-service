import { Logger } from "@nestjs/common";
import type { SubscriberSessionAsPromised } from "rascal";
import { ServiceUnavailableError } from "@/application/errors";
import { IMessageBrokerService } from "@/domain/abstractions/message-broker";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { IMessageBrokerOptions } from "@/infrastructure.config/options/message-broker/message-broker-options.interface";
import { IMessageBrokerOptions as IMessageBrokerOptionsToken } from "@/infrastructure.config/options/message-broker/message-broker-options.interface";
import { MessageBrokerContainerService } from "./message-broker-container.service";

@DeclareImplementation()
export class MessageBrokerService implements IMessageBrokerService {
  private readonly logger = new Logger(MessageBrokerService.name);

  constructor(
    private messageBrokerContainerService: MessageBrokerContainerService,
    @DeclareDependency(IMessageBrokerOptionsToken)
    private readonly messageBrokerOptions: IMessageBrokerOptions | null,
  ) {}

  async publishTimetableRequestFireAndForget<TRequest>(request: TRequest): Promise<void> {
    const broker = await this.messageBrokerContainerService.getBroker();
    const options = this.#ensureOptions();
    const queueRequest = options.queueTimetableRequest;
    this.logger.log(`Publicando mensagem fire-and-forget na queue ${queueRequest}`);
    await broker.publish(queueRequest, JSON.stringify(request));
  }

  async publishTimetableRequest<TRequest, TResponse>(
    request: TRequest,
    timeoutMs = 60000,
  ): Promise<TResponse> {
    const broker = await this.messageBrokerContainerService.getBroker();
    const options = this.#ensureOptions();
    const queueRequest = options.queueTimetableRequest;
    const queueResponse = options.queueTimetableResponse;

    return new Promise<TResponse>((resolve, reject) => {
      let subscription: SubscriberSessionAsPromised | undefined;

      const timeout = setTimeout(() => {
        subscription?.cancel();
        reject(new Error(`Timeout aguardando resposta da queue ${queueResponse}`));
      }, timeoutMs);

      broker
        .subscribe(queueResponse)
        .then((sub) => {
          subscription = sub;

          sub.on("message", (_message, content, ackOrNoAck) => {
            clearTimeout(timeout);
            ackOrNoAck();
            sub.cancel();

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

          sub.on("error", (err) => {
            clearTimeout(timeout);
            sub.cancel();
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

  #ensureOptions(): IMessageBrokerOptions {
    if (!this.messageBrokerOptions) {
      throw new ServiceUnavailableError(undefined, "message-broker");
    }

    return this.messageBrokerOptions;
  }
}
