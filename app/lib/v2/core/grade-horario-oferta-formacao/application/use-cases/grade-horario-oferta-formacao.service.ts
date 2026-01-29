import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { AccessContext } from "@/old/infrastructure/access-context";
import { paginateConfig } from "@/old/infrastructure/fixtures";
import { QbEfficientLoad, SearchService } from "@/old/shared";
import type {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "@/v2/server/modules/grade-horario-oferta-formacao/http/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { GradeHorarioOfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";

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
    dto: GradeHorarioOfertaFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoListOutputDto> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(
      aliasGradeHorarioOfertaFormacao,
    );

    // =========================================================

    await accessContext.applyFilter(
      "grade_horario_oferta_formacao:find",
      qb,
      aliasGradeHorarioOfertaFormacao,
      null,
    );

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
    QbEfficientLoad(
      "GradeHorarioOfertaFormacaoFindOneOutput",
      qb,
      aliasGradeHorarioOfertaFormacao,
      selection,
    );

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!,
    );

    // =========================================================

    return paginated as unknown as GradeHorarioOfertaFormacaoListOutputDto;
  }

  async gradeHorarioOfertaFormacaoFindById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(
      aliasGradeHorarioOfertaFormacao,
    );

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter(
        "grade_horario_oferta_formacao:find",
        qb,
        aliasGradeHorarioOfertaFormacao,
        null,
      );
    }

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacao}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      "GradeHorarioOfertaFormacaoFindOneOutput",
      qb,
      aliasGradeHorarioOfertaFormacao,
      selection,
    );

    // =========================================================

    const gradeHorarioOfertaFormacao = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacao as GradeHorarioOfertaFormacaoFindOneOutputDto | null;
  }

  async gradeHorarioOfertaFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindById(
      accessContext,
      dto,
      selection,
    );

    if (!gradeHorarioOfertaFormacao) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacao;
  }

  async gradeHorarioOfertaFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(
      aliasGradeHorarioOfertaFormacao,
    );

    // =========================================================

    await accessContext.applyFilter(
      "grade_horario_oferta_formacao:find",
      qb,
      aliasGradeHorarioOfertaFormacao,
      null,
    );

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacao}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      "GradeHorarioOfertaFormacaoFindOneOutput",
      qb,
      aliasGradeHorarioOfertaFormacao,
      selection,
    );

    // =========================================================

    const gradeHorarioOfertaFormacao = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacao as GradeHorarioOfertaFormacaoFindOneOutputDto | null;
  }

  async gradeHorarioOfertaFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!gradeHorarioOfertaFormacao) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacao;
  }

  async gradeHorarioOfertaFormacaoCreate(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("grade_horario_oferta_formacao:create", { dto } as any);

    // =========================================================

    const dtoGradeHorarioOfertaFormacao = pick(dto, []);

    const gradeHorarioOfertaFormacao = this.gradeHorarioOfertaFormacaoRepository.create();

    this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
      ...dtoGradeHorarioOfertaFormacao,
    });

    // =========================================================

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    if (dto.campus) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(
        accessContext,
        dto.campus.id,
      );

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );

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

  async gradeHorarioOfertaFormacaoUpdate(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto> {
    // =========================================================

    const currentGradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdStrict(
      accessContext,
      dto,
    );

    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao:update",
      { dto },
      dto.id,
      this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao),
    );

    const dtoGradeHorarioOfertaFormacao = pick(dto, ["nome", "slug"]);

    const gradeHorarioOfertaFormacao = <GradeHorarioOfertaFormacaoEntity>{
      id: currentGradeHorarioOfertaFormacao.id,
    };

    this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
      ...dtoGradeHorarioOfertaFormacao,
    });

    // =========================================================

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus =
        dto.campus &&
        (await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id));

      this.gradeHorarioOfertaFormacaoRepository.merge(gradeHorarioOfertaFormacao, {
        campus: campus && {
          id: campus.id,
        },
      });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        ));

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

  async gradeHorarioOfertaFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao:delete",
      { dto },
      dto.id,
      this.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(aliasGradeHorarioOfertaFormacao),
    );

    // =========================================================

    const gradeHorarioOfertaFormacao = await this.gradeHorarioOfertaFormacaoFindByIdStrict(
      accessContext,
      dto,
    );

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
