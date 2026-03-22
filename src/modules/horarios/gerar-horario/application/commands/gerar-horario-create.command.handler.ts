import {
  type IMessageBrokerService,
  IMessageBrokerService as IMessageBrokerServiceToken,
} from "@/domain/abstractions/message-broker";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { AccessContext } from "@/server/access-context";
import type {
  IGerarHorarioCreateCommand,
  IGerarHorarioCreateCommandHandler,
} from "../../domain/commands/gerar-horario-create.command.handler.interface";
import {
  GerarHorarioDuracao,
  GerarHorarioStatus,
  type IGerarHorario,
} from "../../domain/gerar-horario.types";
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
    _accessContext: AccessContext | null,
    command: IGerarHorarioCreateCommand,
  ): Promise<IGerarHorario> {
    const entity: IGerarHorario = {
      id: generateUuidV7(),
      status: GerarHorarioStatus.SOLICITADO,
      duracao: GerarHorarioDuracao.TEMPORARIO,
      dataInicio: new Date(command.dataInicio),
      dataTermino: command.dataTermino ? new Date(command.dataTermino) : null,
      requisicaoGerador: null,
      respostaGerador: null,
      dateCreated: new Date(),
    };

    await this.gerarHorarioRepository.save(entity);

    // Fire-and-forget: publish to timetable generator queue
    // TODO: Build proper GenerateRequest from DB data
    const request = {
      request_id: entity.id,
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
    entity.status = GerarHorarioStatus.PENDENTE;
    entity.requisicaoGerador = request;
    await this.gerarHorarioRepository.save(entity);

    return entity;
  }
}
