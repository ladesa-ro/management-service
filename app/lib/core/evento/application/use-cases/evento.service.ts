import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { EventoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/evento.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { QbEfficientLoad, SearchService } from "@/v2/old/shared";
import type {
  EventoCreateInput,
  EventoFindOneInput,
  EventoFindOneOutput,
  EventoListInput,
  EventoListOutput,
  EventoUpdateInput,
} from "../dtos";

// ============================================================================

const aliasEvento = "evento";

// ============================================================================

@Injectable()
export class EventoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
    private searchService: SearchService,
  ) {}

  get eventoRepository() {
    return this.databaseContext.eventoRepository;
  }

  async eventoFindAll(
    accessContext: AccessContext,
    dto: EventoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<EventoListOutput> {
    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    const paginated = await this.searchService.search(qb, dto as Record<string, any>, {
      select: [
        "id",
        "nome",
        "cor",
        "rrule",
        "ambiente",
        "data_inicio",
        "data_fim",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        "nome",
        "cor",
        "ambiente",
        "data_inicio",
        "data_fim",
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        "id",
        "nome",
        "cor",
        "ambiente",
        "data_inicio",
        "data_fim",
      ],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
        data_inicio: [FilterOperator.GTE, FilterOperator.LTE],
        data_fim: [FilterOperator.GTE, FilterOperator.LTE],
      },
    });

    qb.select([]);
    QbEfficientLoad("EventoFindOneOutput", qb, aliasEvento, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!,
    );

    return paginated as unknown as EventoListOutput;
  }

  async eventoFindById(
    accessContext: AccessContext,
    dto: EventoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutput | null> {
    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    qb.andWhere(`${aliasEvento}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("EventoFindOneOutput", qb, aliasEvento, selection);

    const evento = await qb.getOne();

    return evento as EventoFindOneOutput | null;
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
    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    qb.andWhere(`${aliasEvento}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("EventoFindOneOutput", qb, aliasEvento, selection);

    const evento = await qb.getOne();

    return evento as EventoFindOneOutput | null;
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

    const dtoEvento = pick(dto, ["nome", "cor", "rrule", "ambiente", "data_inicio", "data_fim"]);

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

    await this.eventoRepository.save(evento);

    return this.eventoFindByIdStrict(accessContext, { id: evento.id });
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
      this.eventoRepository.createQueryBuilder(aliasEvento as any),
    );

    const dtoEvento = pick(dto, ["nome", "cor", "rrule", "data_inicio", "data_fim"]);

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
      this.eventoRepository.createQueryBuilder(aliasEvento as any),
    );

    const evento = await this.eventoFindByIdStrict(accessContext, dto);

    if (evento) {
      await this.eventoRepository
        .createQueryBuilder(aliasEvento)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :eventoId", { eventoId: evento.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    return true;
  }
}
