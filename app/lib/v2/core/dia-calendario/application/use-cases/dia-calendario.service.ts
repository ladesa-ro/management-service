import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type {
  DiaCalendarioEntity
} from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/dia-calendario.entity";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "@/v2/adapters/in/http/dia-calendario/dto";

// ============================================================================

const aliasDiaCalendario = "diaCalendario";

// ============================================================================

@Injectable()
export class DiaCalendarioService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
    private searchService: SearchService,
  ) {}

  get diaCalendarioRepository() {
    return this.databaseContext.diaCalendarioRepository;
  }

  async diaCalendarioFindAll(accessContext: AccessContext, dto: DiaCalendarioListInputDto | null = null, selection?: string[] | boolean): Promise<DiaCalendarioListOutputDto> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      select: [
        "id",

        "data",
        "diaLetivo",
        "feriado",

        "calendario.id",
        "calendario.nome",
        "calendario.ano",

        "diaPresencial",
        "tipo",
        "extraCurricular",
      ],
      sortableColumns: [
        "data",
        "diaLetivo",
        "feriado",

        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        "id",

        "data",
        "diaLetivo",
        "feriado",
        "calendario.nome",
      ],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as unknown as DiaCalendarioListOutputDto;
  }

  async diaCalendarioFindById(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto, selection?: string[] | boolean): Promise<DiaCalendarioFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario as DiaCalendarioFindOneOutputDto | null;
  }

  async diaCalendarioFindByIdStrict(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto, selection?: string[] | boolean): Promise<DiaCalendarioFindOneOutputDto> {
    const diaCalendario = await this.diaCalendarioFindById(accessContext, dto, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<DiaCalendarioFindOneOutputDto | null> {
    // =========================================================

    const qb = this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario);

    // =========================================================

    await accessContext.applyFilter("dia_calendario:find", qb, aliasDiaCalendario, null);

    // =========================================================

    qb.andWhere(`${aliasDiaCalendario}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DiaCalendarioFindOneOutput", qb, aliasDiaCalendario, selection);

    // =========================================================

    const diaCalendario = await qb.getOne();

    // =========================================================

    return diaCalendario as DiaCalendarioFindOneOutputDto | null;
  }

  async diaCalendarioFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<DiaCalendarioFindOneOutputDto> {
    const diaCalendario = await this.diaCalendarioFindByIdSimple(accessContext, id, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioCreate(accessContext: AccessContext, dto: DiaCalendarioCreateInputDto): Promise<DiaCalendarioFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("dia_calendario:create", { dto } as any);

    // =========================================================

    const dtoDiaCalendario = pick(dto, ["data", "dia_letivo", "feriado"]) as Pick<typeof dto, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = this.diaCalendarioRepository.create();

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    } as any);

    // =========================================================

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, {
      id: diaCalendario.id,
    });
  }

  async diaCalendarioUpdate(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto): Promise<DiaCalendarioFindOneOutputDto> {
    // =========================================================

    const currentDiaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("dia_calendario:update", { dto }, dto.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario as any));

    const dtoDiaCalendario = pick(dto, ["data", "dia_letivo", "feriado"]) as Pick<typeof dto, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = {
      id: currentDiaCalendario.id,
    } as DiaCalendarioEntity;

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    } as any);

    // =========================================================

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario!.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.diaCalendarioRepository.save(diaCalendario);

    // =========================================================

    return this.diaCalendarioFindByIdStrict(accessContext, {
      id: diaCalendario.id,
    });
  }

  async diaCalendarioDeleteOneById(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("dia_calendario:delete", { dto }, dto.id, this.diaCalendarioRepository.createQueryBuilder(aliasDiaCalendario as any));

    // =========================================================

    const diaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, dto);

    // =========================================================

    if (diaCalendario) {
      await this.diaCalendarioRepository
        .createQueryBuilder(aliasDiaCalendario)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :diaCalendarioId", { diaCalendarioId: diaCalendario.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
