import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DiarioProfessorEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { PerfilService } from "../../../autorizacao/perfil/perfil.service";
import { DiarioService } from "../diario/diario.service";

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
    domain: IDomain.DiarioProfessorListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<IDomain.DiarioProfessorListOutput["success"]> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
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
    await QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async diarioProfessorFindById(accessContext: AccessContext, domain: IDomain.DiarioProfessorFindOneInput, selection?: string[] | boolean): Promise<IDomain.DiarioProfessorFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdStrict(accessContext: AccessContext, domain: IDomain.DiarioProfessorFindOneInput, selection?: string[] | boolean) {
    const diarioProfessor = await this.diarioProfessorFindById(accessContext, domain, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.DiarioProfessorFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<IDomain.DiarioProfessorFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DiarioProfessorFindOneInput["id"], selection?: string[] | boolean) {
    const diarioProfessor = await this.diarioProfessorFindByIdSimple(accessContext, id, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorCreate(accessContext: AccessContext, domain: IDomain.DiarioProfessorCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:create", { dto: domain });

    // =========================================================

    const dtoDiarioProfessor = pick(domain, ["situacao"]);

    const diarioProfessor = this.diarioProfessorRepository.create();

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(domain, "diario") && domain.diario !== undefined) {
      if (domain.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: domain.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(domain, "perfil") && domain.perfil !== undefined) {
      if (domain.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: domain.perfil.id,
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

  async diarioProfessorUpdate(accessContext: AccessContext, domain: IDomain.DiarioProfessorUpdateInput) {
    // =========================================================

    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission("diario_professor:update", { dto: domain }, domain.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    const dtoDiarioProfessor = pick(domain, ["situacao"]);

    const diarioProfessor = {
      id: currentDiarioProfessor.id,
    } as DiarioProfessorEntity;

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(domain, "diario") && domain.diario !== undefined) {
      if (domain.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: domain.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(domain, "perfil") && domain.perfil !== undefined) {
      if (domain.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: domain.perfil.id,
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

  async diarioProfessorDeleteOneById(accessContext: AccessContext, domain: IDomain.DiarioProfessorFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:delete", { dto: domain }, domain.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    // =========================================================

    const diarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, domain);

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
