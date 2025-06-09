import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { CampusEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { get, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { v4 } from "uuid";
import { EnderecoService } from "../../base/lugares/endereco/endereco.service";

// ============================================================================

const aliasCampus = "campus";

// ============================================================================

@Injectable()
export class CampusService {
  constructor(
    private enderecoService: EnderecoService,
    private databaseContext: DatabaseContextService,
  ) {}

  get campusRepository() {
    return this.databaseContext.campusRepository;
  }

  //

  async campusFindAll(
    accessContext: AccessContext,
    dto: LadesaTypings.CampusListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.CampusListOperationOutput["success"]> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        //
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
        //
        "id",
        //
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        //
        "endereco.cidade.id",
        "endereco.cidade.nome",
        "endereco.cidade.estado.id",
        "endereco.cidade.estado.nome",
        "endereco.cidade.estado.sigla",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nomeFantasia",
        "razaoSocial",
        "apelido",
        "cnpj",
        "dateCreated",
        //
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
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.CampusFindOneResultView, qb, aliasCampus, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async campusFindById(accessContext: AccessContext, dto: LadesaTypings.CampusFindOneInputView, selection?: string[] | boolean): Promise<LadesaTypings.CampusFindOneResultView | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);

    // =========================================================

    qb.andWhere(`${aliasCampus}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.CampusFindOneResultView, qb, aliasCampus, selection);

    // =========================================================

    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.CampusFindOneInputView, selection?: string[] | boolean) {
    const campus = await this.campusFindById(accessContext, dto, selection);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  async campusFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.CampusFindOneInputView["id"], selection?: string[] | boolean): Promise<LadesaTypings.CampusFindOneResultView | null> {
    // =========================================================

    const qb = this.campusRepository.createQueryBuilder(aliasCampus);

    // =========================================================

    await accessContext.applyFilter("campus:find", qb, aliasCampus, null);

    // =========================================================

    qb.andWhere(`${aliasCampus}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.CampusFindOneResultView, qb, aliasCampus, selection);

    // =========================================================

    const campus = await qb.getOne();

    // =========================================================

    return campus;
  }

  async campusFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.CampusFindOneInputView["id"], selection?: string[] | boolean) {
    const campus = await this.campusFindByIdSimple(accessContext, id, selection);

    if (!campus) {
      throw new NotFoundException();
    }

    return campus;
  }

  //

  async campusCreate(accessContext: AccessContext, dto: LadesaTypings.CampusCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("campus:create", { dto });

    // =========================================================

    const campus = await this.databaseContext.transaction(async ({ databaseContext: { campusRepository } }) => {
      // =========================================================

      const dtoCampus = pick(dto.body, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

      const campus = campusRepository.create();

      campusRepository.merge(campus, {
        ...dtoCampus,
      });

      campusRepository.merge(campus, {
        id: v4(),
      });

      // =========================================================

      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.body.endereco);

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

  async campusUpdate(accessContext: AccessContext, dto: LadesaTypings.CampusUpdateOperationInput) {
    // =========================================================

    const currentCampus = await this.campusFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("campus:update", { dto }, dto.params.id, this.campusRepository.createQueryBuilder(aliasCampus));

    const campus = await this.databaseContext.transaction(async ({ databaseContext: { campusRepository } }) => {
      const dtoCampus = pick(dto.body, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

      const campus = {
        id: currentCampus.id,
      } as CampusEntity;

      campusRepository.merge(campus, {
        ...dtoCampus,
      });

      campusRepository.merge(campus, { id: currentCampus.id });

      // =========================================================

      const dtoEndereco = get(dto.body, "endereco");

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

      // if (has(dto, 'modalidades')) {
      //   const modalidades = get(dto, 'modalidades')!;

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

  //

  async campusDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.CampusFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("campus:delete", { dto }, dto.id, this.campusRepository.createQueryBuilder(aliasCampus));

    // =========================================================

    const campus = await this.campusFindByIdStrict(accessContext, dto);

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
