import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import {
  type IEventoCreateCommand,
  IEventoCreateCommandHandler,
} from "@/modules/horarios/evento/domain/commands/evento-create.command.handler.interface";
import { Evento } from "@/modules/horarios/evento/domain/evento.domain";
import type { EventoFindOneOutputDto } from "../../dtos";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../../ports";

@Injectable()
export class EventoCreateCommandHandlerImpl implements IEventoCreateCommandHandler {
  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    private readonly repository: IEventoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async execute({ accessContext, dto }: IEventoCreateCommand): Promise<EventoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("evento:create", { dto });

    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }
    const domain = Evento.criar({
      nome: dto.nome,
      cor: dto.cor,
      rrule: String(dto.rrule),
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      calendario: calendarioRef!,
      ambiente: dto.ambiente,
    });
    const { id: createdId } = await this.repository.createFromDomain({
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
      ambiente: dto.ambiente ?? null,
    });

    const result = await this.repository.findById(accessContext, { id: String(createdId) });

    if (!result) {
      throw new ResourceNotFoundError("Evento", createdId);
    }

    return result;
  }
}
