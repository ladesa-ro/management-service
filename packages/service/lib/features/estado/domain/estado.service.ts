import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { QbEfficientLoad, SearchService } from "@/shared";
import { type IDomain } from "@/shared/tsp/schema/typings";

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

  async findAll(accessContext: AccessContext, domain: IDomain.EstadoListInput | null = null, selection?: string[]): Promise<IDomain.EstadoListOutput> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, domain, {
      ...paginateConfig,
      select: ["id"],
      searchableColumns: ["nome", "sigla"],
      sortableColumns: ["id", "nome", "sigla"],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {},
    });

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
