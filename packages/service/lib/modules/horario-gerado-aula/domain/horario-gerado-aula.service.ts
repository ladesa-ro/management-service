import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/contracts/qb-efficient-load";
import { SearchService } from "@/legacy/application/helpers/search.service";
import { DiarioProfessorService } from "@/legacy/application/resources/ensino/discente/diario-professor/diario-professor.service";
import { IDomain } from "@/legacy/domain/contracts";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/intervalo-de-tempo.service";
import type { AccessContext } from "@/shared/infrastructure/access-context";
import { paginateConfig } from "@/shared/infrastructure/fixtures";
import { DatabaseContextService } from "@/shared/infrastructure/integrations/database";
import type { HorarioGeradoAulaEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";
import { HorarioGeradoService } from "../horario-gerado/horario-gerado.service";

// ============================================================================

const aliasHorarioGeradoAula = "horario_gerado_dia";

// ============================================================================

@Injectable()
export class HorarioGeradoAulaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private diarioProfessorService: DiarioProfessorService,
    private horarioGeradoService: HorarioGeradoService,
    private intervaloDeTempoService: IntervaloDeTempoService,
    private searchService: SearchService,
  ) {}

  get horarioGeradoAulaRepository() {
    return this.databaseContext.horarioGeradoAulaRepository;
  }

  async horarioGeradoAulaFindAll(
    accessContext: AccessContext,
    domain: IDomain.HorarioGeradoAulaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<IDomain.HorarioGeradoAulaListOutput["success"]> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
      {
        ...paginateConfig,
        select: [
          "id",

          "diaSemanaIso",
          "horarioGerado",
          "diarioProfessor",
          "intervaloDeTempo",

          "diarioProfessor.id",
          "diarioProfessor.situacao",

          "intervaloDeTempo.id",
          "intervaloDeTempo.periodoInicio",
          "intervaloDeTempo.periodoFim",

          "horarioGerado.id",
          "horarioGerado.status",
          "horarioGerado.tipo",
          "horarioGerado.dataGeracao",
          "horarioGerado.vigenciaInicio",
          "horarioGerado.vigenciaFim",
        ],
        sortableColumns: [
          "diaSemanaIso",
          "horarioGerado",
          "diarioProfessor",
          "intervaloDeTempo",

          "diarioProfessor.id",
          "intervaloDeTempo.id",
          "horarioGerado.id",
        ],
        searchableColumns: [
          "id",

          "diaSemanaIso",
          "horarioGerado",
          "diarioProfessor",
          "intervaloDeTempo",
        ],
        relations: {
          diarioProfessor: true,
          intervaloDeTempo: true,
          horarioGerado: true,
        },
        defaultSortBy: [],
        filterableColumns: {
          // 'diarioProfessor.id': [FilterOperator.EQ],
          "horarioGerado.id": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async horarioGeradoAulaFindById(accessContext: AccessContext, domain: IDomain.HorarioGeradoAulaFindOneInput, selection?: string[] | boolean): Promise<IDomain.HorarioGeradoAulaFindOneOutput | null> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);
    // =========================================================

    const horarioGeradoAula = await qb.getOne();

    // =========================================================

    return horarioGeradoAula;
  }

  async horarioGeradoAulaFindByIdStrict(accessContext: AccessContext, domain: IDomain.HorarioGeradoAulaFindOneInput, selection?: string[] | boolean) {
    const horarioGeradoAula = await this.horarioGeradoAulaFindById(accessContext, domain, selection);

    if (!horarioGeradoAula) {
      throw new NotFoundException();
    }

    return horarioGeradoAula;
  }

  async horarioGeradoAulaFindByIdSimple(accessContext: AccessContext, id: IDomain.HorarioGeradoAulaFindOneInput["id"], selection?: string[]): Promise<IDomain.HorarioGeradoAulaFindOneOutput | null> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);

    // =========================================================

    const horarioGeradoAula = await qb.getOne();

    // =========================================================

    return horarioGeradoAula;
  }

  async horarioGeradoAulaFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.HorarioGeradoAulaFindOneInput["id"], selection?: string[]) {
    const horarioGeradoAula = await this.horarioGeradoAulaFindByIdSimple(accessContext, id, selection);

    if (!horarioGeradoAula) {
      throw new NotFoundException();
    }

    return horarioGeradoAula;
  }

  async HorarioGeradoAulaCreate(accessContext: AccessContext, domain: IDomain.HorarioGeradoAulaCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:create", { dto: domain });

    // =========================================================

    const dtoHorarioGeradoAula = pick(domain, ["diaSemanaIso"]);

    const horarioGeradoAula = this.horarioGeradoAulaRepository.create();

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    // =========================================================

    if (domain.diarioProfessor) {
      const diario = await this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, domain.diarioProfessor);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diario.id,
        },
      });
    }

    if (domain.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, domain.horarioGerado);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (domain.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.intervaloDeTempo);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoAulaRepository.save(horarioGeradoAula);

    // =========================================================

    return this.horarioGeradoAulaFindByIdStrict(accessContext, {
      id: horarioGeradoAula.id,
    });
  }

  async HorarioGeradoAulaUpdate(accessContext: AccessContext, domain: IDomain.HorarioGeradoAulaUpdateInput) {
    // =========================================================

    const currentHorarioGeradoAula = await this.horarioGeradoAulaFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:update", { dto: domain }, domain.id, this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula));

    const dtoHorarioGeradoAula = pick(domain, ["diaSemanaIso"]);

    const horarioGeradoAula = {
      id: currentHorarioGeradoAula.id,
    } as HorarioGeradoAulaEntity;

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    // =========================================================

    if (has(domain, "diarioProfessor") && domain.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, domain.diarioProfessor!);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diarioProfessor.id,
        },
      });
    }

    if (has(domain, "horarioGerado") && domain.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, domain.horarioGerado);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (has(domain, "intervaloDeTempo") && domain.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, domain.intervaloDeTempo!);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoAulaRepository.save(horarioGeradoAula);

    // =========================================================

    return this.horarioGeradoAulaFindByIdStrict(accessContext, {
      id: horarioGeradoAula.id,
    });
  }

  async horarioGeradoAulaDeleteOneById(accessContext: AccessContext, domain: IDomain.HorarioGeradoAulaFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:delete", { dto: domain }, domain.id, this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula));

    // =========================================================

    const horarioGerado = await this.horarioGeradoAulaFindByIdStrict(accessContext, domain);

    // =========================================================

    if (horarioGerado) {
      await this.horarioGeradoAulaRepository
        .createQueryBuilder(aliasHorarioGeradoAula)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :horarioGeradoId", { horarioGeradoId: horarioGerado.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
