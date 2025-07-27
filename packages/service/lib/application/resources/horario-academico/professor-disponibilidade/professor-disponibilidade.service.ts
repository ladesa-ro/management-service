import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { SearchService } from "@/application/helpers/search.service";
import { PerfilService } from "@/application/resources/autorizacao/perfil/perfil.service";
import { DisponibilidadeService } from "@/application/resources/horario-academico/disponibilidade/disponibilidade.service";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { ProfessorDisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities";

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
    dto: IDomain.ProfessorDisponibilidadeListInput | null = null,
    selection?: string[],
  ): Promise<IDomain.ProfessorDisponibilidadeListOutput["success"]> {
    // =========================================================

    const qb = this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("professor_disponibilidade:find", qb, aliasProfessorDisponibilidade, null);

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
    QbEfficientLoad(LadesaTypings.Tokens.ProfessorDisponibilidadeView, qb, aliasProfessorDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async professorDisponibilidadeFindById(
    accessContext: AccessContext | null,
    dto: IDomain.ProfessorDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<IDomain.ProfessorDisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("professor_disponibilidade:find", qb, aliasProfessorDisponibilidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasProfessorDisponibilidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.ProfessorDisponibilidadeView, qb, aliasProfessorDisponibilidade, selection);

    // =========================================================

    const professorDisponibilidade = await qb.getOne();

    // =========================================================

    return professorDisponibilidade;
  }

  async professorDisponibilidadeFindByIdStrict(accessContext: AccessContext, dto: IDomain.ProfessorDisponibilidadeFindOneInput, selection?: string[]) {
    const professorDisponibilidade = await this.professorDisponibilidadeFindById(accessContext, dto, selection);

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
    QbEfficientLoad(LadesaTypings.Tokens.ProfessorDisponibilidadeView, qb, aliasProfessorDisponibilidade, selection);

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

  async professorDisponibilidadeCreate(accessContext: AccessContext, dto: IDomain.ProfessorDisponibilidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("professor_disponibilidade:create", {
      dto,
    });

    // =========================================================

    const dtoProfessorDisponibilidade = pick(dto.body, []);

    const professorDisponibilidade = this.professorDisponibilidadeRepository.create();

    this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
      ...dtoProfessorDisponibilidade,
    });

    // =========================================================

    if (dto.body.perfil) {
      const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, dto.body.perfil);

      this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
        perfil: {
          id: perfil.id,
        },
      });
    }

    // =========================================================

    if (dto.body.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, dto.body.disponibilidade.id);

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

  async professorDisponibilidadeUpdate(accessContext: AccessContext, dto: IDomain.ProfessorDisponibilidadeUpdateByIdInput) {
    // =========================================================

    const currentProfessorDisponibilidade = await this.professorDisponibilidadeFindByIdStrict(accessContext, dto);

    // =========================================================

    await accessContext.ensurePermission(
      "professor_disponibilidade:update",
      { dto },
      dto.parameters.path.id,
      this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade),
    );

    const dtoProfessorDisponibilidade = pick(dto.body, []);

    const professorDisponibilidade = <ProfessorDisponibilidadeEntity>{
      id: currentProfessorDisponibilidade.id,
    };

    this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
      ...dtoProfessorDisponibilidade,
    });

    // =========================================================

    if (has(dto.body, "perfil") && dto.body.perfil !== undefined) {
      const perfil = dto.body.perfil && (await this.perfilService.perfilFindByIdStrict(accessContext, dto.body.perfil));

      this.professorDisponibilidadeRepository.merge(professorDisponibilidade, {
        perfil: perfil && {
          id: perfil.id,
        },
      });
    }

    if (has(dto.body, "disponibilidade") && dto.body.disponibilidade !== undefined) {
      const disponibilidade = dto.body.disponibilidade && (await this.disponibilidadeService.disponibilidadeFindByIdSimpleStrict(accessContext, dto.body.disponibilidade.id));

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

  async professorDisponibilidadeDeleteOneById(accessContext: AccessContext, dto: IDomain.ProfessorDisponibilidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("professor_disponibilidade:delete", { dto }, dto.id, this.professorDisponibilidadeRepository.createQueryBuilder(aliasProfessorDisponibilidade));

    // =========================================================

    const professorDisponibilidade = await this.professorDisponibilidadeFindByIdStrict(accessContext, dto);

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
