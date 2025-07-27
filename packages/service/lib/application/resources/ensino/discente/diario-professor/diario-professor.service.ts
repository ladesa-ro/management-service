import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { SearchService } from "@/application/helpers/search.service";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { IDomain } from "@/domain/contracts/integration";
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
    dto: IDomain.DiarioProfessorListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<IDomain.DiarioProfessorListOutput["success"]> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
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
    QbEfficientLoad(LadesaTypings.Tokens.DiarioProfessorFindOneResultView, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async diarioProfessorFindById(accessContext: AccessContext, dto: IDomain.DiarioProfessorFindOneInput, selection?: string[] | boolean): Promise<IDomain.DiarioProfessorFindOneOutput | null> {
    // =========================================================

    const qb = this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor);

    // =========================================================

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    // =========================================================

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DiarioProfessorFindOneResultView, qb, aliasDiarioProfessor, selection);

    // =========================================================

    const diarioProfessor = await qb.getOne();

    // =========================================================

    return diarioProfessor;
  }

  async diarioProfessorFindByIdStrict(accessContext: AccessContext, dto: IDomain.DiarioProfessorFindOneInput, selection?: string[] | boolean) {
    const diarioProfessor = await this.diarioProfessorFindById(accessContext, dto, selection);

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
    QbEfficientLoad(LadesaTypings.Tokens.DiarioProfessorFindOneResultView, qb, aliasDiarioProfessor, selection);

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

  async diarioProfessorCreate(accessContext: AccessContext, dto: IDomain.DiarioProfessorCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:create", { dto });

    // =========================================================

    const dtoDiarioProfessor = pick(dto.body, ["situacao"]);

    const diarioProfessor = this.diarioProfessorRepository.create();

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto.body, "diario") && dto.body.diario !== undefined) {
      if (dto.body.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.body.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto.body, "perfil") && dto.body.perfil !== undefined) {
      if (dto.body.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: dto.body.perfil.id,
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

  async diarioProfessorUpdate(accessContext: AccessContext, dto: IDomain.DiarioProfessorUpdateByIdInput) {
    // =========================================================

    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, dto);

    // =========================================================

    await accessContext.ensurePermission("diario_professor:update", { dto }, dto.parameters.path.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

    const dtoDiarioProfessor = pick(dto.body, ["situacao"]);

    const diarioProfessor = {
      id: currentDiarioProfessor.id,
    } as DiarioProfessorEntity;

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    // =========================================================

    if (has(dto.body, "diario") && dto.body.diario !== undefined) {
      if (dto.body.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.body.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    // =========================================================

    if (has(dto.body, "perfil") && dto.body.perfil !== undefined) {
      if (dto.body.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: dto.body.perfil.id,
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

  async diarioProfessorDeleteOneById(accessContext: AccessContext, dto: IDomain.DiarioProfessorFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("diario_professor:delete", { dto }, dto.id, this.diarioProfessorRepository.createQueryBuilder(aliasDiarioProfessor));

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
