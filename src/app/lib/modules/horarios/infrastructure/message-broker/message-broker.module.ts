import { Module } from "@nestjs/common";
import { MessageBrokerService } from "./message-broker.service";
import { MessageBrokerContainerService } from "./message-broker-container.service";
import { MessageBrokerSubscribeService } from "./message-broker-subscribe.service";

@Module({
  providers: [MessageBrokerService, MessageBrokerContainerService, MessageBrokerSubscribeService],
  exports: [MessageBrokerService, MessageBrokerContainerService, MessageBrokerSubscribeService],
})
export class MessageBrokerModule {}
