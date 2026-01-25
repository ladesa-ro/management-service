import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad, SearchService } from "@/shared";
import type { CidadeFindOneInputDto, CidadeFindOneOutputDto, CidadeListInputDto, CidadeListOutputDto } from "@/v2/adapters/in/http/cidade/dto";

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

  async findAll(accessContext: AccessContext, dto: CidadeListInputDto | null = null, selection?: string[]): Promise<CidadeListOutputDto> {
    // =========================================================

    const qb = this.cidadeRepository.createQueryBuilder("cidade");

    // =========================================================

    await accessContext.applyFilter("cidade:find", qb, aliasCidade, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
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
    });

    // =========================================================

    qb.select([]);

    QbEfficientLoad("CidadeFindOneOutput", qb, aliasCidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as CidadeListOutputDto;
  }

  async findById(accessContext: AccessContext, dto: CidadeFindOneInputDto, selection?: string[]): Promise<CidadeFindOneOutputDto | null> {
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
    QbEfficientLoad("CidadeFindOneOutput", qb, aliasCidade, selection);

    // =========================================================

    const cidade = await qb.getOne();

    // =========================================================

    return cidade as CidadeFindOneOutputDto | null;
  }

  async findByIdStrict(accessContext: AccessContext, dto: CidadeFindOneInputDto, selection?: string[]): Promise<CidadeFindOneOutputDto> {
    const cidade = await this.findById(accessContext, dto, selection);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
