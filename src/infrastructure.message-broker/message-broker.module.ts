import { Module } from "@nestjs/common";
import { IMessageBrokerService, IQueueService } from "@/domain/abstractions/message-broker";
import { BullMqQueueService } from "./bullmq-queue.service";
import { MessageBrokerService } from "./message-broker.service";

@Module({
  providers: [
    BullMqQueueService,
    {
      provide: IQueueService,
      useExisting: BullMqQueueService,
    },
    MessageBrokerService,
    {
      provide: IMessageBrokerService,
      useExisting: MessageBrokerService,
    },
  ],
  exports: [MessageBrokerService, IMessageBrokerService, IQueueService],
})
export class MessageBrokerModule {}
