import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Message } from "amqplib";
import { AckOrNack, SubscriberSessionAsPromised } from "rascal";
import { MessageBrokerContainerService } from "./message-broker-container.service";

@Injectable()
export class MessageBrokerSubscribeService implements OnModuleInit {
  private readonly logger = new Logger(MessageBrokerSubscribeService.name);

  #subscription: SubscriberSessionAsPromised | null = null;

  constructor(
    //

    private messageBrokerContainerService: MessageBrokerContainerService,
  ) {}

  onModuleInit() {
    this.setup();
  }

  async setup() {
    if (!this.#subscription) {
      const broker = await this.messageBrokerContainerService.getBroker();

      const subscribe = await broker.subscribe("horario_gerado");

      subscribe.on("message", (message, content, ackOrNoAck) => {
        this.logger.log("Horario Recebido:\n\n\n\n " + content.toString());
        ackOrNoAck();
      });

      subscribe.on("error", console.error);
      this.#subscription = subscribe;
    }
  }
}
