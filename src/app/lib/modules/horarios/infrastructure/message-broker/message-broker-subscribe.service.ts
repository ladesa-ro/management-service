import { Injectable, OnModuleInit } from "@nestjs/common";
import { SubscriberSessionAsPromised } from "rascal";
import { MessageBrokerContainerService } from "./message-broker-container.service";

@Injectable()
export class MessageBrokerSubscribeService implements OnModuleInit {
  #subscription: SubscriberSessionAsPromised | null = null;

  constructor(_messageBrokerContainerService: MessageBrokerContainerService) {}

  onModuleInit() {
    this.setup();
  }

  async setup() {
    if (!this.#subscription) {
      // const broker = await this.messageBrokerContainerService.getBroker();
      //
      // const subscribe = await broker.subscribe("horario_gerado");
      //
      // subscribe.on("message", (message, content, ackOrNoAck) => {
      //   this.logger.log("Horario Recebido:\n\n\n\n " + content.toString());
      //   ackOrNoAck();
      // });
      //
      // subscribe.on("error", console.error);
      // this.#subscription = subscribe;
    }
  }
}
