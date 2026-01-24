import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/domain/calendario-letivo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/infrastructure.database";
import type { HorarioGeradoEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoCreateInputDto,
  HorarioGeradoUpdateInputDto,
  HorarioGeradoFindOneInputDto,
} from "../dto";

// ============================================================================

const aliasHorarioGerado = "horario_gerado";

// ============================================================================

@Injectable()
export class HorarioGeradoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
    private searchService: SearchService,
  ) {}

  get horarioGeradoRepository() {
    return this.databaseContext.horarioGeradoRepository;
  }

  async horarioGeradoFindAll(accessContext: AccessContext, dto: HorarioGeradoListInputDto | null = null, selection?: string[] | boolean): Promise<HorarioGeradoListOutputDto> {
    // =========================================================

    const qb = this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
      {
        ...paginateConfig,
        select: [
          "id",

          "status",
          "tipo",
          "dataGeracao",
          "vigenciaInicio",
          "vigenciaFim",
          "calendario",

          "calendario.id",
          "calendario.nome",
          "calendario.ano",
        ],
        sortableColumns: [
          "status",
          "tipo",
          "dataGeracao",
          "vigenciaInicio",
          "vigenciaFim",

          "calendario.id",
          "calendario.nome",
          "calendario.ano",
        ],
        searchableColumns: [
          "id",

          "status",
          "tipo",
          "dataGeracao",
          "vigenciaInicio",
          "vigenciaFim",
          "calendario",
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
      },
    );

    // =========================================================

    qb.select([]);

    QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as HorarioGeradoListOutputDto;
  }

  async horarioGeradoFindById(accessContext: AccessContext, dto: HorarioGeradoFindOneInputDto, selection?: string[] | boolean): Promise<HorarioGeradoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    // =========================================================

    const horario = await qb.getOne();

    // =========================================================

    return horario as HorarioGeradoFindOneOutputDto | null;
  }

  async horarioGeradoFindByIdStrict(accessContext: AccessContext, dto: HorarioGeradoFindOneInputDto, selection?: string[] | boolean): Promise<HorarioGeradoFindOneOutputDto> {
    const horario = await this.horarioGeradoFindById(accessContext, dto, selection);

    if (!horario) {
      throw new NotFoundException();
    }

    return horario;
  }

  async horarioGeradoFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<HorarioGeradoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    // =========================================================

    const horario = await qb.getOne();

    // =========================================================

    return horario as HorarioGeradoFindOneOutputDto | null;
  }

  async horarioGeradoFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<HorarioGeradoFindOneOutputDto> {
    const horarioGerado = await this.horarioGeradoFindByIdSimple(accessContext, id, selection);

    if (!horarioGerado) {
      throw new NotFoundException();
    }

    return horarioGerado;
  }

  async horarioGeradoCreate(accessContext: AccessContext, dto: HorarioGeradoCreateInputDto): Promise<HorarioGeradoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado:create", { dto });

    // =========================================================

    const dtoHorarioGerado = pick(dto, ["status", "tipo", "dataGeracao", "vigenciaInicio", "vigenciaFim"]);

    const horarioGerado = this.horarioGeradoRepository.create();

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    // =========================================================

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario.id);

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoRepository.save(horarioGerado);

    // =========================================================

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  async horarioGeradoUpdate(accessContext: AccessContext, dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto): Promise<HorarioGeradoFindOneOutputDto> {
    // =========================================================

    const currentHorarioGerado = await this.horarioGeradoFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("horario_gerado:update", { dto }, dto.id, this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado));

    const dtoHorarioGerado = pick(dto, ["status", "tipo", "dataGeracao", "vigenciaInicio", "vigenciaFim"]);

    const horarioGerado = {
      id: currentHorarioGerado.id,
    } as HorarioGeradoEntity;

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    // =========================================================

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario!.id);

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoRepository.save(horarioGerado);

    // =========================================================

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  async horarioGeradoDeleteOneById(accessContext: AccessContext, dto: HorarioGeradoFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado:delete", { dto }, dto.id, this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado));

    // =========================================================

    const horarioGerado = await this.horarioGeradoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (horarioGerado) {
      await this.horarioGeradoRepository
        .createQueryBuilder(aliasHorarioGerado)
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
