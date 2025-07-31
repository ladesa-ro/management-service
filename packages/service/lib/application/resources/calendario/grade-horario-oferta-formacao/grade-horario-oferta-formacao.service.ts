import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { CampusService } from "@/application/resources/ambientes/campus/campus.service";
import { OfertaFormacaoService } from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { GradeHorarioOfertaFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasGradeHorarioOfertaFormacao = "grade_horario_oferta_formacao";

// ============================================================================

@Injectable()
export class GradeHorarioOfertaFormacaoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private ofertaFormacaoService: OfertaFormacaoService,
    private searchService: SearchService,
  ) {}

  get gradeHorarioOfertaFormacaoRepository() {
    return this.databaseContext.gradeHorarioOfertaFormacaoRepository;
  }

  async gradeHorarioOfertaFormacaoFindAll(
    accessContext: AccessContext,
    domain: IDomain.GradeHorarioOfertaFormacaoListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoListOutput["success"]> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("grade_horario_oferta_formacao:find", qb, aliasGradeHorarioOfertaFormacao, null);

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
          campus: true,

          ofertaFormacao: {
            modalidade: true,
          },
        },
        sortableColumns: ["dateCreated"],
        searchableColumns: ["id"],
        defaultSortBy: [["dateCreated", "ASC"]],
        filterableColumns: {
          "campus.id": [FilterOperator.EQ],
          "ofertaFormacao.id": [FilterOperator.EQ],
          "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("GradeHorarioOfertaFormacaoFindOneOutput", qb, aliasGradeHorarioOfertaFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async gradeHorarioOfertaFormacaoFindById(
    accessContext: AccessContext | null,
    domain: IDomain.GradeHorarioOfertaFormacaoFindOneInput,
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("grade_horario_oferta_formacao:find", qb, aliasGradeHorarioOfertaFormacao, null);
    }

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacao}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("GradeHorarioOfertaFormacaoFindOneOutput", qb, aliasGradeHorarioOfertaFormacao, selection);

    // =========================================================

    const gradeHorarioOfertaFormacao = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacao;
  }

  async gradeHorarioOfertaFormacaoFindByIdStrict(accessContext: AccessContext, domain: IDomain.GradeHorarioOfertaFormacaoFindOneInput, selection?: string[]) {
    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindById(accessContext, domain, selection);

    if (!gradeHorarioOfertaFormacao) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacao;
  }

  async gradeHorarioOfertaFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.GradeHorarioOfertaFormacaoFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("grade_horario_oferta_formacao:find", qb, aliasGradeHorarioOfertaFormacao, null);

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("GradeHorarioOfertaFormacaoFindOneOutput", qb, aliasGradeHorarioOfertaFormacao, selection);

    // =========================================================

    const gradeHorarioOfertaFormacao = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacao;
  }

  async gradeHorarioOfertaFormacaoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.GradeHorarioOfertaFormacaoFindOneInput["id"], selection?: string[]) {
    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdSimple(accessContext, id, selection);

    if (!gradeHorarioOfertaFormacao) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacao;
  }

  async gradeHorarioOfertaFormacaoCreate(accessContext: AccessContext, domain: IDomain.GradeHorarioOfertaFormacaoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("grade_horario_oferta_formacao:create", { dto: domain });

    // =========================================================

    const dtoGradeHorarioOfertaFormacao = pick(domain, []);

    const gradeHorarioOfertaFormacao = this.gradeHorarioOfertaFormacaoRepository.create();

    this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
      ...dtoGradeHorarioOfertaFormacao,
    });

    // =========================================================

    if (domain.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, domain.body.ofertaFormacao.id);

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (domain.campus) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, domain.body.campus.id);

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (domain.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, domain.body.ofertaFormacao.id);

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    await this.gradeHorarioOfertaFormacaoRepository.save(gradeHorarioOfertaFormacao);

    // =========================================================

    return this.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, {
      id: gradeHorarioOfertaFormacao.id,
    });
  }

  async gradeHorarioOfertaFormacaoUpdate(accessContext: AccessContext, domain: IDomain.GradeHorarioOfertaFormacaoUpdateInput) {
    // =========================================================

    const currentGradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao:update",
      { dto: domain },
      domain.id,
      this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao),
    );

    const dtoGradeHorarioOfertaFormacao = pick(domain, ["nome", "slug"]);

    const gradeHorarioOfertaFormacao = <GradeHorarioOfertaFormacaoEntity>{
      id: currentGradeHorarioOfertaFormacao.id,
    };

    this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
      ...dtoGradeHorarioOfertaFormacao,
    });

    // =========================================================

    if (has(domain, "campus") && domain.campus !== undefined) {
      const campus = domain.campus && (await this.campusService.campusFindByIdSimpleStrict(accessContext, domain.body.campus.id));

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        campus: campus && {
          id: campus.id,
        },
      });
    }

    if (has(domain, "ofertaFormacao") && domain.ofertaFormacao !== undefined) {
      const ofertaFormacao = domain.ofertaFormacao && (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, domain.body.ofertaFormacao.id));

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        ofertaFormacao: ofertaFormacao && {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    await this.gradeHorarioOfertaFormacaoRepository.save(gradeHorarioOfertaFormacao);

    // =========================================================

    return this.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, {
      id: gradeHorarioOfertaFormacao.id,
    });
  }

  async gradeHorarioOfertaFormacaoDeleteOneById(accessContext: AccessContext, domain: IDomain.GradeHorarioOfertaFormacaoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao:delete",
      { dto: domain },
      domain.id,
      this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao),
    );

    // =========================================================

    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, domain);

    // =========================================================

    if (gradeHorarioOfertaFormacao) {
      await this.gradeHorarioOfertaFormacaoRepository
        .createQueryBuilder(aliasGradeHorarioOfertaFormacao)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :gradeHorarioOfertaFormacaoId", {
          gradeHorarioOfertaFormacaoId: gradeHorarioOfertaFormacao.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
