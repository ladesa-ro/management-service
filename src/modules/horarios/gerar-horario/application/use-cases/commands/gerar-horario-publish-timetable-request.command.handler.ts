import { Injectable } from "@nestjs/common";
import {
  type IGerarHorarioPublishTimetableRequestCommand,
  IGerarHorarioPublishTimetableRequestCommandHandler,
} from "@/modules/horarios/gerar-horario/domain/commands/gerar-horario-publish-timetable-request.command.handler.interface";
import { MessageBrokerService } from "@/modules/horarios/infrastructure/message-broker";

@Injectable()
export class GerarHorarioPublishTimetableRequestCommandHandlerImpl
  implements IGerarHorarioPublishTimetableRequestCommandHandler
{
  constructor(private readonly messageBrokerService: MessageBrokerService) {}

  async execute({
    request,
    timeoutMs,
  }: IGerarHorarioPublishTimetableRequestCommand): Promise<unknown> {
    return this.messageBrokerService.publishTimetableRequest(request, timeoutMs);
  }
}
