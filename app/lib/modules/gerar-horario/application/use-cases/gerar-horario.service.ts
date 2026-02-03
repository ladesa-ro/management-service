import { Injectable } from "@nestjs/common";
import { MessageBrokerService } from "@/modules/@shared/infrastructure/message-broker";

@Injectable()
export class GerarHorarioService {
  constructor(private messageBrokerService: MessageBrokerService) {}

  publishMessage() {
    return this.messageBrokerService.publishDbEvent();
  }

  async publishTimetableRequest<TRequest, TResponse>(request: TRequest, timeoutMs?: number): Promise<TResponse> {
    return this.messageBrokerService.publishTimetableRequest<TRequest, TResponse>(request, timeoutMs);
  }
}
