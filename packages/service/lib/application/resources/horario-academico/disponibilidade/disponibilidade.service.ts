import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { SearchService } from "@/application/helpers/search.service";
import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { DisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasDisponibilidade = "disponibilidade";

// ============================================================================

@Injectable()
export class DisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get disponibilidadeRepository() {
    return this.databaseContext.disponibilidadeRepository;
  }

  //

  async disponibilidadeFindAll(accessContext: AccessContext, dto: IDomain.DisponibilidadeListInput | null = null, selection?: string[]): Promise<IDomain.DisponibilidadeListOutput["success"]> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
      {
        ...paginateConfig,
        select: [
          //
          "id",
          //
          "dataInicio",
          "dataFim",
          "dateCreated",
          //
        ],
        sortableColumns: [
          //
          "dataInicio",
          "dataFim",
          "dateCreated",
        ],
        searchableColumns: [
          //
          "id",
          //
          "dataInicio",
          "dataFim",
          //
        ],
        defaultSortBy: [
          ["dataInicio", "ASC"],
          ["dataFim", "ASC"],
        ],
        filterableColumns: {},
      },
    );

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeView, qb, aliasDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();

    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async disponibilidadeFindById(accessContext: AccessContext | null, dto: IDomain.DisponibilidadeFindOneInput, selection?: string[]): Promise<IDomain.DisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeView, qb, aliasDisponibilidade, selection);

    // =========================================================

    const disponibilidade = await qb.getOne();

    // =========================================================

    return disponibilidade;
  }

  async disponibilidadeFindByIdStrict(accessContext: AccessContext, dto: IDomain.DisponibilidadeFindOneInput, selection?: string[]) {
    const disponibilidade = await this.disponibilidadeFindById(accessContext, dto, selection);

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  async disponibilidadeFindByIdSimple(accessContext: AccessContext, id: IDomain.DisponibilidadeFindOneInput["id"], selection?: string[]): Promise<IDomain.DisponibilidadeFindOneOutput | null> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.DisponibilidadeView, qb, aliasDisponibilidade, selection);

    // =========================================================

    const disponibilidade = await qb.getOne();

    // =========================================================

    return disponibilidade;
  }

  async disponibilidadeFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.DisponibilidadeFindOneInput["id"], selection?: string[]) {
    const disponibilidade = await this.disponibilidadeFindByIdSimple(accessContext, id, selection);

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  //

  async disponibilidadeCreate(accessContext: AccessContext, dto: IDomain.DisponibilidadeCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade:create", { dto });

    // =========================================================

    const dtoDisponibilidade = pick(dto.body, ["dataInicio", "dataFim"]);

    const disponibilidade = this.disponibilidadeRepository.create();

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    // =========================================================

    await this.disponibilidadeRepository.save(disponibilidade);

    // =========================================================

    return this.disponibilidadeFindByIdStrict(accessContext, {
      id: disponibilidade.id,
    });
  }

  async disponibilidadeUpdate(accessContext: AccessContext, dto: IDomain.DisponibilidadeUpdateByIdInput) {
    // =========================================================

    const currentDisponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });

    // =========================================================

    await accessContext.ensurePermission("disponibilidade:update", { dto }, dto.parameters.path.id, this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade));

    const dtoDisponibilidade = pick(dto.body, ["dataInicio", "dataFim"]);

    const disponibilidade = <DisponibilidadeEntity>{
      id: currentDisponibilidade.id,
    };

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    // =========================================================

    await this.disponibilidadeRepository.save(disponibilidade);

    // =========================================================

    return this.disponibilidadeFindByIdStrict(accessContext, {
      id: disponibilidade.id,
    });
  }

  //

  async disponibilidadeDeleteOneById(accessContext: AccessContext, dto: IDomain.DisponibilidadeFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade:delete", { dto }, dto.id, this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade));

    // =========================================================

    const disponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, dto);

    // =========================================================

    if (disponibilidade) {
      await this.disponibilidadeRepository
        .createQueryBuilder(aliasDisponibilidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disponibilidadeId", {
          disponibilidadeId: disponibilidade.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
