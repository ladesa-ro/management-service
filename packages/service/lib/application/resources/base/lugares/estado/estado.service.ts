import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";

const aliasEstado = "estado";

@Injectable()
export class EstadoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get baseEstadoRepository() {
    return this.databaseContext.estadoRepository;
  }

  async findAll(accessContext: AccessContext, domain: IDomain.EstadoListInput | null = null, selection?: string[]): Promise<IDomain.EstadoListOutput["success"]> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

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
        ...paginateConfig,
        select: ["id"],
        searchableColumns: ["nome", "sigla"],
        sortableColumns: ["id", "nome", "sigla"],
        defaultSortBy: [["nome", "ASC"]],
        filterableColumns: {},
      },
    );

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("EstadoFindOneOutput", qb, aliasEstado, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();

    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async findById(accessContext: AccessContext, domain: IDomain.EstadoFindOneInput, selection?: string[]) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder("estado");

    // =========================================================

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("EstadoFindOneOutput", qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(accessContext: AccessContext, domain: IDomain.EstadoFindOneInput, selection?: string[]) {
    const estado = await this.findById(accessContext, domain, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
