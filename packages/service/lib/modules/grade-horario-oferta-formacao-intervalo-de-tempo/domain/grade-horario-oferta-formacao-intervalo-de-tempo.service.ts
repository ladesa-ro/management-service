import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { GradeHorarioOfertaFormacaoService } from "@/modules/grade-horario-oferta-formacao/domain/grade-horario-oferta-formacao.service";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/domain/intervalo-de-tempo.service";
import { QbEfficientLoad, SearchService } from "@/shared";
import type { AccessContext } from "@/shared/infrastructure/access-context";
import { paginateConfig } from "@/shared/infrastructure/fixtures";
import { DatabaseContextService } from "@/shared/infrastructure/integrations/database";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";
import { type IDomain } from "@/shared/tsp/schema/typings";

// ============================================================================

const aliasGradeHorarioOfertaFormacaoIntervaloDeTempo = "gh_of_it";

// ============================================================================

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private intervaloDeTempoService: IntervaloDeTempoService,
    private gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
    private searchService: SearchService,
  ) {}

  get gradeHorarioOfertaFormacaoIntervaloDeTempoRepository() {
    return this.databaseContext.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    accessContext: AccessContext,
    domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput["success"]> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo);

    // =========================================================

    await accessContext.applyFilter("grade_horario_oferta_formacao_intervalo_de_tempo:find", qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
      {
        ...paginateConfig,
        select: [
          "id",

          "dateCreated",
        ],
        relations: {
          gradeHorarioOfertaFormacao: true,
          intervaloDeTempo: true,
        },
        sortableColumns: ["dateCreated"],
        searchableColumns: ["id"],
        defaultSortBy: [["dateCreated", "ASC"]],
        filterableColumns: {
          "gradeHorarioOfertaFormacao.id": [FilterOperator.EQ],
          "intervaloDeTempo.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput", qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    accessContext: AccessContext | null,
    domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("grade_horario_oferta_formacao_intervalo_de_tempo:find", qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, null);
    }

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacaoIntervaloDeTempo}.id = :id`, {
      id: domain.id,
    });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput", qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, selection);

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext: AccessContext, domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput, selection?: string[]) {
    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(accessContext, domain, selection);

    if (!gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo);

    // =========================================================

    await accessContext.applyFilter("grade_horario_oferta_formacao_intervalo_de_tempo:find", qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, null);

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacaoIntervaloDeTempo}.id = :id`, {
      id,
    });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput", qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, selection);

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput["id"], selection?: string[]) {
    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimple(accessContext, id, selection);

    if (!gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext: AccessContext, domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("grade_horario_oferta_formacao_intervalo_de_tempo:create", { dto: domain });

    // =========================================================

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(domain, []);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.create();

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
      ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
    });

    // =========================================================

    if (domain.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdSimpleStrict(accessContext, domain.gradeHorarioOfertaFormacao.id);

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
        gradeHorarioOfertaFormacao: {
          id: gradeHorarioOfertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (domain.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.intervaloDeTempo);

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
        intervaloDeTempo: {
          id: intervaloDeTempo.id,
        },
      });
    }

    // =========================================================

    await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.save(gradeHorarioOfertaFormacaoIntervaloDeTempo);

    // =========================================================

    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, { id: gradeHorarioOfertaFormacaoIntervaloDeTempo.id });
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    accessContext: AccessContext,
    domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput & IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput,
  ) {
    // =========================================================

    const currentGradeHorarioOfertaFormacaoIntervaloDeTempo = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:update",
      { dto: domain },
      domain.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo),
    );

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(domain, ["nome", "slug"]);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = <GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>{
      id: currentGradeHorarioOfertaFormacaoIntervaloDeTempo.id,
    };

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
      ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
    });

    // =========================================================

    if (has(domain, "gradeHorarioOfertaFormacao") && domain.gradeHorarioOfertaFormacao !== undefined) {
      const gradeHorarioOfertaFormacao =
        domain.gradeHorarioOfertaFormacao && (await this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdSimpleStrict(accessContext, domain.gradeHorarioOfertaFormacao.id));

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
        gradeHorarioOfertaFormacao: gradeHorarioOfertaFormacao && {
          id: gradeHorarioOfertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (has(domain, "intervaloDeTempo") && domain.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = domain.intervaloDeTempo && (await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.intervaloDeTempo));

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
        intervaloDeTempo: intervaloDeTempo && {
          id: intervaloDeTempo.id,
        },
      });
    }

    // =========================================================

    await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.save(gradeHorarioOfertaFormacaoIntervaloDeTempo);

    // =========================================================

    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, { id: gradeHorarioOfertaFormacaoIntervaloDeTempo.id });
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext: AccessContext, domain: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
      { dto: domain },
      domain.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo),
    );

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, domain);

    // =========================================================

    if (gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository
        .createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :gradeHorarioOfertaFormacaoIntervaloDeTempoId", {
          gradeHorarioOfertaFormacaoIntervaloDeTempoId: gradeHorarioOfertaFormacaoIntervaloDeTempo.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
