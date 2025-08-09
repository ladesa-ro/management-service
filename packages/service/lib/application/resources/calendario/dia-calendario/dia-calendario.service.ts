import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DiaCalendarioEntity } from "@/infrastructure/integrations/database/typeorm/entities/05-calendario/dia-calendario.entity";
import { CalendarioLetivoService } from "../calendario-letivo/calendario-letivo.service";

// ============================================================================

const aliasDiaCalendario = "diaCalendario";

// ============================================================================

@Injectable()
export class DiaCalendarioService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
    private searchService: SearchService,
  ) {}

  get diaCalendarioRepository() {
    return this.databaseContext.diaCalendarioRepository;
  }

  async diaCalendarioFindAll(accessContext: AccessContext, domain: IDomain.DiaCalendarioListInput | null = null, selection?: string[] | boolean): Promise<IDomain.DiaCalendarioListOutput["success"]> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      domain
        ? {
            ...domain,
            sortBy: domain.sortBy
              ? (domain.sortBy as any[]).map((s) =>
                  typeof s === "string"
                    ? s
                    : Array.isArray(s)
                    ? s.join(":")
                    : `${s.column}:${s.direction ?? "ASC"}`
                )
              : undefined,
          }
        : {},
      {
        select: [
          "id",

          "data",
          "diaLetivo",
          "feriado",

          "calendario.id",
          "calendario.nome",
          "calendario.ano",

          "diaPresencial",
          "tipo",
          "extraCurricular",
        ],
        sortableColumns: [
          "data",
          "diaLetivo",
          "feriado",

          "calendario.id",
          "calendario.nome",
          "calendario.ano",
        ],
        searchableColumns: [
          "id",

          "data",
          "diaLetivo",
          "feriado",
          "calendario.nome",
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
    await QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async diaCalendarioFindById(accessContext: AccessContext, domain: IDomain.DiaCalendarioFindOneInput, selection?: string[] | boolean): Promise<IDomain.DiaCalendarioFindOneOutput | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario;
  }

  async diaCalendarioFindByIdStrict(accessContext: AccessContext, domain: IDomain.DiaCalendarioFindOneInput, selection?: string[] | boolean) {
    const diaCalendario = await this.diaCalendarioFindById(accessContext, domain, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioFindByIdSimple(accessContext: AccessContext, id: IDomain.DiaCalendarioFindOneInput["id"], selection?: string[]): Promise<IDomain.DiaCalendarioFindOneOutput | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario;
  }

  async DiaCalendarioFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DiaCalendarioFindOneInput["id"], selection?: string[]) {
    const diaCalendario = await this.diaCalendarioFindByIdSimple(accessContext, id, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioCreate(accessContext: AccessContext, domain: IDomain.DiaCalendarioCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("dia_calendario:create", { dto: domain });

    // =========================================================

    const dtoDiaCalendario = pick(domain, ["data", "dia_letivo", "feriado"]) as Pick<typeof domain, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = this.diaCalendarioRepository.create();

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    });

    // =========================================================

    if (domain.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.body.calendario.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, {
      id: diaCalendario.id,
    });
  }

  async diaCalendarioUpdate(accessContext: AccessContext, domain: IDomain.DiaCalendarioUpdateInput) {
    // =========================================================

    const currentDiaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, {id: domain.id});

    // =========================================================

    await accessContext.ensurePermission("dia_calendario:update", { dto: domain }, domain.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario));

    const dtoDiaCalendario = pick(domain, ["data", "dia_letivo", "feriado"]) as Pick<typeof domain, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = {
      id: currentDiaCalendario.id,
    } as DiaCalendarioEntity;

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    });

    // =========================================================

    if (has(domain, "calendario") && domain.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.body.calendario!.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, {
      id: diaCalendario.id,
    });
  }

  async diaCalendarioDeleteOneById(accessContext: AccessContext, domain: IDomain.DiaCalendarioFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("dia_calendario:delete", { dto: domain }, domain.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario));

    // =========================================================

    const diaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, domain);

    // =========================================================

    if (diaCalendario) {
      await this.diaCalendarioRepository
        .createQueryBuilder(aliasDiaCalendario)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diaCalendarioId", { diaCalendarioId: diaCalendario.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
