import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";

const aliasEstado = "estado";

@Injectable()
export class EstadoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get baseEstadoRepository() {
    return this.databaseContext.estadoRepository;
  }

  //

  async findAll(accessContext: AccessContext, dto: LadesaTypings.EstadoListOperationInput | null = null, selection?: string[]): Promise<LadesaTypings.EstadoListOperationOutput["success"]> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

    // =========================================================

    const paginated = await LadesaSearch("/estado", dto ?? null, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
      ],
      searchableColumns: [
        //
        "nome",
        "sigla",
      ],
      sortableColumns: [
        //
        "id",
        "nome",
        "sigla",
      ],
      defaultSortBy: [
        //
        ["nome", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.EstadoView, qb, aliasEstado, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();

    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async findById(accessContext: AccessContext, dto: LadesaTypings.EstadoFindOneInputView, selection?: string[]) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder("estado");

    // =========================================================

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.EstadoView, qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(accessContext: AccessContext, dto: LadesaTypings.EstadoFindOneInputView, selection?: string[]) {
    const estado = await this.findById(accessContext, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
