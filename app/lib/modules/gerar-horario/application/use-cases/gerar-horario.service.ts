import { Injectable } from "@nestjs/common";
import { MessageBrokerService } from "@/modules/@shared/infrastructure/message-broker";

@Injectable()
export class GerarHorarioService {
  constructor(private messageBrokerService: MessageBrokerService) {}

  publishMessage() {
    return this.messageBrokerService.publishDbEvent();
  }
}
