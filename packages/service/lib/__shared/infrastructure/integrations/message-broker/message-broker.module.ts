import { Module } from "@nestjs/common";
import { MessageBrokerService } from "./domain/message-broker.service";
import { MessageBrokerContainerService } from "./domain/message-broker-container.service";
import { MessageBrokerSubscribeService } from "./domain/message-broker-subscribe.service";

@Module({
  providers: [MessageBrokerService, MessageBrokerContainerService, MessageBrokerSubscribeService],
  exports: [MessageBrokerService, MessageBrokerContainerService, MessageBrokerSubscribeService],
})
export class MessageBrokerModule {
}
