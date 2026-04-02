import type { IAccessContext } from "@/domain/abstractions";
import {
  type IMessageBrokerService,
  IMessageBrokerService as IMessageBrokerServiceToken,
} from "@/domain/abstractions/message-broker";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  IGerarHorarioCreateCommand,
  IGerarHorarioCreateCommandHandler,
} from "../../domain/commands/gerar-horario-create.command.handler.interface";
import { GerarHorario } from "../../domain/gerar-horario";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";

@DeclareImplementation()
export class GerarHorarioCreateCommandHandlerImpl implements IGerarHorarioCreateCommandHandler {
  constructor(
    @DeclareDependency(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
    @DeclareDependency(IMessageBrokerServiceToken)
    private readonly messageBrokerService: IMessageBrokerService,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: IGerarHorarioCreateCommand,
  ): Promise<GerarHorario> {
    const domain = GerarHorario.create(command);

    await this.gerarHorarioRepository.save(domain);

    // Fire-and-forget: publish to timetable generator queue
    // TODO: Build proper GenerateRequest from DB data
    const request = {
      request_id: domain.id,
      date_start: command.dataInicio,
      date_end: command.dataTermino ?? command.dataInicio,
      time_slots: [],
      teachers: [],
      groups: [],
      diaries: [],
      previous_timetable_grid: null,
    };

    await this.messageBrokerService.publishTimetableRequestFireAndForget(request);

    // Update status to PENDENTE after publishing
    domain.markAsPendente(request);
    await this.gerarHorarioRepository.save(domain);

    return domain;
  }
}
