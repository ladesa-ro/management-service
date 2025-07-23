import { MessageBrokerService } from "@/infrastructure/integrations/message-broker";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GerarHorarioService {
  constructor(private messageBrokerService: MessageBrokerService) {}

  publishMessage() {
    return this.messageBrokerService.publishDbEvent();
  }
}
