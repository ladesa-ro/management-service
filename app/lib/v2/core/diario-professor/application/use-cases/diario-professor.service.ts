import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { PerfilService } from "@/v2/core/perfil/application/use-cases/perfil.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { DiarioProfessorEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "@/v2/adapters/in/http/diario-professor/dto";

// ============================================================================

const aliasDiarioProfessor = "diario_professor";

// ============================================================================

@Injectable()
export class DiarioProfessorService {
  constructor(
    private diarioService: DiarioService,
    private perfilService: PerfilService,
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get diarioProfessorRepository() {
    return this.databaseContext.diarioProfessorRepository;
  }

  async diarioProfessorFindAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutputDto> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      {
        ...dto,
        sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      },
      {
        ...paginateConfig,
        select: [
          "id",

          "situacao",

          "diario.id",

          "perfil.id",
          "perfil.campus.id",
          "perfil.usuario.id",
        ],
        relations: {
          diario: true,
          perfil: {
            campus: true,
            usuario: true,
          },
        },
        sortableColumns: ["situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
        searchableColumns: [
          "id",

          "situacao",
          "diario.id",
          "perfil.campus.id",
          "perfil.usuario.id",
        ],
        defaultSortBy: [],
        filterableColumns: {
          "perfil.usuario.id": FilterOperator.EQ,
          "perfil.id": FilterOperator.EQ,
          "diario.id": FilterOperator.EQ,
        },
      },
    );

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as unknown as DiarioProfessorListOutputDto;
  }

  async diarioProfessorFindById(accessContext: AccessContext, dto: DiarioProfessorFindOneInputDto, selection?: string[] | boolean): Promise<DiarioProfessorFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor as DiarioProfessorFindOneOutputDto | null;
  }

  async diarioProfessorFindByIdStrict(accessContext: AccessContext, dto: DiarioProfessorFindOneInputDto, selection?: string[] | boolean): Promise<DiarioProfessorFindOneOutputDto> {
    const diarioProfessor = await this.diarioProfessorFindById(accessContext, dto, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor as DiarioProfessorFindOneOutputDto | null;
  }

  async diarioProfessorFindByIdSimpleStrict(accessContext: AccessContext, id: DiarioProfessorFindOneInputDto["id"], selection?: string[] | boolean): Promise<DiarioProfessorFindOneOutputDto> {
    const diarioProfessor = await this.diarioProfessorFindByIdSimple(accessContext, id, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorCreate(accessContext: AccessContext, dto: DiarioProfessorCreateInputDto): Promise<DiarioProfessorFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:create", { dto } as any);

    // =========================================================

    const dtoDiarioProfessor = pick(dto, ["situacao"]);

    const diarioProfessor = this.diarioProfessorRepository.create();

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto, "diario") && dto.diario !== undefined) {
      if (dto.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto, "perfil") && dto.perfil !== undefined) {
      if (dto.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: dto.perfil.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          perfil: {
            id: perfil.id,
          },
        });
      }
    }

    // =========================================================

    await this.diarioProfessorRepository.save(diarioProfessor);

    // =========================================================

    return this.diarioProfessorFindByIdStrict(accessContext, {
      id: diarioProfessor.id,
    });
  }

  async diarioProfessorUpdate(accessContext: AccessContext, dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto): Promise<DiarioProfessorFindOneOutputDto> {
    // =========================================================

    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("diario_professor:update", { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor as any));

    const dtoDiarioProfessor = pick(dto, ["situacao"]);

    const diarioProfessor = {
      id: currentDiarioProfessor.id,
    } as DiarioProfessorEntity;

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto, "diario") && dto.diario !== undefined) {
      if (dto.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto, "perfil") && dto.perfil !== undefined) {
      if (dto.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: dto.perfil.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          perfil: {
            id: perfil.id,
          },
        });
      }
    }

    // =========================================================

    await this.diarioProfessorRepository.save(diarioProfessor);

    // =========================================================

    return this.diarioProfessorFindByIdStrict(accessContext, {
      id: diarioProfessor.id,
    });
  }

  async diarioProfessorDeleteOneById(accessContext: AccessContext, dto: DiarioProfessorFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:delete", { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor as any));

    // =========================================================

    const diarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diarioProfessor) {
      await this.diarioProfessorRepository
        .createQueryBuilder(aliasDiarioProfessor)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diarioProfessorId", {
          diarioProfessorId: diarioProfessor.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
