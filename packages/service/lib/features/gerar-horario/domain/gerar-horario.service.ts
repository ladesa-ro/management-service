import { Injectable } from "@nestjs/common";
import { MessageBrokerService } from "@/infrastructure-antigo/integrations/message-broker";

@Injectable()
export class GerarHorarioService {
  constructor(private messageBrokerService: MessageBrokerService) {}

  publishMessage() {
    return this.messageBrokerService.publishDbEvent();
  }
}
