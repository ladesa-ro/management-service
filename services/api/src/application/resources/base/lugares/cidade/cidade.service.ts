import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";

const aliasCidade = "cidade";

@Injectable()
export class CidadeService {
  constructor(private databaseContextService: DatabaseContextService) {}

  //

  get cidadeRepository() {
    return this.databaseContextService.cidadeRepository;
  }

  //

  async findAll(accessContext: AccessContext, dto: LadesaTypings.CidadeListOperationInput | null = null, selection?: string[]) {
    // =========================================================

    const qb = this.cidadeRepository.createQueryBuilder("cidade");

    // =========================================================

    await accessContext.applyFilter("cidade:find", qb, aliasCidade, null);

    // =========================================================

    const paginated = await LadesaSearch("/cidades", dto, qb.clone(), {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        //
        "estado.id",
        "estado.sigla",
        "estado.nome",
        //
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

    QbEfficientLoad(LadesaTypings.Tokens.CidadeView, qb, aliasCidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async findById(accessContext: AccessContext, dto: LadesaTypings.CidadeFindOneInputView, selection?: string[]) {
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
    QbEfficientLoad(LadesaTypings.Tokens.CidadeView, qb, aliasCidade, selection);

    // =========================================================

    const cidade = await qb.getOne();

    // =========================================================

    return cidade;
  }

  async findByIdStrict(accessContext: AccessContext, dto: LadesaTypings.CidadeFindOneInputView, selection?: string[]) {
    const cidade = await this.findById(accessContext, dto, selection);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
