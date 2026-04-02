import type { IAccessContext } from "@/domain/abstractions";
import {
  type IMessageBrokerService,
  IMessageBrokerService as IMessageBrokerServiceToken,
} from "@/domain/abstractions/message-broker";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  type IGerarHorarioPublishTimetableRequestCommand,
  IGerarHorarioPublishTimetableRequestCommandHandler,
} from "@/modules/calendario/gerar-horario/domain/commands/gerar-horario-publish-timetable-request.command.handler.interface";

@Impl()
export class GerarHorarioPublishTimetableRequestCommandHandlerImpl
  implements IGerarHorarioPublishTimetableRequestCommandHandler
{
  constructor(
    @Dep(IMessageBrokerServiceToken)
    private readonly messageBrokerService: IMessageBrokerService,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    { request, timeoutMs }: IGerarHorarioPublishTimetableRequestCommand,
  ): Promise<unknown> {
    return this.messageBrokerService.publishTimetableRequest(request, timeoutMs);
  }
}
