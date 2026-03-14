import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import {
  type IEventoUpdateCommand,
  IEventoUpdateCommandHandler,
} from "@/modules/horarios/evento/domain/commands/evento-update.command.handler.interface";
import { Evento } from "@/modules/horarios/evento/domain/evento.domain";
import type { IEvento } from "@/modules/horarios/evento/domain/evento.types";
import type { EventoFindOneOutputDto } from "../../dtos";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../../ports";

@Injectable()
export class EventoUpdateCommandHandlerImpl implements IEventoUpdateCommandHandler {
  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    private readonly repository: IEventoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async execute({ accessContext, dto }: IEventoUpdateCommand): Promise<EventoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Evento", dto.id);
    }

    await this.authorizationService.ensurePermission("evento:update", { dto }, dto.id);

    const domain = Evento.fromData(current);
    domain.atualizar({
      nome: dto.nome,
      cor: dto.cor,
      rrule: dto.rrule,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    });
    const updateData: Partial<PersistInput<IEvento>> = {
      nome: domain.nome,
      cor: domain.cor,
      rrule: domain.rrule,
      dataInicio: domain.dataInicio,
      dataFim: domain.dataFim,
    };
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );
      updateData.calendario = { id: calendario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Evento", dto.id);
    }

    return result;
  }
}
