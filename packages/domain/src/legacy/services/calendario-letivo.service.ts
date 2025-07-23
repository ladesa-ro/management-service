import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import {
  LadesaPaginatedResultDto,
  LadesaSearch,
} from "@/application/standards/ladesa-spec/search/search-strategies";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { AccessContext } from "@ladesa-ro/management-management-service.infrastructure/access-context";
import { paginateConfig } from "@ladesa-ro/management-management-service.infrastructure/fixtures";
import { DatabaseContextService } from "@ladesa-ro/management-management-service.infrastructure/integrations/database";
import type { CalendarioLetivoEntity } from "@ladesa-ro/management-management-service.infrastructure/integrations/database/typeorm/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { CampusService } from "./campus.service";
import { OfertaFormacaoService } from "./oferta-formacao.service";

// ============================================================================

const aliasCalendarioLetivo = "calendarioLetivo";

// ============================================================================

@Injectable()
export class CalendarioLetivoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private ofertaFormacaoService: OfertaFormacaoService
  ) { }

  get calendarioLetivoRepository() {
    return this.databaseContext.calendarioLetivoRepository;
  }

  //

  async calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: IDomainContracts.CalendarioLetivoListInput | null = null,
    selection?: string[] | boolean
  ): Promise<IDomainContracts.CalendarioLetivoListOperationOutput["success"]> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(
      aliasCalendarioLetivo
    );

    // =========================================================

    await accessContext.applyFilter(
      "calendario_letivo:find",
      qb,
      aliasCalendarioLetivo,
      null
    );

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "ano",
        "campus",
        "ofertaFormacao",
        //
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        //
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
        //
      ],
      sortableColumns: [
        //
        "nome",
        "ano",
        //
        "campus.id",
        "campus.cnpj",
        "campus.razaoSocial",
        "campus.nomeFantasia",
        //
        "ofertaFormacao.id",
        "ofertaFormacao.nome",
        "ofertaFormacao.slug",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "ano",
        "campus",
        "ofertaFormacao",
        //
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
    QbEfficientLoad(
      IDomainContracts.Tokens.CalendarioLetivoFindOneOutput,
      qb,
      aliasCalendarioLetivo,
      selection
    );

    // =========================================================

    const pageItemsView = await qb
      .andWhereInIds(map(paginated.data, "id"))
      .getMany();
    paginated.data = paginated.data.map(
      (paginated) => pageItemsView.find((i) => i.id === paginated.id)!
    );

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async caledarioLetivoFindById(
    accessContext: AccessContext,
    dto: IDomainContracts.CalendarioLetivoFindOneInput,
    selection?: string[] | boolean
  ): Promise<IDomainContracts.CalendarioLetivoFindOneOutput | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(
      aliasCalendarioLetivo
    );

    // =========================================================

    await accessContext.applyFilter(
      "calendario_letivo:find",
      qb,
      aliasCalendarioLetivo,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.CalendarioLetivoFindOneOutput,
      qb,
      aliasCalendarioLetivo,
      selection
    );

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdStrict(
    accessContext: AccessContext,
    dto: IDomainContracts.CalendarioLetivoFindOneInput,
    selection?: string[] | boolean
  ) {
    const calendarioLetivo = await this.caledarioLetivoFindById(
      accessContext,
      dto,
      selection
    );

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(
    accessContext: AccessContext,
    id: IDomainContracts.CalendarioLetivoFindOneInput["id"],
    selection?: string[]
  ): Promise<IDomainContracts.CalendarioLetivoFindOneOutput | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(
      aliasCalendarioLetivo
    );

    // =========================================================

    await accessContext.applyFilter(
      "calendario_letivo:find",
      qb,
      aliasCalendarioLetivo,
      null
    );

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(
      IDomainContracts.Tokens.CalendarioLetivoFindOneOutput,
      qb,
      aliasCalendarioLetivo,
      selection
    );

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: IDomainContracts.CalendarioLetivoFindOneInput["id"],
    selection?: string[]
  ) {
    const calendarioLetivo = await this.calendarioLetivoFindByIdSimple(
      accessContext,
      id,
      selection
    );

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  //

  async calendarioLetivoCreate(
    accessContext: AccessContext,
    dto: IDomainContracts.CalendarioLetivoCreateInput
  ) {
    // =========================================================

    await accessContext.ensurePermission("calendario_letivo:create", { dto });

    // =========================================================

    const dtoCalendarioLetivo = pick(dto.body, ["nome", "ano"]);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.body.campus.id
    );

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    if (dto.body.ofertaFormacao) {
      const ofertaFormacao =
        await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.body.ofertaFormacao.id
        );

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

  async calendarioLetivoUpdate(
    accessContext: AccessContext,
    dto: IDomainContracts.CalendarioLetivoUpdateInput
  ) {
    // =========================================================

    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(
      accessContext,
      {
        id: dto.params.id,
      }
    );

    // =========================================================

    await accessContext.ensurePermission(
      "calendario_letivo:update",
      { dto },
      dto.params.id,
      this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo)
    );

    const dtoCalendarioLetivo = pick(dto.body, ["nome", "ano"]);

    const calendarioLetivo = {
      id: currentCalendarioLetivo.id,
    } as CalendarioLetivoEntity;

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    if (has(dto.body, "campus") && dto.body.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(
        accessContext,
        dto.body.campus.id
      );

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (
      has(dto.body, "ofertaFormacao") &&
      dto.body.ofertaFormacao !== undefined
    ) {
      const ofertaFormacao =
        dto.body.ofertaFormacao &&
        (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.body.ofertaFormacao.id
        ));

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

  //

  async calendarioLetivoDeleteOneById(
    accessContext: AccessContext,
    dto: IDomainContracts.CalendarioLetivoFindOneInput
  ) {
    // =========================================================

    await accessContext.ensurePermission(
      "calendario_letivo:delete",
      { dto },
      dto.id,
      this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo)
    );

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(
      accessContext,
      dto
    );

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
