import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { AmbienteService } from "@/v2/core/ambiente/domain/ambiente.service";
import { IntervaloDeTempoService } from "@/v2/core/intervalo-de-tempo/domain/intervalo-de-tempo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/v2/infrastructure.database";
import { DatabaseContextService } from "@/v2/infrastructure.database/context/database-context.service";
import type { AulaEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { SearchService } from "@/shared/search/search.service";
import { DiarioService } from "../../diario/domain/diario.service";
import type {
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaCreateInputDto,
  AulaUpdateInputDto,
  AulaFindOneInputDto,
} from "../dto";

// ============================================================================

const aliasAula = "aula";

// ============================================================================

@Injectable()
export class AulaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private diarioService: DiarioService,
    private intervaloService: IntervaloDeTempoService,
    private ambienteService: AmbienteService,
    private searchService: SearchService,
  ) {}

  get aulaRepository() {
    return this.databaseContext.aulaRepository;
  }

  async aulaFindAll(accessContext: AccessContext, dto: AulaListInputDto | null = null, selection?: string[] | boolean): Promise<AulaListOutputDto> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "formato",
        "data",

        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
        "diario.id",
        "diario.ativo",
        "ambiente.id",
        "ambiente.nome",
      ],
      sortableColumns: [
        "data",
        "formato",

        "diario.ativo",
        "ambiente.nome",
      ],
      relations: {
        ambiente: true,
        diario: true,
        intervaloDeTempo: true,
      },
      searchableColumns: [
        "id",

        "formato",
        "data",
        "ambiente.nome",
      ],
      defaultSortBy: [],
      filterableColumns: {
        "intervaloDeTempo.id": [FilterOperator.EQ],
        "diario.id": [FilterOperator.EQ],
        "ambiente.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as AulaListOutputDto;
  }

  async aulaFindById(accessContext: AccessContext, dto: AulaFindOneInputDto, selection?: string[] | boolean): Promise<AulaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    // =========================================================

    qb.andWhere(`${aliasAula}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    // =========================================================

    const aula = await qb.getOne();

    // =========================================================

    return aula as AulaFindOneOutputDto | null;
  }

  async aulaFindByIdStrict(accessContext: AccessContext, dto: AulaFindOneInputDto, selection?: string[] | boolean): Promise<AulaFindOneOutputDto> {
    const aula = await this.aulaFindById(accessContext, dto, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaFindByIdSimple(accessContext: AccessContext, id: AulaFindOneInputDto["id"], selection?: string[] | boolean): Promise<AulaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.aulaRepository.createQueryBuilder(aliasAula);

    // =========================================================

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    // =========================================================

    qb.andWhere(`${aliasAula}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    // =========================================================

    const aula = await qb.getOne();

    // =========================================================

    return aula as AulaFindOneOutputDto | null;
  }

  async aulaFindByIdSimpleStrict(accessContext: AccessContext, id: AulaFindOneInputDto["id"], selection?: string[] | boolean): Promise<AulaFindOneOutputDto> {
    const aula = await this.aulaFindByIdSimple(accessContext, id, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaCreate(accessContext: AccessContext, dto: AulaCreateInputDto): Promise<AulaFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("aula:create", { dto });

    // =========================================================

    const dtoAula = pick(dto, ["formato", "data"]);

    const aula = this.aulaRepository.create();

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    // =========================================================

    if (dto.ambiente && dto.ambiente !== null) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
    } else {
      this.aulaRepository.merge(aula, { ambiente: null });
    }

    // =========================================================

    const diario = await this.diarioService.diarioFindByIdSimpleStrict(accessContext, dto.diario.id);
    this.aulaRepository.merge(aula, { diario: { id: diario.id } });

    // =========================================================

    const intervalo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, dto.intervaloDeTempo);

    this.aulaRepository.merge(aula, {
      intervaloDeTempo: { id: intervalo!.id },
    });

    // =========================================================

    await this.aulaRepository.save(aula);

    // =========================================================

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  async aulaUpdate(accessContext: AccessContext, dto: AulaFindOneInputDto & AulaUpdateInputDto): Promise<AulaFindOneOutputDto> {
    // =========================================================

    const currentAula = await this.aulaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("aula:update", { dto }, dto.id, this.aulaRepository.createQueryBuilder(aliasAula));

    const dtoAula = pick(dto, ["formato", "data", "intervaloDeTempo", "diario", "ambiente"]);

    const aula = {
      id: currentAula.id,
    } as AulaEntity;

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    // =========================================================

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      if (dto.ambiente !== null) {
        const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, { id: dto.ambiente.id });

        this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
      } else {
        this.aulaRepository.merge(aula, { ambiente: null });
      }
    }

    // =========================================================

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.diarioFindByIdSimpleStrict(accessContext, dto.diario.id);

      this.aulaRepository.merge(aula, { diario: { id: diario.id } });
    }

    // =========================================================

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(accessContext, dto.intervaloDeTempo);
      this.aulaRepository.merge(aula, {
        intervaloDeTempo: { id: intervaloDeTempo!.id },
      });
    }

    // =========================================================

    await this.aulaRepository.save(aula);

    // =========================================================

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  async aulaDeleteOneById(accessContext: AccessContext, dto: AulaFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("aula:delete", { dto }, dto.id, this.aulaRepository.createQueryBuilder(aliasAula));

    // =========================================================

    const aula = await this.aulaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (aula) {
      await this.aulaRepository
        .createQueryBuilder(aliasAula)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :aulaId", { aulaId: aula.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
