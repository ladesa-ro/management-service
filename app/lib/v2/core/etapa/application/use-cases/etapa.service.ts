import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/05-calendario/etapa.entity";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "@/v2/adapters/in/http/etapa/dto";

// ============================================================================

const aliasEtapa = "etapa";

// ============================================================================

@Injectable()
export class EtapaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
    private searchService: SearchService,
  ) {}

  get etapaRepository() {
    return this.databaseContext.etapaRepository;
  }

  async etapaFindAll(accessContext: AccessContext, dto: EtapaListInputDto | null = null, selection?: string[] | boolean): Promise<EtapaListOutputDto> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await accessContext.applyFilter("etapa:find", qb, aliasEtapa, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      select: [
        "id",

        "numero",
        "dataInicio",
        "dataTermino",
        "cor",

        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        "numero",
        "dataInicio",
        "dataInicio",
        "cor",

        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        "id",

        "numero",
        "dataInicio",
        "dataTermino",
        "cor",
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

    QbEfficientLoad("EtapaFindOneOutput", qb, aliasEtapa, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as EtapaListOutputDto;
  }

  async etapaFindById(accessContext: AccessContext, dto: EtapaFindOneInputDto, selection?: string[] | boolean): Promise<EtapaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await accessContext.applyFilter("etapa:find", qb, aliasEtapa, null);

    // =========================================================

    qb.andWhere(`${aliasEtapa}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    QbEfficientLoad("EtapaFindOneOutput", qb, aliasEtapa, selection);

    // =========================================================

    const etapa = await qb.getOne();

    // =========================================================

    return etapa as EtapaFindOneOutputDto | null;
  }

  async etapaFindByIdStrict(accessContext: AccessContext, dto: EtapaFindOneInputDto, selection?: string[] | boolean): Promise<EtapaFindOneOutputDto> {
    const etapa = await this.etapaFindById(accessContext, dto, selection);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  async etapaFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<EtapaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.etapaRepository.createQueryBuilder(aliasEtapa);

    // =========================================================

    await accessContext.applyFilter("etapa:find", qb, aliasEtapa, null);

    // =========================================================

    qb.andWhere(`${aliasEtapa}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("EtapaFindOneOutput", qb, aliasEtapa, selection);

    // =========================================================

    const etapa = await qb.getOne();

    // =========================================================

    return etapa as EtapaFindOneOutputDto | null;
  }

  async etapaFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<EtapaFindOneOutputDto> {
    const etapa = await this.etapaFindByIdSimple(accessContext, id, selection);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  async etapaCreate(accessContext: AccessContext, dto: EtapaCreateInputDto): Promise<EtapaFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("etapa:create", { dto });

    // =========================================================

    const dtoEtapa = pick(dto, ["numero", "cor", "dataInicio", "dataTermino"]);

    const etapa = this.etapaRepository.create();

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    // =========================================================

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.etapaRepository.save(etapa);

    // =========================================================

    return this.etapaFindByIdStrict(accessContext, { id: etapa.id });
  }

  async etapaUpdate(accessContext: AccessContext, dto: EtapaFindOneInputDto & EtapaUpdateInputDto): Promise<EtapaFindOneOutputDto> {
    // =========================================================

    const currentEtapa = await this.etapaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("etapa:update", { dto }, dto.id, this.etapaRepository.createQueryBuilder(aliasEtapa));

    const dtoEtapa = pick(dto, ["numero", "cor", "dataInicio", "dataTermino"]);

    const etapa = {
      id: currentEtapa.id,
    } as EtapaEntity;

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    // =========================================================

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario!.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.etapaRepository.save(etapa);

    // =========================================================

    return this.etapaFindByIdStrict(accessContext, { id: etapa.id });
  }

  async etapaDeleteOneById(accessContext: AccessContext, dto: EtapaFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("etapa:delete", { dto }, dto.id, this.etapaRepository.createQueryBuilder(aliasEtapa));

    // =========================================================

    const etapa = await this.etapaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (etapa) {
      await this.etapaRepository
        .createQueryBuilder(aliasEtapa)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :etapaId", { etapaId: etapa.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
