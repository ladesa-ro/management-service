import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import type { EventoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/evento.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
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

  async eventoFindAll(
    accessContext: AccessContext,
    dto: EventoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<EventoListOutput> {
    return this.eventoRepository.findAll(accessContext, dto, selection);
  }

  async eventoFindById(
    accessContext: AccessContext,
    dto: EventoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutput | null> {
    return this.eventoRepository.findById(accessContext, dto, selection);
  }

  async eventoFindByIdStrict(
    accessContext: AccessContext,
    dto: EventoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutput> {
    const evento = await this.eventoFindById(accessContext, dto, selection);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  async eventoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EventoFindOneOutput | null> {
    return this.eventoRepository.findByIdSimple(accessContext, id, selection);
  }

  async eventoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EventoFindOneOutput> {
    const evento = await this.eventoFindByIdSimple(accessContext, id, selection);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  async eventoCreate(
    accessContext: AccessContext,
    dto: EventoCreateInput,
  ): Promise<EventoFindOneOutput> {
    await accessContext.ensurePermission("evento:create", { dto } as any);

    const dtoEvento = pick(dto, ["nome", "cor", "rrule", "ambiente", "dataInicio", "dataFim"]);

    const evento = this.eventoRepository.create();

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
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

    return this.eventoFindByIdStrict(accessContext, { id: savedEvento.id });
  }

  async eventoUpdate(
    accessContext: AccessContext,
    dto: EventoFindOneInput & EventoUpdateInput,
  ): Promise<EventoFindOneOutput> {
    const currentEvento = await this.eventoFindByIdStrict(accessContext, { id: dto.id });

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
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
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

    return this.eventoFindByIdStrict(accessContext, { id: evento.id });
  }

  async eventoDeleteOneById(
    accessContext: AccessContext,
    dto: EventoFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission(
      "evento:delete",
      { dto },
      dto.id,
      this.eventoRepository.createQueryBuilder(aliasEvento),
    );

    const evento = await this.eventoFindByIdStrict(accessContext, dto);

    if (evento) {
      await this.eventoRepository.softDeleteById(evento.id);
    }

    return true;
  }
}
