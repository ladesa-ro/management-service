import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/v2/adapters/in/http/calendario-letivo/dto";

// ============================================================================

const aliasCalendarioLetivo = "calendarioLetivo";

// ============================================================================

@Injectable()
export class CalendarioLetivoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
    private campusService: CampusService,
    private ofertaFormacaoService: OfertaFormacaoService,
  ) {}

  get calendarioLetivoRepository() {
    return this.databaseContext.calendarioLetivoRepository;
  }

  async calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      select: [
        "id",

        "nome",
        "ano",
        "campus",
        "ofertaFormacao",

        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",

        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      sortableColumns: [
        "nome",
        "ano",

        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",

        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: [
        "id",

        "nome",
        "ano",
        "campus",
        "ofertaFormacao",
      ],
      relations: {
        campus: true,
        ofertaFormacao: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "campus.cnpj": [FilterOperator.EQ],
        "campus.razaoSocial": [FilterOperator.EQ],
        "campus.nomeFantasia": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.nome": [FilterOperator.EQ],
        "ofertaFormacao.slug": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as CalendarioLetivoListOutputDto;
  }

  async caledarioLetivoFindById(accessContext: AccessContext, dto: CalendarioLetivoFindOneInputDto, selection?: string[] | boolean): Promise<CalendarioLetivoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo as CalendarioLetivoFindOneOutputDto | null;
  }

  async calendarioLetivoFindByIdStrict(accessContext: AccessContext, dto: CalendarioLetivoFindOneInputDto, selection?: string[] | boolean): Promise<CalendarioLetivoFindOneOutputDto> {
    const calendarioLetivo = await this.caledarioLetivoFindById(accessContext, dto, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<CalendarioLetivoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo as CalendarioLetivoFindOneOutputDto | null;
  }

  async calendarioLetivoFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<CalendarioLetivoFindOneOutputDto> {
    const calendarioLetivo = await this.calendarioLetivoFindByIdSimple(accessContext, id, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoCreate(accessContext: AccessContext, dto: CalendarioLetivoCreateInputDto): Promise<CalendarioLetivoFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:create", { dto });

    // =========================================================

    const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.ofertaFormacao.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(accessContext, {
      id: calendarioLetivo.id,
    });
  }

  async calendarioLetivoUpdate(accessContext: AccessContext, dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto): Promise<CalendarioLetivoFindOneOutputDto> {
    // =========================================================

    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:update", { dto }, dto.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

    const calendarioLetivo = {
      id: currentCalendarioLetivo.id,
    } as CalendarioLetivoEntity;

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.campus.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = dto.ofertaFormacao && (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, dto.ofertaFormacao.id));

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        ofertaFormacao: ofertaFormacao && {
          id: ofertaFormacao.id,
        },
      });
    }

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(accessContext, {
      id: calendarioLetivo.id,
    });
  }

  async calendarioLetivoDeleteOneById(accessContext: AccessContext, dto: CalendarioLetivoFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:delete", { dto }, dto.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (calendarioLetivo) {
      await this.calendarioLetivoRepository
        .createQueryBuilder(aliasCalendarioLetivo)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :calendarioLetivoId", {
          calendarioLetivoId: calendarioLetivo.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
