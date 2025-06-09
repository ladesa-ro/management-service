import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { EventoEntity } from "@/infrastructure/integrations/database/typeorm/entities/05-calendario/evento.entity";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "../calendario-letivo/calendario-letivo.service";

// ============================================================================

const aliasEvento = "evento";

// ============================================================================

@Injectable()
export class EventoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  get eventoRepository() {
    return this.databaseContext.eventoRepository;
  }

  //

  async eventoFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.EventoListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.EventoListOperationOutput["success"]> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "cor",
        //
        "rrule",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        //
        "nome",
        "cor",
        //
        "calendario.id",
        "calendario.nome",
        "calendario.ano",
        //
      ],
      searchableColumns: [
        //
        "id",
        //
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
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.EventoFindOneResultView, qb, aliasEvento, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async eventoFindById(accessContext: AccessContext, dto: LadesaTypings.EventoFindOneInputView, selection?: string[] | boolean): Promise<LadesaTypings.EventoFindOneResultView | null> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    // =========================================================

    qb.andWhere(`${aliasEvento}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.EventoFindOneResultView, qb, aliasEvento, selection);
    // =========================================================

    const evento = await qb.getOne();

    // =========================================================

    return evento;
  }

  async eventoFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.EventoFindOneInputView, selection?: string[] | boolean) {
    const evento = await this.eventoFindById(accessContext, dto, selection);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  async eventoFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.EventoFindOneInputView["id"], selection?: string[]): Promise<LadesaTypings.EventoFindOneResultView | null> {
    // =========================================================

    const qb = this.eventoRepository.createQueryBuilder(aliasEvento);

    // =========================================================

    await accessContext.applyFilter("evento:find", qb, aliasEvento, null);

    // =========================================================

    qb.andWhere(`${aliasEvento}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.EventoFindOneResultView, qb, aliasEvento, selection);

    // =========================================================

    const evento = await qb.getOne();

    // =========================================================

    return evento;
  }

  async EventoFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.EventoFindOneInputView["id"], selection?: string[]) {
    const evento = await this.eventoFindByIdSimple(accessContext, id, selection);

    if (!evento) {
      throw new NotFoundException();
    }

    return evento;
  }

  //

  async eventoCreate(accessContext: AccessContext, dto: LadesaTypings.EventoCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("evento:create", { dto });

    // =========================================================

    const dtoEvento = pick(dto.body, ["nome", "cor", "rrule"]);

    const evento = this.eventoRepository.create();

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    // =========================================================

    if (dto.body.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario.id);

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

  async eventoUpdate(accessContext: AccessContext, dto: LadesaTypings.EventoUpdateByIdOperationInput) {
    // =========================================================

    const currentEvento = await this.eventoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("evento:update", { dto }, dto.params.id, this.eventoRepository.createQueryBuilder(aliasEvento));

    const dtoEvento = pick(dto.body, ["nome", "cor", "rrule"]);

    const evento = {
      id: currentEvento.id,
    } as EventoEntity;

    this.eventoRepository.merge(evento, {
      ...dtoEvento,
    });

    // =========================================================

    if (has(dto.body, "calendario") && dto.body.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.body.calendario!.id);

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

  //

  async eventoDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.EventoFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("evento:delete", { dto }, dto.id, this.eventoRepository.createQueryBuilder(aliasEvento));

    // =========================================================

    const evento = await this.eventoFindByIdStrict(accessContext, dto);

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
