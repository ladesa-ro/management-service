import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { DiarioProfessorService } from "@/v2/core/diario-professor/application/use-cases/diario-professor.service";
import { HorarioGeradoService } from "@/v2/core/horario-gerado/application/use-cases/horario-gerado.service";
import { IntervaloDeTempoService } from "@/v2/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { HorarioGeradoAulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { DatabaseContextService, QbEfficientLoad, SearchService } from "@/shared";
import type {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "@/v2/adapters/in/http/horario-gerado-aula/dto";

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
    dto: HorarioGeradoAulaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutputDto> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
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
    QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as HorarioGeradoAulaListOutputDto;
  }

  async horarioGeradoAulaFindById(accessContext: AccessContext, dto: HorarioGeradoAulaFindOneInputDto, selection?: string[] | boolean): Promise<HorarioGeradoAulaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);
    // =========================================================

    const horarioGeradoAula = await qb.getOne();

    // =========================================================

    return horarioGeradoAula as HorarioGeradoAulaFindOneOutputDto | null;
  }

  async horarioGeradoAulaFindByIdStrict(accessContext: AccessContext, dto: HorarioGeradoAulaFindOneInputDto, selection?: string[] | boolean): Promise<HorarioGeradoAulaFindOneOutputDto> {
    const horarioGeradoAula = await this.horarioGeradoAulaFindById(accessContext, dto, selection);

    if (!horarioGeradoAula) {
      throw new NotFoundException();
    }

    return horarioGeradoAula;
  }

  async horarioGeradoAulaFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<HorarioGeradoAulaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula);

    // =========================================================

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);

    // =========================================================

    const horarioGeradoAula = await qb.getOne();

    // =========================================================

    return horarioGeradoAula as HorarioGeradoAulaFindOneOutputDto | null;
  }

  async horarioGeradoAulaFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<HorarioGeradoAulaFindOneOutputDto> {
    const horarioGeradoAula = await this.horarioGeradoAulaFindByIdSimple(accessContext, id, selection);

    if (!horarioGeradoAula) {
      throw new NotFoundException();
    }

    return horarioGeradoAula;
  }

  async horarioGeradoAulaCreate(accessContext: AccessContext, dto: HorarioGeradoAulaCreateInputDto): Promise<HorarioGeradoAulaFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:create", { dto });

    // =========================================================

    const dtoHorarioGeradoAula = pick(dto, ["diaSemanaIso"]);

    const horarioGeradoAula = this.horarioGeradoAulaRepository.create();

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    // =========================================================

    if (dto.diarioProfessor) {
      const diario = await this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, dto.diarioProfessor);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diario.id,
        },
      });
    }

    if (dto.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, dto.horarioGerado);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.intervaloDeTempo);

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

  async HorarioGeradoAulaUpdate(accessContext: AccessContext, dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto): Promise<HorarioGeradoAulaFindOneOutputDto> {
    // =========================================================

    const currentHorarioGeradoAula = await this.horarioGeradoAulaFindByIdStrict(accessContext, dto);

    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:update", { dto }, dto.id, this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula));

    const dtoHorarioGeradoAula = pick(dto, ["diaSemanaIso"]);

    const horarioGeradoAula = {
      id: currentHorarioGeradoAula.id,
    } as HorarioGeradoAulaEntity;

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    // =========================================================

    if (has(dto, "diarioProfessor") && dto.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.diarioProfessorFindByIdStrict(accessContext, dto.diarioProfessor!);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diarioProfessor.id,
        },
      });
    }

    if (has(dto, "horarioGerado") && dto.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.horarioGeradoFindByIdStrict(accessContext, dto.horarioGerado);

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(accessContext, dto.intervaloDeTempo!);

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

  async horarioGeradoAulaDeleteOneById(accessContext: AccessContext, dto: HorarioGeradoAulaFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado_aula:delete", { dto }, dto.id, this.horarioGeradoAulaRepository.createQueryBuilder(aliasHorarioGeradoAula));

    // =========================================================

    const horarioGerado = await this.horarioGeradoAulaFindByIdStrict(accessContext, dto);

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
