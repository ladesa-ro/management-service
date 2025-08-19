import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/contracts/qb-efficient-load";
import { SearchService } from "@/legacy/application/helpers/search.service";
import { PerfilService } from "@/legacy/application/resources/autorizacao/perfil/perfil.service";
import { DisponibilidadeService } from "@/legacy/application/resources/horario-academico/disponibilidade/disponibilidade.service";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import type { AccessContext } from "@/shared/infrastructure/access-context";
import { paginateConfig } from "@/shared/infrastructure/fixtures";
import { DatabaseContextService } from "@/shared/infrastructure/integrations/database";
import type { ProfessorDisponibilidadeEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasProfessorDisponibilidade = "professor_disponibilidade";

// ============================================================================

@Injectable()
export class ProfessorDisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private perfilService: PerfilService,
    private disponibilidadeService: DisponibilidadeService,
    private searchService: SearchService,
  ) {}

  get professorDisponibilidadeRepository() {
    return this.databaseContext.professorDisponibilidadeRepository;
  }

  async professorDisponibilidadeFindAll(
    accessContext: AccessContext,
    domain: IDomain.ProfessorDisponibilidadeListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.ProfessorDisponibilidadeListOutput["success"]> {
    // =========================================================

    const qb = this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("professor_disponibilidade:find", qb, aliasProfessorDisponibilidade, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      domain
        ? {
            ...domain,
            sortBy: domain.sortBy ? (domain.sortBy as any[]).map((s) => (typeof s === "string" ? s : Array.isArray(s) ? s.join(":") : `${s.column}:${s.direction ?? "ASC"}`)) : undefined,
          }
        : {},
      {
        ...paginateConfig,
        select: [
          "id",

          "dateCreated",
        ],
        relations: {
          perfil: true,
          disponibilidade: true,
        },
        sortableColumns: ["dateCreated"],
        searchableColumns: ["id"],
        defaultSortBy: [["dateCreated", "ASC"]],
        filterableColumns: {
          "perfil.id": [FilterOperator.EQ],
          "disponibilidade.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ProfessorDisponibilidadeFindOneOutput", qb, aliasProfessorDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async professorDisponibilidadeFindById(
    accessContext: AccessContext | null,
    domain: IDomain.ProfessorDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<IDomain.ProfessorDisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("professor_disponibilidade:find", qb, aliasProfessorDisponibilidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasProfessorDisponibilidade}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ProfessorDisponibilidadeFindOneOutput", qb, aliasProfessorDisponibilidade, selection);

    // =========================================================

    const professorDisponibilidade = await qb.getOne();

    // =========================================================

    return professorDisponibilidade;
  }

  async professorDisponibilidadeFindByIdStrict(accessContext: AccessContext, domain: IDomain.ProfessorDisponibilidadeFindOneInput, selection?: string[]) {
    const professorDisponibilidade = await this.professorDisponibilidadeFindById(accessContext, domain, selection);

    if (!professorDisponibilidade) {
      throw new NotFoundException();
    }

    return professorDisponibilidade;
  }

  async professorDisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: IDomain.ProfessorDisponibilidadeFindOneInput["id"],
    selection?: string[],
  ): Promise<IDomain.ProfessorDisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("professor_disponibilidade:find", qb, aliasProfessorDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasProfessorDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("ProfessorDisponibilidadeFindOneOutput", qb, aliasProfessorDisponibilidade, selection);

    // =========================================================

    const professorDisponibilidade = await qb.getOne();

    // =========================================================

    return professorDisponibilidade;
  }

  async professorDisponibilidadeFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.ProfessorDisponibilidadeFindOneInput["id"], selection?: string[]) {
    const professorDisponibilidade = await this.professorDisponibilidadeFindByIdSimple(accessContext, id, selection);

    if (!professorDisponibilidade) {
      throw new NotFoundException();
    }

    return professorDisponibilidade;
  }

  async professorDisponibilidadeCreate(accessContext: AccessContext, domain: IDomain.ProfessorDisponibilidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("professor_disponibilidade:create", {
      dto: domain,
    });

    // =========================================================

    const dtoProfessorDisponibilidade = pick(domain, []);

    const professorDisponibilidade = this.professorDisponibilidadeRepository.create();

    this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
      ...dtoProfessorDisponibilidade,
    });

    // =========================================================

    if (domain.perfil) {
      const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, domain.perfil);

      this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
        perfil: {
          id: perfil.id,
        },
      });
    }

    // =========================================================

    if (domain.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, domain.disponibilidade.id);

      this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    // =========================================================

    await this.professorDisponibilidadeRepository.save(professorDisponibilidade);

    // =========================================================

    return this.professorDisponibilidadeFindByIdStrict(accessContext, {
      id: professorDisponibilidade.id,
    });
  }

  async professorDisponibilidadeUpdate(accessContext: AccessContext, domain: IDomain.ProfessorDisponibilidadeUpdateInput) {
    // =========================================================

    const currentProfessorDisponibilidade = await this.professorDisponibilidadeFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("professor_disponibilidade:update", { dto: domain }, domain.id, this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade));

    const dtoProfessorDisponibilidade = pick(domain, []);

    const professorDisponibilidade = <ProfessorDisponibilidadeEntity>{
      id: currentProfessorDisponibilidade.id,
    };

    this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
      ...dtoProfessorDisponibilidade,
    });

    // =========================================================

    if (has(domain, "perfil") && domain.perfil !== undefined) {
      const perfil = domain.perfil && (await this.perfilService.perfilFindByIdStrict(accessContext, domain.perfil));

      this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
        perfil: perfil && {
          id: perfil.id,
        },
      });
    }

    if (has(domain, "disponibilidade") && domain.disponibilidade !== undefined) {
      const disponibilidade = domain.disponibilidade && (await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, domain.disponibilidade.id));

      this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
        disponibilidade: disponibilidade && {
          id: disponibilidade.id,
        },
      });
    }

    // =========================================================

    await this.professorDisponibilidadeRepository.save(professorDisponibilidade);

    // =========================================================

    return this.professorDisponibilidadeFindByIdStrict(accessContext, {
      id: professorDisponibilidade.id,
    });
  }

  async professorDisponibilidadeDeleteOneById(accessContext: AccessContext, domain: IDomain.ProfessorDisponibilidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("professor_disponibilidade:delete", { dto: domain }, domain.id, this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade));

    // =========================================================

    const professorDisponibilidade = await this.professorDisponibilidadeFindByIdStrict(accessContext, domain);

    // =========================================================

    if (professorDisponibilidade) {
      await this.professorDisponibilidadeRepository
        .createQueryBuilder(aliasProfessorDisponibilidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :professorDisponibilidadeId", {
          professorDisponibilidadeId: professorDisponibilidade.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
