import { Inject, Injectable } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import type { EventoEntity } from "@/modules/evento/infrastructure/persistence/typeorm";
import type {
  EventoCreateInput,
  EventoFindOneInput,
  EventoFindOneOutput,
  EventoListInput,
  EventoListOutput,
  EventoUpdateInput,
} from "../dtos";
import { EVENTO_REPOSITORY_PORT, type IEventoRepositoryPort } from "../ports/out";

// ============================================================================

const aliasEvento = "evento";

// ============================================================================

@Injectable()
export class EventoService {
  constructor(
    @Inject(EVENTO_REPOSITORY_PORT)
    private readonly eventoRepository: IEventoRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: EventoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<EventoListOutput> {
    return this.eventoRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext,
    dto: EventoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutput | null> {
    return this.eventoRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: EventoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutput> {
    const evento = await this.findById(accessContext, dto, selection);

    if (!evento) {
      throw new ResourceNotFoundError("Evento", dto.id);
    }

    return evento;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EventoFindOneOutput | null> {
    return this.eventoRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EventoFindOneOutput> {
    const evento = await this.findByIdSimple(accessContext, id, selection);

    if (!evento) {
      throw new ResourceNotFoundError("Evento", id);
    }

    return evento;
  }

  async create(accessContext: AccessContext, dto: EventoCreateInput): Promise<EventoFindOneOutput> {
    await accessContext.ensurePermission("evento:create", { dto } as any);

    const dtoEvento = pick(dto, ["nome", "cor", "rrule", "ambiente", "dataInicio", "dataFim"]);

    const evento = this.eventoRepository.create();

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );

      this.eventoRepository.merge(evento, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    const savedEvento = await this.eventoRepository.save(evento);

    return this.findByIdStrict(accessContext, { id: savedEvento.id });
  }

  async update(
    accessContext: AccessContext,
    dto: EventoFindOneInput & EventoUpdateInput,
  ): Promise<EventoFindOneOutput> {
    const currentEvento = await this.findByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "evento:update",
      { dto },
      dto.id,
      this.eventoRepository.createQueryBuilder(aliasEvento),
    );

    const dtoEvento = pick(dto, ["nome", "cor", "rrule", "dataInicio", "dataFim"]);

    const evento = {
      id: currentEvento.id,
    } as EventoEntity;

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );

      this.eventoRepository.merge(evento, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    await this.eventoRepository.save(evento);

    return this.findByIdStrict(accessContext, { id: evento.id });
  }

  async deleteOneById(accessContext: AccessContext, dto: EventoFindOneInput): Promise<boolean> {
    await accessContext.ensurePermission(
      "evento:delete",
      { dto },
      dto.id,
      this.eventoRepository.createQueryBuilder(aliasEvento),
    );

    const evento = await this.findByIdStrict(accessContext, dto);

    if (evento) {
      await this.eventoRepository.softDeleteById(evento.id);
    }

    return true;
  }
}
