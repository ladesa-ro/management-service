import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { AmbienteService } from "@/v2/core/ambiente/domain/ambiente.service";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/domain/calendario-letivo.service";
import { DisciplinaService } from "@/v2/core/disciplina/domain/disciplina.service";
import { TurmaService } from "@/v2/core/turma/domain/turma.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService, QbEfficientLoad } from "@/v2/infrastructure.database";
import type { DiarioEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { IDomain, SearchService } from "@/shared";

// ============================================================================

const aliasDiario = "diario";

// ============================================================================

@Injectable()
export class DiarioService {
  constructor(
    private calendarioLetivoService: CalendarioLetivoService,
    private databaseContext: DatabaseContextService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private ambienteService: AmbienteService,
    private searchService: SearchService,
  ) {}

  get diarioRepository() {
    return this.databaseContext.diarioRepository;
  }

  async diarioFindAll(accessContext: AccessContext, domain: IDomain.DiarioListInput | null = null, selection?: string[] | boolean): Promise<IDomain.DiarioListOutput["success"]> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, domain, {
      ...paginateConfig,
      select: [
        "id",

        "ativo",

        "turma.id",
        "turma.periodo",
        "disciplina.id",
        "disciplina.nome",
        "ambientePadrao.id",
        "ambientePadrao.nome",
      ],
      sortableColumns: [
        "ativo",

        "disciplina.nome",
        "ambientePadrao.nome",
      ],
      relations: {
        turma: true,
        disciplina: true,
        ambientePadrao: true,
      },
      searchableColumns: [
        "id",

        "ativo",
        "ano",
        "etapa",
        "turma.periodo",
        "disciplina.nome",
      ],
      defaultSortBy: [],
      filterableColumns: {
        "turma.id": [FilterOperator.EQ],
        "disciplina.id": [FilterOperator.EQ],
        "ambientePadrao.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async diarioFindById(accessContext: AccessContext, domain: IDomain.DiarioFindOneInput, selection?: string[] | boolean): Promise<IDomain.DiarioFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario;
  }

  async diarioFindByIdStrict(accessContext: AccessContext, domain: IDomain.DiarioFindOneInput, selection?: string[] | boolean) {
    const diario = await this.diarioFindById(accessContext, domain, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioFindByIdSimple(accessContext: AccessContext, id: IDomain.DiarioFindOneInput["id"], selection?: string[] | boolean): Promise<IDomain.DiarioFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario;
  }

  async diarioFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DiarioFindOneInput["id"], selection?: string[] | boolean) {
    const diario = await this.diarioFindByIdSimple(accessContext, id, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioCreate(accessContext: AccessContext, domain: IDomain.DiarioCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("diario:create", { dto: domain });

    // =========================================================

    const dtoDiario = pick(domain, ["ativo"]);

    const diario = this.diarioRepository.create();

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    // =========================================================

    if (domain.ambientePadrao !== null) {
      const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: domain.ambientePadrao.id });
      this.diarioRepository.merge(diario, {
        ambientePadrao: { id: ambientePadrao.id },
      });
    } else {
      this.diarioRepository.merge(diario, { ambientePadrao: null });
    }

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.calendarioLetivo.id);
    this.diarioRepository.merge(diario, {
      calendarioLetivo: { id: calendarioLetivo.id },
    });

    // =========================================================

    const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(accessContext, domain.disciplina.id);

    this.diarioRepository.merge(diario, { disciplina: { id: disciplina.id } });

    // =========================================================

    const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, domain.turma.id);

    this.diarioRepository.merge(diario, { turma: { id: turma.id } });

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  async diarioUpdate(accessContext: AccessContext, domain: IDomain.DiarioFindOneInput & IDomain.DiarioUpdateInput) {
    // =========================================================

    const currentDiario = await this.diarioFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("diario:update", { dto: domain }, domain.id, this.diarioRepository.createQueryBuilder(aliasDiario));

    const dtoDiario = pick(domain, ["ativo", "ano", "etapa", "turma", "disciplina", "ambientePadrao"]);

    const diario = {
      id: currentDiario.id,
    } as DiarioEntity;

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    // =========================================================

    if (has(domain, "ambientePadrao") && domain.ambientePadrao !== undefined) {
      if (domain.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
          id: domain.ambientePadrao.id,
        });

        this.diarioRepository.merge(diario, {
          ambientePadrao: { id: ambientePadrao.id },
        });
      } else {
        this.diarioRepository.merge(diario, { ambientePadrao: null });
      }
    }

    // =========================================================

    if (has(domain, "disciplina") && domain.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(accessContext, domain.disciplina.id);

      this.diarioRepository.merge(diario, {
        disciplina: { id: disciplina.id },
      });
    }

    // =========================================================

    if (has(domain, "turma") && domain.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, domain.turma.id);
      this.diarioRepository.merge(diario, { turma: { id: turma.id } });
    }

    // =========================================================

    if (has(domain, "calendarioLetivo") && domain.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.calendarioLetivo.id);
      this.diarioRepository.merge(diario, {
        calendarioLetivo: { id: calendarioLetivo.id },
      });
    }

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  async diarioDeleteOneById(accessContext: AccessContext, domain: IDomain.DiarioFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("diario:delete", { dto: domain }, domain.id, this.diarioRepository.createQueryBuilder(aliasDiario));

    // =========================================================

    const diario = await this.diarioFindByIdStrict(accessContext, domain);

    // =========================================================

    if (diario) {
      await this.diarioRepository
        .createQueryBuilder(aliasDiario)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diarioId", { diarioId: diario.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
