import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import {
  OfertaFormacaoService
} from "@/application/resources/ensino/institucional/oferta-formacao/oferta-formacao.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { CalendarioLetivoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { CampusService } from "../../ambientes/campus/campus.service";

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
    domain: IDomain.CalendarioLetivoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<IDomain.CalendarioLetivoListOutput["success"]> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      {...domain},
      {
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
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async caledarioLetivoFindById(accessContext: AccessContext, domain: IDomain.CalendarioLetivoFindOneInput, selection?: string[] | boolean): Promise<IDomain.CalendarioLetivoFindOneOutput | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, {id: domain.id});

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdStrict(accessContext: AccessContext, domain: IDomain.CalendarioLetivoFindOneInput, selection?: string[] | boolean) {
    const calendarioLetivo = await this.caledarioLetivoFindById(accessContext, domain, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(accessContext: AccessContext, id: IDomain.CalendarioLetivoFindOneInput["id"], selection?: string[]): Promise<IDomain.CalendarioLetivoFindOneOutput | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await accessContext.applyFilter("calendario_letivo:find", qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("CalendarioLetivoFindOneOutput", qb, aliasCalendarioLetivo, selection);

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.CalendarioLetivoFindOneInput["id"], selection?: string[]) {
    const calendarioLetivo = await this.calendarioLetivoFindByIdSimple(accessContext, id, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoCreate(accessContext: AccessContext, domain: IDomain.CalendarioLetivoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:create", {dto: domain});

    // =========================================================

    const dtoCalendarioLetivo = pick(domain, ["nome", "ano"]);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, domain.body.campus.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    if (domain.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, domain.body.ofertaFormacao.id);

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

  async calendarioLetivoUpdate(accessContext: AccessContext, domain: IDomain.CalendarioLetivoUpdateInput) {
    // =========================================================

    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:update", {dto: domain}, domain.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    const dtoCalendarioLetivo = pick(domain, ["nome", "ano"]);

    const calendarioLetivo = {
      id: currentCalendarioLetivo.id,
    } as CalendarioLetivoEntity;

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    if (has(domain, "campus") && domain.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, domain.body.campus.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(domain, "ofertaFormacao") && domain.ofertaFormacao !== undefined) {
      const ofertaFormacao = domain.ofertaFormacao && (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(accessContext, domain.body.ofertaFormacao.id));

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

  async calendarioLetivoDeleteOneById(accessContext: AccessContext, domain: IDomain.CalendarioLetivoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:delete", {dto: domain}, domain.id, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo));

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, domain);

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
