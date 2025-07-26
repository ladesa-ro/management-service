import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { AccessContext } from "@ladesa-ro/management-management-service.infrastructure/access-context";
import { paginateConfig } from "@ladesa-ro/management-management-service.infrastructure/fixtures";
import { DatabaseContextService } from "@ladesa-ro/management-management-service.infrastructure/integrations/database";
import type { ModalidadeEntity } from "@ladesa-ro/management-management-service.infrastructure/integrations/database/typeorm/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";

// ============================================================================

const aliasModalidade = "modalidade";

// ============================================================================

@Injectable()
export class ModalidadeService {
  constructor(private databaseContext: DatabaseContextService) { }

  get modalidadeRepository() {
    return this.databaseContext.modalidadeRepository;
  }

  //

  async modalidadeFindAll(
    accessContext: AccessContext,
    dto: IDomainContracts.ModalidadeListInput | null = null,
    selection?: string[],
  ): Promise<IDomainContracts.ModalidadeListOperationOutput["success"]> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);

    // =========================================================

    const paginated = await LadesaSearch("#/", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "slug",
        "dateCreated",
        //
      ],
      sortableColumns: [
        //
        "nome",
        "slug",
        "dateCreated",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "slug",
        //
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(IDomainContracts.Tokens.ModalidadeView, qb, aliasModalidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async modalidadeFindById(accessContext: AccessContext | null, dto: IDomainContracts.ModalidadeFindOneInput, selection?: string[]): Promise<IDomainContracts.ModalidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(IDomainContracts.Tokens.ModalidadeView, qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdStrict(accessContext: AccessContext, dto: IDomainContracts.ModalidadeFindOneInput, selection?: string[]) {
    const modalidade = await this.modalidadeFindById(accessContext, dto, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeFindByIdSimple(accessContext: AccessContext, id: IDomainContracts.ModalidadeFindOneInput["id"], selection?: string[]): Promise<IDomainContracts.ModalidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(IDomainContracts.Tokens.ModalidadeView, qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade;
  }

  async modalidadeFindByIdSimpleStrict(accessContext: AccessContext, id: IDomainContracts.ModalidadeFindOneInput["id"], selection?: string[]) {
    const modalidade = await this.modalidadeFindByIdSimple(accessContext, id, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  //

  async modalidadeCreate(accessContext: AccessContext, dto: IDomainContracts.ModalidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("modalidade:create", { dto });

    // =========================================================

    const dtoModalidade = pick(dto.body, ["nome", "slug"]);

    const modalidade = this.modalidadeRepository.create();

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(accessContext, { id: modalidade.id });
  }

  async modalidadeUpdate(accessContext: AccessContext, dto: IDomainContracts.ModalidadeUpdateInput) {
    // =========================================================

    const currentModalidade = await this.modalidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("modalidade:update", { dto }, dto.params.id, this.modalidadeRepository.createQueryBuilder(aliasModalidade));

    const dtoModalidade = pick(dto.body, ["nome", "slug"]);

    const modalidade = <ModalidadeEntity>{
      id: currentModalidade.id,
    };

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(accessContext, { id: modalidade.id });
  }

  //

  async modalidadeDeleteOneById(accessContext: AccessContext, dto: IDomainContracts.ModalidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("modalidade:delete", { dto }, dto.id, this.modalidadeRepository.createQueryBuilder(aliasModalidade));

    // =========================================================

    const modalidade = await this.modalidadeFindByIdStrict(accessContext, dto);

    // =========================================================

    if (modalidade) {
      await this.modalidadeRepository
        .createQueryBuilder(aliasModalidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :modalidadeId", { modalidadeId: modalidade.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
