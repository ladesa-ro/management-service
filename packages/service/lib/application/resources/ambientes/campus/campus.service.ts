import { Injectable, NotFoundException } from "@nestjs/common";
import { get, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { v4 } from "uuid";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { CampusEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { EnderecoService } from "../../base/lugares/endereco/endereco.service";

// ============================================================================

const aliasCampus = "campus";

// ============================================================================

@Injectable()
export class CampusService {
  constructor(
    private enderecoService: EnderecoService,
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get campusRepository() {
    return this.databaseContext.campusRepository;
  }

  async campusFindAll(accessContext: AccessContext, domain: IDomain.CampusListInput | null = null, selection?: string[] | boolean): Promise<IDomain.CampusListOutput["success"]> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      domain
        ? {
            ...domain,
            sortBy: domain.sortBy ? (domain.sortBy as any[]).map((s) => (typeof s === "string" ? s : Array.isArray(s) ? s.join(":") : `${s.column}:${s.direction ?? "ASC"}`)) : undefined,
          }
        : {},
      {
        select: [
          "id",

          "nomeFantasia",
          "razaoSocial",
          "apelido",
          "cnpj",
          "dateCreated",

          "endereco.cidade.id",
          "endereco.cidade.nome",
          "endereco.cidade.estado.id",
          "endereco.cidade.estado.nome",
          "endereco.cidade.estado.sigla",
        ],
        relations: {
          endereco: {
            cidade: {
              estado: true,
            },
          },
        },
        sortableColumns: [
          "id",

          "nomeFantasia",
          "razaoSocial",
          "apelido",
          "cnpj",
          "dateCreated",

          "endereco.cidade.id",
          "endereco.cidade.nome",
          "endereco.cidade.estado.id",
          "endereco.cidade.estado.nome",
          "endereco.cidade.estado.sigla",
        ],
        searchableColumns: [
          "id",

          "nomeFantasia",
          "razaoSocial",
          "apelido",
          "cnpj",
          "dateCreated",

          "endereco.cidade.nome",
          "endereco.cidade.estado.nome",
          "endereco.cidade.estado.sigla",
        ],
        defaultSortBy: [
          ["nomeFantasia", "ASC"],
          ["endereco.cidade.estado.nome", "ASC"],
          ["dateCreated", "ASC"],
        ],
        filterableColumns: {
          "endereco.cidade.id": [FilterOperator.EQ],
          "endereco.cidade.nome": [FilterOperator.EQ],
          "endereco.cidade.estado.id": [FilterOperator.EQ],
          "endereco.cidade.estado.nome": [FilterOperator.EQ],
          "endereco.cidade.estado.sigla": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("CampusFindOneOutput", qb, aliasCampus, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async campusFindById(accessContext: AccessContext, domain: IDomain.CampusFindOneInput, selection?: string[] | boolean): Promise<IDomain.CampusFindOneOutput | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);

    // =========================================================

    qb.andWhere(`${aliasCampus}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("CampusFindOneOutput", qb, aliasCampus, selection);

    // =========================================================

    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdStrict(accessContext: AccessContext, domain: IDomain.CampusFindOneInput, selection?: string[] | boolean) {
    const campus = await this.campusFindById(accessContext, domain, selection);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  async campusFindByIdSimple(accessContext: AccessContext, id: IDomain.CampusFindOneInput["id"], selection?: string[] | boolean): Promise<IDomain.CampusFindOneOutput | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);

    // =========================================================

    qb.andWhere(`${aliasCampus}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("CampusFindOneOutput", qb, aliasCampus, selection);

    // =========================================================

    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.CampusFindOneInput["id"], selection?: string[] | boolean) {
    const campus = await this.campusFindByIdSimple(accessContext, id, selection);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  async campusCreate(accessContext: AccessContext, domain: IDomain.CampusCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("campus:create", { dto: domain });

    // =========================================================

    const campus = await this.databaseContext.transaction(async ({ databaseContext: { campusRepository } }) => {
      // =========================================================

      const dtoCampus = pick(domain, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

      const campus = campusRepository.create();

      campusRepository.merge(campus, {
        ...dtoCampus,
      });

      campusRepository.merge(campus, {
        id: v4(),
      });

      // =========================================================

      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, domain.endereco);

      campusRepository.merge(campus, {
        endereco: {
          id: endereco.id,
        },
      });

      // =========================================================
      await campusRepository.save(campus);
      // =========================================================

      return campus;
    });

    return this.campusFindByIdStrict(accessContext, { id: campus.id });
  }

  async campusUpdate(accessContext: AccessContext, domain: IDomain.CampusUpdateInput) {
    // =========================================================

    const currentCampus = await this.campusFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("campus:update", { dto: domain }, domain.id, this.campusRepository.createQueryBuilder(aliasCampus));

    const campus = await this.databaseContext.transaction(async ({ databaseContext: { campusRepository } }) => {
      const dtoCampus = pick(domain, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

      const campus = {
        id: currentCampus.id,
      } as CampusEntity;

      campusRepository.merge(campus, {
        ...dtoCampus,
      });

      campusRepository.merge(campus, { id: currentCampus.id });

      // =========================================================

      const dtoEndereco = get(domain, "endereco");

      if (dtoEndereco) {
        const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(currentCampus.endereco.id, dtoEndereco);

        campusRepository.merge(campus, {
          endereco: {
            id: endereco.id,
          },
        });
      }

      // =========================================================

      await campusRepository.save(campus);

      // =========================================================

      // if (has(domain, 'modalidades')) {
      //   const modalidades = get(domain, 'modalidades')!;

      //   const currentCampusPossuiModalidades = await campusPossuiModalidadeRepository
      //     //
      //     .createQueryBuilder('c_p_m')
      //     .select('c_p_m.id')
      //     .innerJoin('c_p_m.campus', 'campus')
      //     .where('campus.id = :campusId', { campusId: campus.id })
      //     .getMany();

      //   await campusPossuiModalidadeRepository
      //     //
      //     .createQueryBuilder()
      //     .delete()
      //     .whereInIds(map(currentCampusPossuiModalidades, 'id'))
      //     .execute();

      //   for (const modalidadeRef of modalidades) {
      //     const modalidade = await this.modalidadeService.modalidadeFindByIdStrict(accessContext, {
      //       id: modalidadeRef.id,
      //     });

      //     const campusPossuiModalidade = campusPossuiModalidadeRepository.create();

      //     campusPossuiModalidadeRepository.merge(campusPossuiModalidade, {
      //       id: v4(),
      //     });

      //     campusPossuiModalidadeRepository.merge(campusPossuiModalidade, {
      //       modalidade: {
      //         id: modalidade.id,
      //       },
      //       campus: {
      //         id: campus.id,
      //       },
      //     });

      //     await campusPossuiModalidadeRepository.save(campusPossuiModalidade);
      //   }
      // }

      // =========================================================

      return campus;
    });

    // =========================================================

    return this.campusFindByIdStrict(accessContext, { id: campus.id });
  }

  async campusDeleteOneById(accessContext: AccessContext, domain: IDomain.CampusFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("campus:delete", { dto: domain }, domain.id, this.campusRepository.createQueryBuilder(aliasCampus));

    // =========================================================

    const campus = await this.campusFindByIdStrict(accessContext, domain);

    // =========================================================

    if (campus) {
      await this.campusRepository
        .createQueryBuilder(aliasCampus)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :campusId", { campusId: campus.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
