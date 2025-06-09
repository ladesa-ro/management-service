import { IntervaloDeTempoService } from "@/application/resources/base/intervalo-de-tempo/intervalo-de-tempo.service";
import { DisponibilidadeService } from "@/application/resources/horario-academico/disponibilidade/disponibilidade.service";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DisponibilidadeDiaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";

// ============================================================================

const aliasDisponibilidadeDia = "disponibilidade_dia";

// ============================================================================

@Injectable()
export class DisponibilidadeDiaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private disponibilidadeService: DisponibilidadeService,
    private intervaloDeTempoService: IntervaloDeTempoService,
  ) {}

  get disponibilidadeDiaRepository() {
    return this.databaseContext.disponibilidadeDiaRepository;
  }

  //

  async disponibilidadeDiaFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.DisponibilidadeDiaListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DisponibilidadeDiaListOperationOutput["success"]> {
    // =========================================================

    const qb = this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia);

    // =========================================================

    await accessContext.applyFilter("disponibilidade_dia:find", qb, aliasDisponibilidadeDia, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "rrule",
        //
        "disponibilidade.id",
        "disponibilidade.dataInicio",
        "disponibilidade.dataFim",
        //
        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      sortableColumns: [
        //
        "disponibilidade.dataInicio",
        "disponibilidade.dataFim",
        //
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      searchableColumns: [
        //
        "id",
        //
        "rrule",
        //
        "disponibilidade.dataInicio",
        "disponibilidade.dataFim",
        //
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
      ],
      relations: {
        disponibilidade: true,
        intervaloDeTempo: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "disponibilidade.id": [FilterOperator.EQ],
        "intervaloDeTempo.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeDiaFindOneResultView, qb, aliasDisponibilidadeDia, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async disponibilidadeDiaFindById(
    accessContext: AccessContext,
    dto: LadesaTypings.DisponibilidadeDiaFindOneInputView,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.DisponibilidadeDiaFindOneResultView | null> {
    // =========================================================

    const qb = this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia);

    // =========================================================

    await accessContext.applyFilter("disponibilidade_dia:find", qb, aliasDisponibilidadeDia, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeDia}.id = :id`, {
      id: dto.id,
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeDiaFindOneResultView, qb, aliasDisponibilidadeDia, selection);
    // =========================================================

    const disponibilidadeDia = await qb.getOne();

    // =========================================================

    return disponibilidadeDia;
  }

  async disponibilidadeDiaFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeDiaFindOneInputView, selection?: string[] | boolean) {
    const disponibilidadeDia = await this.disponibilidadeDiaFindById(accessContext, dto, selection);

    if (!disponibilidadeDia) {
      throw new NotFoundException();
    }

    return disponibilidadeDia;
  }

  async disponibilidadeDiaFindByIdSimple(
    accessContext: AccessContext,
    id: LadesaTypings.DisponibilidadeDiaFindOneInputView["id"],
    selection?: string[],
  ): Promise<LadesaTypings.DisponibilidadeDiaFindOneResultView | null> {
    // =========================================================

    const qb = this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia);

    // =========================================================

    await accessContext.applyFilter("disponibilidade_dia:find", qb, aliasDisponibilidadeDia, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidadeDia}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeDiaFindOneResultView, qb, aliasDisponibilidadeDia, selection);

    // =========================================================

    const disponibilidadeDia = await qb.getOne();

    // =========================================================

    return disponibilidadeDia;
  }

  async disponibilidadeDiaFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.DisponibilidadeDiaFindOneInputView["id"], selection?: string[]) {
    const disponibilidadeDia = await this.disponibilidadeDiaFindByIdSimple(accessContext, id, selection);

    if (!disponibilidadeDia) {
      throw new NotFoundException();
    }

    return disponibilidadeDia;
  }

  //

  async disponibilidadeDiaCreate(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeDiaCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_dia:create", { dto });

    // =========================================================

    const dtoDisponibilidadeDia = pick(dto.body, ["rrule"]);

    const disponibilidadeDia = this.disponibilidadeDiaRepository.create();

    this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
      ...dtoDisponibilidadeDia,
    });

    // =========================================================

    if (dto.body.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, dto.body.disponibilidade);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    if (dto.body.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeDiaRepository.save(disponibilidadeDia);

    // =========================================================

    return this.disponibilidadeDiaFindByIdStrict(accessContext, {
      id: disponibilidadeDia.id,
    });
  }

  async disponibilidadeDiaUpdate(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeDiaUpdateByIdOperationInput) {
    // =========================================================

    const currentDisponibilidadeDia = await this.disponibilidadeDiaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("disponibilidade_dia:update", { dto }, dto.params.id, this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia));

    const dtoDisponibilidadeDia = pick(dto.body, ["diaSemanaIso", "aulasSeguidas", "dataInicio", "dataFim"]);

    const disponibilidadeDia = {
      id: currentDisponibilidadeDia.id,
    } as DisponibilidadeDiaEntity;

    this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
      ...dtoDisponibilidadeDia,
    });

    // =========================================================

    if (has(dto.body, "disponibilidade") && dto.body.disponibilidade !== undefined) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, dto.body.disponibilidade);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    if (has(dto.body, "intervaloDeTempo") && dto.body.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.body.intervaloDeTempo!);

      this.disponibilidadeDiaRepository.merge(disponibilidadeDia, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    // =========================================================

    await this.disponibilidadeDiaRepository.save(disponibilidadeDia);

    // =========================================================

    return this.disponibilidadeDiaFindByIdStrict(accessContext, {
      id: disponibilidadeDia.id,
    });
  }

  //

  async disponibilidadeDiaDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.DisponibilidadeDiaFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade_dia:delete", { dto }, dto.id, this.disponibilidadeDiaRepository.createQueryBuilder(aliasDisponibilidadeDia));

    // =========================================================

    const disponibilidadeDia = await this.disponibilidadeDiaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (disponibilidadeDia) {
      await this.disponibilidadeDiaRepository
        .createQueryBuilder(aliasDisponibilidadeDia)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disponibilidadeDiaId", {
          disponibilidadeDiaId: disponibilidadeDia.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
