import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { QbEfficientLoad, SearchService } from "@/v2/old/shared";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "@/v2/server/modules/grade-horario-oferta-formacao-intervalo-de-tempo/http/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoEntity
} from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  GradeHorarioOfertaFormacaoService
} from "@/v2/core/grade-horario-oferta-formacao/application/use-cases/grade-horario-oferta-formacao.service";
import { IntervaloDeTempoService } from "@/v2/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";

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
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto | null = null,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
    );

    // =========================================================

    await accessContext.applyFilter(
      "grade_horario_oferta_formacao_intervalo_de_tempo:find",
      qb,
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
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
    QbEfficientLoad(
      "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput",
      qb,
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      selection,
    );

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!,
    );

    // =========================================================

    return paginated as unknown as GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
    );

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter(
        "grade_horario_oferta_formacao_intervalo_de_tempo:find",
        qb,
        aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
        null,
      );
    }

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacaoIntervaloDeTempo}.id = :id`, {
      id: dto.id,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput",
      qb,
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      selection,
    );

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacaoIntervaloDeTempo as GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    const gradeHorarioOfertaFormacaoIntervaloDeTempo =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(accessContext, dto, selection);

    if (!gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
    );

    // =========================================================

    await accessContext.applyFilter(
      "grade_horario_oferta_formacao_intervalo_de_tempo:find",
      qb,
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      null,
    );

    // =========================================================

    qb.andWhere(`${aliasGradeHorarioOfertaFormacaoIntervaloDeTempo}.id = :id`, {
      id,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput",
      qb,
      aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      selection,
    );

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await qb.getOne();

    // =========================================================

    return gradeHorarioOfertaFormacaoIntervaloDeTempo as GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    const gradeHorarioOfertaFormacaoIntervaloDeTempo =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimple(
        accessContext,
        id,
        selection,
      );

    if (!gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      throw new NotFoundException();
    }

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:create",
      { dto } as any,
    );

    // =========================================================

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(dto, []);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo =
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.create();

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
      {
        ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
      },
    );

    // =========================================================

    if (dto.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao =
        await this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.gradeHorarioOfertaFormacao.id,
        );

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          gradeHorarioOfertaFormacao: {
            id: gradeHorarioOfertaFormacao.id,
          },
        },
      );
    }

    // =========================================================

    if (dto.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          intervaloDeTempo: {
            id: intervaloDeTempo.id,
          },
        },
      );
    }

    // =========================================================

    await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.save(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
    );

    // =========================================================

    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, {
      id: gradeHorarioOfertaFormacaoIntervaloDeTempo.id,
    });
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
      GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {
    // =========================================================

    const currentGradeHorarioOfertaFormacaoIntervaloDeTempo =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, dto);

    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:update",
      { dto },
      dto.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
        aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      ),
    );

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(dto, ["nome", "slug"]);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = <
      GradeHorarioOfertaFormacaoIntervaloDeTempoEntity
    >{
      id: currentGradeHorarioOfertaFormacaoIntervaloDeTempo.id,
    };

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
      {
        ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
      },
    );

    // =========================================================

    if (has(dto, "gradeHorarioOfertaFormacao") && dto.gradeHorarioOfertaFormacao !== undefined) {
      const gradeHorarioOfertaFormacao =
        dto.gradeHorarioOfertaFormacao &&
        (await this.gradeHorarioOfertaFormacaoService.gradeHorarioOfertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.gradeHorarioOfertaFormacao.id,
        ));

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          gradeHorarioOfertaFormacao: gradeHorarioOfertaFormacao && {
            id: gradeHorarioOfertaFormacao.id,
          },
        },
      );
    }

    // =========================================================

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo =
        dto.intervaloDeTempo &&
        (await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.intervaloDeTempo,
        ));

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          intervaloDeTempo: intervaloDeTempo && {
            id: intervaloDeTempo.id,
          },
        },
      );
    }

    // =========================================================

    await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.save(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
    );

    // =========================================================

    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, {
      id: gradeHorarioOfertaFormacaoIntervaloDeTempo.id,
    });
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  ): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
      { dto },
      dto.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
        aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      ),
    );

    // =========================================================

    const gradeHorarioOfertaFormacaoIntervaloDeTempo =
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository
        .createQueryBuilder(aliasGradeHorarioOfertaFormacaoIntervaloDeTempo)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :gradeHorarioOfertaFormacaoIntervaloDeTempoId", {
          gradeHorarioOfertaFormacaoIntervaloDeTempoId:
            gradeHorarioOfertaFormacaoIntervaloDeTempo.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
