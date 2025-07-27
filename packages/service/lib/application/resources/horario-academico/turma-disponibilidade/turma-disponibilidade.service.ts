import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { SearchService } from "@/application/helpers/search.service";
import { TurmaService } from "@/application/resources/ensino/discente/turma/turma.service";
import { DisponibilidadeService } from "@/application/resources/horario-academico/disponibilidade/disponibilidade.service";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { TurmaDisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasTurmaDisponibilidade = "turma_disponibilidade";

// ============================================================================

@Injectable()
export class TurmaDisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private turmaService: TurmaService,
    private disponibilidadeService: DisponibilidadeService,
    private searchService: SearchService,
  ) {}

  get turmaDisponibilidadeRepository() {
    return this.databaseContext.turmaDisponibilidadeRepository;
  }

  async turmaDisponibilidadeFindAll(
    accessContext: AccessContext,
    dto: IDomain.TurmaDisponibilidadeListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.TurmaDisponibilidadeListOutput["success"]> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("turma_disponibilidade:find", qb, aliasTurmaDisponibilidade, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
      {
        select: [
          "id",

          "dateCreated",
        ],
        relations: {
          turma: true,
          disponibilidade: true,
        },
        sortableColumns: ["dateCreated"],
        searchableColumns: ["id"],
        defaultSortBy: [["dateCreated", "ASC"]],
        filterableColumns: {
          "turma.id": [FilterOperator.EQ],
          "disponibilidade.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidadeView, qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async turmaDisponibilidadeFindById(
    accessContext: AccessContext | null,
    dto: IDomain.TurmaDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<IDomain.TurmaDisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("turma_disponibilidade:find", qb, aliasTurmaDisponibilidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidadeView, qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdStrict(accessContext: AccessContext, dto: IDomain.TurmaDisponibilidadeFindOneInput, selection?: string[]) {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindById(accessContext, dto, selection);

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.TurmaDisponibilidadeFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.TurmaDisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("turma_disponibilidade:find", qb, aliasTurmaDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.TurmaDisponibilidadeView, qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.TurmaDisponibilidadeFindOneInput["id"], selection?: string[]) {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindByIdSimple(accessContext, id, selection);

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeCreate(accessContext: AccessContext, dto: IDomain.TurmaDisponibilidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade:create", {
      dto,
    });

    // =========================================================

    const dtoTurmaDisponibilidade = pick(dto.body, []);

    const turmaDisponibilidade = this.turmaDisponibilidadeRepository.create();

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (dto.body.turma) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.body.turma.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: {
          id: turma.id,
        },
      });
    }

    // =========================================================

    if (dto.body.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, dto.body.disponibilidade.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    // =========================================================

    return this.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: turmaDisponibilidade.id,
    });
  }

  async turmaDisponibilidadeUpdate(accessContext: AccessContext, dto: IDomain.TurmaDisponibilidadeUpdateByIdInput) {
    // =========================================================

    const currentTurmaDisponibilidade = await this.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });

    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade:update", { dto }, dto.parameters.path.id, this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade));

    const dtoTurmaDisponibilidade = pick(dto.body, []);

    const turmaDisponibilidade = <TurmaDisponibilidadeEntity>{
      id: currentTurmaDisponibilidade.id,
    };

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (has(dto.body, "turma") && dto.body.turma !== undefined) {
      const turma = dto.body.turma && (await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.body.turma.id));

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: turma && {
          id: turma.id,
        },
      });
    }

    if (has(dto.body, "disponibilidade") && dto.body.disponibilidade !== undefined) {
      const disponibilidade = dto.body.disponibilidade && (await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, dto.body.disponibilidade.id));

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        disponibilidade: disponibilidade && {
          id: disponibilidade.id,
        },
      });
    }

    // =========================================================

    await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    // =========================================================

    return this.turmaDisponibilidadeFindByIdStrict(accessContext, {
      id: turmaDisponibilidade.id,
    });
  }

  async turmaDisponibilidadeDeleteOneById(accessContext: AccessContext, dto: IDomain.TurmaDisponibilidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade:delete", { dto }, dto.id, this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade));

    // =========================================================

    const turmaDisponibilidade = await this.turmaDisponibilidadeFindByIdStrict(accessContext, dto);

    // =========================================================

    if (turmaDisponibilidade) {
      await this.turmaDisponibilidadeRepository
        .createQueryBuilder(aliasTurmaDisponibilidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :turmaDisponibilidadeId", {
          turmaDisponibilidadeId: turmaDisponibilidade.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
