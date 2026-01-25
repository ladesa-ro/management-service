import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { QbEfficientLoad, SearchService } from "@/shared";
import type { EstadoFindOneInputDto, EstadoFindOneOutputDto, EstadoListInputDto, EstadoListOutputDto, } from "@/v2/adapters/in/http/estado/dto";

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

  async findAll(accessContext: AccessContext, dto: EstadoListInputDto | null = null, selection?: string[]): Promise<EstadoListOutputDto> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      select: ["id"],
      searchableColumns: ["nome", "sigla"],
      sortableColumns: ["id", "nome", "sigla"],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("EstadoFindOneOutput", qb, aliasEstado, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();

    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as unknown as EstadoListOutputDto;
  }

  async findById(accessContext: AccessContext, dto: EstadoFindOneInputDto, selection?: string[]): Promise<EstadoFindOneOutputDto | null> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder("estado");

    // =========================================================

    await accessContext.applyFilter("estado:find", qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("EstadoFindOneOutput", qb, aliasEstado, selection);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado as EstadoFindOneOutputDto | null;
  }

  async findByIdStrict(accessContext: AccessContext, dto: EstadoFindOneInputDto, selection?: string[]): Promise<EstadoFindOneOutputDto> {
    const estado = await this.findById(accessContext, dto, selection);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
