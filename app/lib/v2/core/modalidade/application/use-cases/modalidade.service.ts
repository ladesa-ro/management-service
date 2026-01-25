import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "@/v2/adapters/in/http/modalidade/dto";

// ============================================================================

const aliasModalidade = "modalidade";

// ============================================================================

@Injectable()
export class ModalidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get modalidadeRepository() {
    return this.databaseContext.modalidadeRepository;
  }

  async modalidadeFindAll(accessContext: AccessContext, dto: ModalidadeListInputDto | null = null, selection?: string[]): Promise<ModalidadeListOutputDto> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "nome",
        "slug",
        "dateCreated",
      ],
      sortableColumns: ["nome", "slug", "dateCreated"],
      searchableColumns: [
        "id",

        "nome",
        "slug",
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as ModalidadeListOutputDto;
  }

  async modalidadeFindById(accessContext: AccessContext | null, dto: ModalidadeFindOneInputDto, selection?: string[]): Promise<ModalidadeFindOneOutputDto | null> {
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
    QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade as ModalidadeFindOneOutputDto | null;
  }

  async modalidadeFindByIdStrict(accessContext: AccessContext, dto: ModalidadeFindOneInputDto, selection?: string[]): Promise<ModalidadeFindOneOutputDto> {
    const modalidade = await this.modalidadeFindById(accessContext, dto, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<ModalidadeFindOneOutputDto | null> {
    // =========================================================

    const qb = this.modalidadeRepository.createQueryBuilder(aliasModalidade);

    // =========================================================

    await accessContext.applyFilter("modalidade:find", qb, aliasModalidade, null);

    // =========================================================

    qb.andWhere(`${aliasModalidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("ModalidadeFindOneOutput", qb, aliasModalidade, selection);

    // =========================================================

    const modalidade = await qb.getOne();

    // =========================================================

    return modalidade as ModalidadeFindOneOutputDto | null;
  }

  async modalidadeFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<ModalidadeFindOneOutputDto> {
    const modalidade = await this.modalidadeFindByIdSimple(accessContext, id, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeCreate(accessContext: AccessContext, dto: ModalidadeCreateInputDto): Promise<ModalidadeFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("modalidade:create", { dto });

    // =========================================================

    const dtoModalidade = pick(dto, ["nome", "slug"]);

    const modalidade = this.modalidadeRepository.create();

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    // =========================================================

    await this.modalidadeRepository.save(modalidade);

    // =========================================================

    return this.modalidadeFindByIdStrict(accessContext, { id: modalidade.id });
  }

  async modalidadeUpdate(accessContext: AccessContext, dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto): Promise<ModalidadeFindOneOutputDto> {
    // =========================================================

    const currentModalidade = await this.modalidadeFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("modalidade:update", { dto }, dto.id, this.modalidadeRepository.createQueryBuilder(aliasModalidade));

    const dtoModalidade = pick(dto, ["nome", "slug"]);

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

  async modalidadeDeleteOneById(accessContext: AccessContext, dto: ModalidadeFindOneInputDto): Promise<boolean> {
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
