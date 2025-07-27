import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { SearchService } from "@/application/helpers/search.service";
import { CampusService } from "@/application/resources/ambientes/campus/campus.service";
import { OfertaFormacaoService } from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.service";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { IDomain } from "@/domain/contracts/integration";
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
    dto: IDomain.GradeHorarioOfertaFormacaoListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoListOutput["success"]> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao);

    // =========================================================

    await accessContext.applyFilter("grade_horario_oferta_formacao:find", qb, aliasGradeHorarioOfertaFormacao, null);

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
    QbEfficientLoad(LadesaTypings.Tokens.GradeHorarioOfertaFormacaoView, qb, aliasGradeHorarioOfertaFormacao, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async gradeHorarioOfertaFormacaoFindById(
    accessContext: AccessContext | null,
    dto: IDomain.GradeHorarioOfertaFormacaoFindOneInput,
    selection?: string[],
  ): Promise<IDomain.GradeHorarioOfertaFormacaoFindOneOutput | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("grade_horario_oferta_formacao:find", qb, aliasGradeHorarioOfertaFormacao, null);
    }

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacao}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.GradeHorarioOfertaFormacaoView, qb, aliasGradeHorarioOfertaFormacao, selection);

    // =========================================================

    const gradeHorarioOfertaFormacao = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacao;
  }

  async gradeHorarioOfertaFormacaoFindByIdStrict(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoFindOneInput, selection?: string[]) {
    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindById(accessContext, dto, selection);

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
    QbEfficientLoad(LadesaTypings.Tokens.GradeHorarioOfertaFormacaoView, qb, aliasGradeHorarioOfertaFormacao, selection);

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

  async gradeHorarioOfertaFormacaoCreate(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("grade_horario_oferta_formacao:create", { dto });

    // =========================================================

    const dtoGradeHorarioOfertaFormacao = pick(dto.body, []);

    const gradeHorarioOfertaFormacao = this.gradeHorarioOfertaFormacaoRepository.create();

    this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
      ...dtoGradeHorarioOfertaFormacao,
    });

    // =========================================================

    if (dto.body.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.body.ofertaFormacao.id);

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (dto.body.campus) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (dto.body.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.body.ofertaFormacao.id);

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

  async gradeHorarioOfertaFormacaoUpdate(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoUpdateByIdInput) {
    // =========================================================

    const currentGradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao:update",
      { dto },
      dto.parameters.path.id,
      this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao),
    );

    const dtoGradeHorarioOfertaFormacao = pick(dto.body, ["nome", "slug"]);

    const gradeHorarioOfertaFormacao = <GradeHorarioOfertaFormacaoEntity>{
      id: currentGradeHorarioOfertaFormacao.id,
    };

    this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
      ...dtoGradeHorarioOfertaFormacao,
    });

    // =========================================================

    if (has(dto.body, "campus") && dto.body.campus !== undefined) {
      const campus = dto.body.campus && (await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id));

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        campus: campus && {
          id: campus.id,
        },
      });
    }

    if (has(dto.body, "ofertaFormacao") && dto.body.ofertaFormacao !== undefined) {
      const ofertaFormacao = dto.body.ofertaFormacao && (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.body.ofertaFormacao.id));

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

  async gradeHorarioOfertaFormacaoDeleteOneById(accessContext: AccessContext, dto: IDomain.GradeHorarioOfertaFormacaoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("grade_horario_oferta_formacao:delete", { dto }, dto.id, this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao));

    // =========================================================

    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdStrict(accessContext, dto);

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
