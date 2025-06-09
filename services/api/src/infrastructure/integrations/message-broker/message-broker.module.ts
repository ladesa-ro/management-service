import { Module } from "@nestjs/common";
import { MessageBrokerContainerService } from "./message-broker-container.service";
import { MessageBrokerSubscribeService } from "./message-broker-subscribe.service";
import { MessageBrokerService } from "./message-broker.service";

@Module({
  providers: [
    //
    MessageBrokerService,
    MessageBrokerContainerService,
    MessageBrokerSubscribeService,
  ],
  exports: [
    //
    MessageBrokerService,
    MessageBrokerContainerService,
    MessageBrokerSubscribeService,
  ],
})
export class MessageBrokerModule {}
