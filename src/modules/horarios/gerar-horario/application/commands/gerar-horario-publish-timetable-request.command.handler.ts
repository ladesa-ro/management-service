import { DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  type IGerarHorarioPublishTimetableRequestCommand,
  IGerarHorarioPublishTimetableRequestCommandHandler,
} from "@/modules/horarios/gerar-horario/domain/commands/gerar-horario-publish-timetable-request.command.handler.interface";
import { MessageBrokerService } from "@/modules/horarios/infrastructure/message-broker";

@DeclareImplementation()
export class GerarHorarioPublishTimetableRequestCommandHandlerImpl
  implements IGerarHorarioPublishTimetableRequestCommandHandler
{
  constructor(private readonly messageBrokerService: MessageBrokerService) {}

  async execute(
    _accessContext: AccessContext | null,
    { request, timeoutMs }: IGerarHorarioPublishTimetableRequestCommand,
  ): Promise<unknown> {
    return this.messageBrokerService.publishTimetableRequest(request, timeoutMs);
  }
}
