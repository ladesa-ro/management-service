import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { IntervaloDeTempoService } from "@/application/resources/base/intervalo-de-tempo/intervalo-de-tempo.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { AulaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { AmbienteService } from "../../../ambientes/ambiente/ambiente.service";
import { DiarioService } from "../diario/diario.service";

// ============================================================================

const aliasAula = "aula";

// ============================================================================

@Injectable()
export class AulaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private diarioService: DiarioService,
    private intervaloService: IntervaloDeTempoService,
    private ambienteService: AmbienteService,
    private searchService: SearchService,
  ) {}

  get aulaRepository() {
    return this.databaseContext.aulaRepository;
  }

  async aulaFindAll(accessContext: AccessContext, domain: IDomain.AulaListInput | null = null, selection?: string[] | boolean): Promise<IDomain.AulaListOutput["success"]> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      domain
        ? {
            ...domain,
            sortBy: domain.sortBy ? (domain.sortBy as any[]).map((s) => (typeof s === "string" ? s : Array.isArray(s) ? s.join(":") : `${s.column}:${s.direction ?? "ASC"}`)) : undefined,
          }
        : {},
      {
        ...paginateConfig,
        select: [
          "id",

          "formato",
          "data",

          "intervaloDeTempo.id",
          "intervaloDeTempo.periodoInicio",
          "intervaloDeTempo.periodoFim",
          "diario.id",
          "diario.ativo",
          "ambiente.id",
          "ambiente.nome",
        ],
        sortableColumns: [
          "data",
          "formato",

          "diario.ativo",
          "ambiente.nome",
        ],
        relations: {
          ambiente: true,
          diario: true,
          intervaloDeTempo: true,
        },
        searchableColumns: [
          "id",

          "formato",
          "data",
          "ambiente.nome",
        ],
        defaultSortBy: [],
        filterableColumns: {
          "intervaloDeTempo.id": [FilterOperator.EQ],
          "diario.id": [FilterOperator.EQ],
          "ambiente.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async aulaFindById(accessContext: AccessContext, domain: IDomain.AulaFindOneInput, selection?: string[] | boolean): Promise<IDomain.AulaFindOneOutput | null> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    // =========================================================

    qb.andWhere(`${aliasAula}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    // =========================================================

    const aula = await qb.getOne();

    // =========================================================

    return aula;
  }

  async aulaFindByIdStrict(accessContext: AccessContext, domain: IDomain.AulaFindOneInput, selection?: string[] | boolean) {
    const aula = await this.aulaFindById(accessContext, domain, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaFindByIdSimple(accessContext: AccessContext, id: IDomain.AulaFindOneInput["id"], selection?: string[] | boolean): Promise<IDomain.AulaFindOneOutput | null> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    // =========================================================

    qb.andWhere(`${aliasAula}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    // =========================================================

    const aula = await qb.getOne();

    // =========================================================

    return aula;
  }

  async aulaFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.AulaFindOneInput["id"], selection?: string[] | boolean) {
    const aula = await this.aulaFindByIdSimple(accessContext, id, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaCreate(accessContext: AccessContext, domain: IDomain.AulaCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("aula:create", { dto: domain });

    // =========================================================

    const dtoAula = pick(domain, ["formato", "data"]);

    const aula = this.aulaRepository.create();

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    // =========================================================

    if (domain.ambiente && domain.ambiente !== null) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: domain.ambiente.id,
      });
      this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
    } else {
      this.aulaRepository.merge(aula, { ambiente: null });
    }

    // =========================================================

    const diario = await this.diarioService.diarioFindByIdSimpleStrict(accessContext, domain.diario.id);
    this.aulaRepository.merge(aula, { diario: { id: diario.id } });

    // =========================================================

    const intervalo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, domain.intervaloDeTempo);

    this.aulaRepository.merge(aula, {
      intervaloDeTempo: { id: intervalo!.id },
    });

    // =========================================================

    await this.aulaRepository.save(aula);

    // =========================================================

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  async aulaUpdate(accessContext: AccessContext, domain: IDomain.AulaUpdateInput) {
    // =========================================================

    const currentAula = await this.aulaFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("aula:update", { dto: domain }, domain.id, this.aulaRepository.createQueryBuilder(aliasAula));

    const dtoAula = pick(domain, ["formato", "data", "intervaloDeTempo", "diario", "ambiente"]);

    const aula = {
      id: currentAula.id,
    } as AulaEntity;

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    // =========================================================

    if (has(domain, "ambiente") && domain.ambiente !== undefined) {
      if (domain.ambiente !== null) {
        const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: domain.ambiente.id });

        this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
      } else {
        this.aulaRepository.merge(aula, { ambiente: null });
      }
    }

    // =========================================================

    if (has(domain, "diario") && domain.diario !== undefined) {
      const diario = await this.diarioService.diarioFindByIdSimpleStrict(accessContext, domain.diario.id);

      this.aulaRepository.merge(aula, { diario: { id: diario.id } });
    }

    // =========================================================

    if (has(domain, "intervaloDeTempo") && domain.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, domain.intervaloDeTempo);
      this.aulaRepository.merge(aula, {
        intervaloDeTempo: { id: intervaloDeTempo!.id },
      });
    }

    // =========================================================

    await this.aulaRepository.save(aula);

    // =========================================================

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  async aulaDeleteOneById(accessContext: AccessContext, domain: IDomain.AulaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("aula:delete", { dto: domain }, domain.id, this.aulaRepository.createQueryBuilder(aliasAula));

    // =========================================================

    const aula = await this.aulaFindByIdStrict(accessContext, domain);

    // =========================================================

    if (aula) {
      await this.aulaRepository
        .createQueryBuilder(aliasAula)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :aulaId", { aulaId: aula.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
