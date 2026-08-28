import type { IAccessContext } from "@/domain/abstractions";
import {
  type IMessageBrokerService,
  IMessageBrokerService as IMessageBrokerServiceToken,
} from "@/domain/abstractions/message-broker";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IIdempotencyService, type IIdempotencyServiceType } from "@/shared/idempotency";
import type {
  IGerarHorarioCreateCommand,
  IGerarHorarioCreateCommandHandler,
} from "../../domain/commands/gerar-horario-create.command.handler.interface";
import { GerarHorario } from "../../domain/gerar-horario";
import {
  IGerarHorarioRepository,
  type IGerarHorarioRepository as IGerarHorarioRepositoryType,
} from "../../domain/repositories/gerar-horario.repository.interface";
import { GerarHorarioRequestBuilder } from "../services/gerar-horario-request.builder";

const COMANDO = "gerar-horario-create";

@Impl()
export class GerarHorarioCreateCommandHandlerImpl implements IGerarHorarioCreateCommandHandler {
  constructor(
    @Dep(IGerarHorarioRepository)
    private readonly gerarHorarioRepository: IGerarHorarioRepositoryType,
    @Dep(IMessageBrokerServiceToken)
    private readonly messageBrokerService: IMessageBrokerService,
    @Dep(GerarHorarioRequestBuilder)
    private readonly requestBuilder: GerarHorarioRequestBuilder,
    @Dep(IIdempotencyService)
    private readonly idempotencyService: IIdempotencyServiceType,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: IGerarHorarioCreateCommand,
  ): Promise<GerarHorario> {
    return this.idempotencyService.execute({
      idempotencyKey: command.idempotencyKey,
      comando: COMANDO,
      run: () => this.criar(command),
    });
  }

  private async criar(command: IGerarHorarioCreateCommand): Promise<GerarHorario> {
    const domain = GerarHorario.create(command);

    await this.gerarHorarioRepository.save(domain);

    const dataTermino = command.dataTermino ?? command.dataInicio;

    const escopo = await this.requestBuilder.build({
      dataInicio: command.dataInicio,
      dataTermino,
      calendarioLetivoIds: command.calendarioLetivoIds ?? [],
      ofertaFormacaoIds: command.ofertaFormacaoIds ?? [],
    });

    const request = {
      request_id: domain.id,
      generate_request: {
        ...escopo,

        boost_same_day_of_week_and_time_slot: command.boostSameDayOfWeekAndTimeSlot ?? 0,
        boost_same_day_of_week_only: command.boostSameDayOfWeekOnly ?? 0,
        boost_same_time_slot_only: command.boostSameTimeSlotOnly ?? 0,
        boost_lesser_distance_from_day_of_week: command.boostLesserDistanceFromDayOfWeek ?? 0,
        boost_lesser_distance_from_time_slot: command.boostLesserDistanceFromTimeSlot ?? 0,

        enabled_constraints: command.enabledConstraints
          ? { kinds: command.enabledConstraints }
          : null,
      },
    };

    await this.messageBrokerService.publishTimetableRequestFireAndForget(request, domain.id);

    domain.markAsPendente(request);
    await this.gerarHorarioRepository.save(domain);

    return domain;
  }
}
