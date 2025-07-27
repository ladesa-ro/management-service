import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/QbEfficientLoad";
import { SearchService } from "@/application/helpers/search.service";
import { IntervaloDeTempoService } from "@/application/resources/base/intervalo-de-tempo/intervalo-de-tempo.service";
import { GradeHorarioOfertaFormacaoService } from "@/application/resources/calendario/grade-horario-oferta-formacao/grade-horario-oferta-formacao.service";
import { IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/infrastructure/integrations/database/typeorm/entities";

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
    dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput["success"]> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo);

    // =========================================================

    await accessContext.applyFilter("grade_horario_oferta_formacao_intervalo_de_tempo:find", qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
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
    QbEfficientLoad(LadesaTypings.Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoView, qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    accessContext: AccessContext | null,
    dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
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
      id: dto.id,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoView, qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, selection);

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput, selection?: string[]) {
    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(accessContext, dto, selection);

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
    QbEfficientLoad(LadesaTypings.Tokens.GradeHorarioOfertaFormacaoIntervaloDeTempoView, qb, aliasGradeHorarioOfertaFormacaoIntervaloDeTempo, selection);

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

  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("grade_horario_oferta_formacao_intervalo_de_tempo:create", { dto });

    // =========================================================

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(dto.body, []);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.create();

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
      ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
    });

    // =========================================================

    if (dto.body.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdSimpleStrict(accessContext, dto.body.gradeHorarioOfertaFormacao.id);

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
        gradeHorarioOfertaFormacao: {
          id: gradeHorarioOfertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (dto.body.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);

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

  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateByIdInput) {
    // =========================================================

    const currentGradeHorarioOfertaFormacaoIntervaloDeTempo = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, dto);

    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:update",
      { dto },
      dto.parameters.path.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo),
    );

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(dto.body, ["nome", "slug"]);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = <GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>{
      id: currentGradeHorarioOfertaFormacaoIntervaloDeTempo.id,
    };

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
      ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
    });

    // =========================================================

    if (has(dto.body, "gradeHorarioOfertaFormacao") && dto.body.gradeHorarioOfertaFormacao !== undefined) {
      const gradeHorarioOfertaFormacao =
        dto.body.gradeHorarioOfertaFormacao && (await this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdSimpleStrict(accessContext, dto.body.gradeHorarioOfertaFormacao.id));

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(gradeHorarioOfertaFormacaoIntervaloDeTempo, {
        gradeHorarioOfertaFormacao: gradeHorarioOfertaFormacao && {
          id: gradeHorarioOfertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (has(dto.body, "intervaloDeTempo") && dto.body.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = dto.body.intervaloDeTempo && (await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo));

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

  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
      { dto },
      dto.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo),
    );

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, dto);

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
