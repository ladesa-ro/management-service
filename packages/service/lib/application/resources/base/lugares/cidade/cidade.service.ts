import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/application/contracts/qb-efficient-load";
import { SearchService } from "@/application/helpers/search.service";
import { type IDomain } from "@/domain/contracts/integration";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";

const aliasCidade = "cidade";

@Injectable()
export class CidadeService {
  constructor(
    private databaseContextService: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get cidadeRepository() {
    return this.databaseContextService.cidadeRepository;
  }

  async findAll(accessContext: AccessContext, dto: IDomain.CidadeListInput | null = null, selection?: string[]) {
    // =========================================================

    const qb = this.cidadeRepository.createQueryBuilder("cidade");

    // =========================================================

    await accessContext.applyFilter("cidade:find", qb, aliasCidade, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...dto },
      {
        ...paginateConfig,
        select: [
          "id",

          "nome",

          "estado.id",
          "estado.sigla",
          "estado.nome",
        ],
        relations: {
          estado: true,
        },
        sortableColumns: ["id", "nome", "estado.nome", "estado.sigla"],
        searchableColumns: ["nome", "estado.nome", "estado.sigla"],
        defaultSortBy: [
          ["nome", "ASC"],
          ["estado.nome", "ASC"],
        ],
        filterableColumns: {
          "estado.id": [FilterOperator.EQ],
          "estado.nome": [FilterOperator.EQ],
          "estado.sigla": [FilterOperator.EQ],
        },
      },
    );

    // =========================================================

    qb.select([]);

    await QbEfficientLoad("CidadeFindOneOutput", qb, aliasCidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async findById(accessContext: AccessContext, dto: IDomain.CidadeFindOneInput, selection?: string[]) {
    // =========================================================

    const { cidadeRepository: baseCidadeRepository } = this.databaseContextService;

    // =========================================================

    const qb = baseCidadeRepository.createQueryBuilder(aliasCidade);

    // =========================================================

    await accessContext.applyFilter("cidade:find", qb, aliasCidade, null);

    // =========================================================

    qb.andWhere("cidade.id = :id", { id: dto.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("CidadeFindOneOutput", qb, aliasCidade, selection);

    // =========================================================

    const cidade = await qb.getOne();

    // =========================================================

    return cidade;
  }

  async findByIdStrict(accessContext: AccessContext, dto: IDomain.CidadeFindOneInput, selection?: string[]) {
    const cidade = await this.findById(accessContext, dto, selection);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
