import {
  type IMessageBrokerService,
  IMessageBrokerService as IMessageBrokerServiceToken,
} from "@/domain/abstractions/message-broker";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DataSource } from "typeorm";
import type { IGerarHorarioCreateCommand, IGerarHorarioCreateCommandHandler } from "../../domain/commands/gerar-horario-create.command.handler.interface";
import {
  GerarHorarioEntity,
  GerarHorarioDuracao,
  GerarHorarioStatus,
} from "../../infrastructure.database/typeorm/gerar-horario.typeorm.entity";

@DeclareImplementation()
export class GerarHorarioCreateCommandHandlerImpl implements IGerarHorarioCreateCommandHandler {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
    @DeclareDependency(IMessageBrokerServiceToken)
    private readonly messageBrokerService: IMessageBrokerService,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    command: IGerarHorarioCreateCommand,
  ): Promise<GerarHorarioEntity> {
    const repo = this.dataSource.getRepository(GerarHorarioEntity);

    const entity = new GerarHorarioEntity();
    entity.id = generateUuidV7();
    entity.status = GerarHorarioStatus.SOLICITADO;
    entity.duracao = GerarHorarioDuracao.TEMPORARIO;
    entity.dataInicio = new Date(command.dataInicio);
    entity.dataTermino = command.dataTermino ? new Date(command.dataTermino) : null;
    entity.requisicaoGerador = null;
    entity.respostaGerador = null;
    entity.dateCreated = new Date();

    await repo.save(entity);

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
    await repo.save(entity);

    return entity;
  }
}
