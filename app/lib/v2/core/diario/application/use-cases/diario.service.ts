import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import { DisciplinaService } from "@/v2/core/disciplina/application/use-cases/disciplina.service";
import { TurmaService } from "@/v2/core/turma/application/use-cases/turma.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService, QbEfficientLoad } from "@/v2/adapters/out/persistence/typeorm";
import type { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { SearchService } from "@/shared";
import type {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "@/v2/adapters/in/http/diario/dto";

// ============================================================================

const aliasDiario = "diario";

// ============================================================================

@Injectable()
export class DiarioService {
  constructor(
    private calendarioLetivoService: CalendarioLetivoService,
    private databaseContext: DatabaseContextService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private ambienteService: AmbienteService,
    private searchService: SearchService,
  ) {}

  get diarioRepository() {
    return this.databaseContext.diarioRepository;
  }

  async diarioFindAll(accessContext: AccessContext, dto: DiarioListInputDto | null = null, selection?: string[] | boolean): Promise<DiarioListOutputDto> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "ativo",

        "turma.id",
        "turma.periodo",
        "disciplina.id",
        "disciplina.nome",
        "ambientePadrao.id",
        "ambientePadrao.nome",
      ],
      sortableColumns: [
        "ativo",

        "disciplina.nome",
        "ambientePadrao.nome",
      ],
      relations: {
        turma: true,
        disciplina: true,
        ambientePadrao: true,
      },
      searchableColumns: [
        "id",

        "ativo",
        "ano",
        "etapa",
        "turma.periodo",
        "disciplina.nome",
      ],
      defaultSortBy: [],
      filterableColumns: {
        "turma.id": [FilterOperator.EQ],
        "disciplina.id": [FilterOperator.EQ],
        "ambientePadrao.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as unknown as DiarioListOutputDto;
  }

  async diarioFindById(accessContext: AccessContext, dto: DiarioFindOneInputDto, selection?: string[] | boolean): Promise<DiarioFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario as DiarioFindOneOutputDto | null;
  }

  async diarioFindByIdStrict(accessContext: AccessContext, dto: DiarioFindOneInputDto, selection?: string[] | boolean): Promise<DiarioFindOneOutputDto> {
    const diario = await this.diarioFindById(accessContext, dto, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioFindByIdSimple(accessContext: AccessContext, id: DiarioFindOneInputDto["id"], selection?: string[] | boolean): Promise<DiarioFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diarioRepository.createQueryBuilder(aliasDiario);

    // =========================================================

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    // =========================================================

    qb.andWhere(`${aliasDiario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    // =========================================================

    const diario = await qb.getOne();

    // =========================================================

    return diario as DiarioFindOneOutputDto | null;
  }

  async diarioFindByIdSimpleStrict(accessContext: AccessContext, id: DiarioFindOneInputDto["id"], selection?: string[] | boolean): Promise<DiarioFindOneOutputDto> {
    const diario = await this.diarioFindByIdSimple(accessContext, id, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioCreate(accessContext: AccessContext, dto: DiarioCreateInputDto): Promise<DiarioFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("diario:create", { dto } as any);

    // =========================================================

    const dtoDiario = pick(dto, ["ativo"]);

    const diario = this.diarioRepository.create();

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    // =========================================================

    if (dto.ambientePadrao != null) {
      const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.ambientePadrao.id });
      this.diarioRepository.merge(diario, {
        ambientePadrao: { id: ambientePadrao.id },
      });
    } else {
      this.diarioRepository.merge(diario, { ambientePadrao: null });
    }

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendarioLetivo.id);
    this.diarioRepository.merge(diario, {
      calendarioLetivo: { id: calendarioLetivo.id },
    });

    // =========================================================

    const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(accessContext, dto.disciplina.id);

    this.diarioRepository.merge(diario, { disciplina: { id: disciplina.id } });

    // =========================================================

    const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id);

    this.diarioRepository.merge(diario, { turma: { id: turma.id } });

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  async diarioUpdate(accessContext: AccessContext, dto: DiarioFindOneInputDto & DiarioUpdateInputDto): Promise<DiarioFindOneOutputDto> {
    // =========================================================

    const currentDiario = await this.diarioFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("diario:update", { dto }, dto.id, this.diarioRepository.createQueryBuilder(aliasDiario as any));

    const dtoDiario = pick(dto, ["ativo", "ano", "etapa", "turma", "disciplina", "ambientePadrao"]);

    const diario = {
      id: currentDiario.id,
    } as DiarioEntity;

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    // =========================================================

    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
          id: dto.ambientePadrao.id,
        });

        this.diarioRepository.merge(diario, {
          ambientePadrao: { id: ambientePadrao.id },
        });
      } else {
        this.diarioRepository.merge(diario, { ambientePadrao: null });
      }
    }

    // =========================================================

    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(accessContext, dto.disciplina.id);

      this.diarioRepository.merge(diario, {
        disciplina: { id: disciplina.id },
      });
    }

    // =========================================================

    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id);
      this.diarioRepository.merge(diario, { turma: { id: turma.id } });
    }

    // =========================================================

    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendarioLetivo.id);
      this.diarioRepository.merge(diario, {
        calendarioLetivo: { id: calendarioLetivo.id },
      });
    }

    // =========================================================

    await this.diarioRepository.save(diario);

    // =========================================================

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  async diarioDeleteOneById(accessContext: AccessContext, dto: DiarioFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("diario:delete", { dto }, dto.id, this.diarioRepository.createQueryBuilder(aliasDiario as any));

    // =========================================================

    const diario = await this.diarioFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diario) {
      await this.diarioRepository
        .createQueryBuilder(aliasDiario)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diarioId", { diarioId: diario.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
