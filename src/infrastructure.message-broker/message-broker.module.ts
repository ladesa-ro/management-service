import { Module } from "@nestjs/common";
import { IMessageBrokerService } from "@/domain/abstractions/message-broker";
import { MessageBrokerService } from "./message-broker.service";
import { MessageBrokerContainerService } from "./message-broker-container.service";
import { MessageBrokerSubscribeService } from "./message-broker-subscribe.service";

@Module({
  providers: [
    MessageBrokerContainerService,
    MessageBrokerSubscribeService,
    MessageBrokerService,
    {
      provide: IMessageBrokerService,
      useExisting: MessageBrokerService,
    },
  ],
  exports: [
    MessageBrokerService,
    MessageBrokerContainerService,
    MessageBrokerSubscribeService,
    IMessageBrokerService,
  ],
})
export class MessageBrokerModule {}
