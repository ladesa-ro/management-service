import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { AccessContext } from "@/infrastructure/access-context";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "@/v2/server/modules/turma-disponibilidade/http/dto";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { TurmaDisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { DisponibilidadeService } from "@/v2/core/disponibilidade/application/use-cases/disponibilidade.service";
import { TurmaService } from "@/v2/core/turma/application/use-cases/turma.service";

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
    dto: TurmaDisponibilidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeListOutputDto> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.applyFilter(
      "turma_disponibilidade:find",
      qb,
      aliasTurmaDisponibilidade,
      null,
    );

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
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
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("TurmaDisponibilidadeFindOneOutput", qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!,
    );

    // =========================================================

    return paginated as unknown as TurmaDisponibilidadeListOutputDto;
  }

  async turmaDisponibilidadeFindById(
    accessContext: AccessContext | null,
    dto: TurmaDisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutputDto | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter(
        "turma_disponibilidade:find",
        qb,
        aliasTurmaDisponibilidade,
        null,
      );
    }

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("TurmaDisponibilidadeFindOneOutput", qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade as TurmaDisponibilidadeFindOneOutputDto | null;
  }

  async turmaDisponibilidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindById(
      accessContext,
      dto,
      selection,
    );

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutputDto | null> {
    // =========================================================

    const qb = this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade);

    // =========================================================

    await accessContext.applyFilter(
      "turma_disponibilidade:find",
      qb,
      aliasTurmaDisponibilidade,
      null,
    );

    // =========================================================

    qb.andWhere(`${aliasTurmaDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("TurmaDisponibilidadeFindOneOutput", qb, aliasTurmaDisponibilidade, selection);

    // =========================================================

    const turmaDisponibilidade = await qb.getOne();

    // =========================================================

    return turmaDisponibilidade as TurmaDisponibilidadeFindOneOutputDto | null;
  }

  async turmaDisponibilidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const turmaDisponibilidade = await this.turmaDisponibilidadeFindByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!turmaDisponibilidade) {
      throw new NotFoundException();
    }

    return turmaDisponibilidade;
  }

  async turmaDisponibilidadeCreate(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("turma_disponibilidade:create", {
      dto,
    } as any);

    // =========================================================

    const dtoTurmaDisponibilidade = pick(dto, []);

    const turmaDisponibilidade = this.turmaDisponibilidadeRepository.create();

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (dto.turma) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: {
          id: turma.id,
        },
      });
    }

    // =========================================================

    if (dto.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(
        accessContext,
        dto.disponibilidade.id,
      );

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

  async turmaDisponibilidadeUpdate(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto,
  ): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    // =========================================================

    const currentTurmaDisponibilidade = await this.turmaDisponibilidadeFindByIdStrict(
      accessContext,
      { id: dto.id },
    );

    // =========================================================

    await accessContext.ensurePermission(
      "turma_disponibilidade:update",
      { dto },
      dto.id,
      this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade as any),
    );

    const dtoTurmaDisponibilidade = pick(dto, []);

    const turmaDisponibilidade = <TurmaDisponibilidadeEntity>{
      id: currentTurmaDisponibilidade.id,
    };

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    // =========================================================

    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma =
        dto.turma &&
        (await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id));

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: turma && {
          id: turma.id,
        },
      });
    }

    if (has(dto, "disponibilidade") && dto.disponibilidade !== undefined) {
      const disponibilidade =
        dto.disponibilidade &&
        (await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(
          accessContext,
          dto.disponibilidade.id,
        ));

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

  async turmaDisponibilidadeDeleteOneById(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission(
      "turma_disponibilidade:delete",
      { dto },
      dto.id,
      this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade as any),
    );

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
