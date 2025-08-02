import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { EventoEntity } from "@/infrastructure/integrations/database/typeorm/entities/05-calendario/evento.entity";
import { CalendarioLetivoService } from "../calendario-letivo/calendario-letivo.service";

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

  async eventoFindAll(accessContext: AccessContext, domain: IDomain.EventoListInput | null = null, selection?: string[] | boolean): Promise<IDomain.EventoListOutput["success"]> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
      {
        select: [
          "id",

          "nome",
          "cor",

          "rrule",

          "calendario.id",
          "calendario.nome",
          "calendario.ano",
        ],
        sortableColumns: [
          "nome",
          "cor",

          "calendario.id",
          "calendario.nome",
          "calendario.ano",
        ],
        searchableColumns: [
          "id",

          "nome",
          "cor",
        ],
        relations: {
          calendario: true,
        },
        defaultSortBy: [],
        filterableColumns: {
          "calendario.id": [FilterOperator.EQ],
          "calendario.nome": [FilterOperator.EQ],
          "calendario.ano": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("EventoFindOneOutput", qb, aliasEvento, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async eventoFindById(accessContext: AccessContext, domain: IDomain.EventoFindOneInput, selection?: string[] | boolean): Promise<IDomain.EventoFindOneOutput | null> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    // =========================================================

    qb.andWhere(`${aliasEvento}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("EventoFindOneOutput", qb, aliasEvento, selection);
    // =========================================================

    const evento = await qb.getOne();

    // =========================================================

    return evento;
  }

  async eventoFindByIdStrict(accessContext: AccessContext, domain: IDomain.EventoFindOneInput, selection?: string[] | boolean) {
    const evento = await this.eventoFindById(accessContext, domain, selection);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  async eventoFindByIdSimple(accessContext: AccessContext, id: IDomain.EventoFindOneInput["id"], selection?: string[]): Promise<IDomain.EventoFindOneOutput | null> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    // =========================================================

    qb.andWhere(`${aliasEvento}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("EventoFindOneOutput", qb, aliasEvento, selection);

    // =========================================================

    const evento = await qb.getOne();

    // =========================================================

    return evento;
  }

  async EventoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.EventoFindOneInput["id"], selection?: string[]) {
    const evento = await this.eventoFindByIdSimple(accessContext, id, selection);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  async eventoCreate(accessContext: AccessContext, domain: IDomain.EventoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("evento:create", { dto: domain });

    // =========================================================

    const dtoEvento = pick(domain, ["nome", "cor", "rrule"]);

    const evento = this.eventoRepository.create();

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    // =========================================================

    if (domain.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.body.calendario.id);

      this.eventoRepository.merge(evento, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.eventoRepository.save(evento);

    // =========================================================

    return this.eventoFindByIdStrict(accessContext, { id: evento.id });
  }

  async eventoUpdate(accessContext: AccessContext, domain: IDomain.EventoUpdateInput) {
    // =========================================================

    const currentEvento = await this.eventoFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission("evento:update", { dto: domain }, domain.id, this.eventoRepository.createQueryBuilder(aliasEvento));

    const dtoEvento = pick(domain, ["nome", "cor", "rrule"]);

    const evento = {
      id: currentEvento.id,
    } as EventoEntity;

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    // =========================================================

    if (has(domain, "calendario") && domain.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.body.calendario!.id);

      this.eventoRepository.merge(evento, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.eventoRepository.save(evento);

    // =========================================================

    return this.eventoFindByIdStrict(accessContext, { id: evento.id });
  }

  async eventoDeleteOneById(accessContext: AccessContext, domain: IDomain.EventoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("evento:delete", { dto: domain }, domain.id, this.eventoRepository.createQueryBuilder(aliasEvento));

    // =========================================================

    const evento = await this.eventoFindByIdStrict(accessContext, domain);

    // =========================================================

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

    // =========================================================

    return true;
  }
}
