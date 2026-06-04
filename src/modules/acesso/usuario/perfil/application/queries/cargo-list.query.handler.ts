import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { CargoCreateQueryResult } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-create.command.handler.interface";
import type { CargoListQuery } from "@/modules/acesso/usuario/perfil/domain/queries/cargo-list.query";
import {
  type CargoListQueryResult,
  ICargoListQueryHandler,
} from "@/modules/acesso/usuario/perfil/domain/queries/cargo-list.query.handler.interface";

@Impl()
export class CargoListQueryHandlerImpl implements ICargoListQueryHandler {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CargoListQuery | null,
  ): Promise<CargoListQueryResult> {
    const page = dto?.page && dto.page > 0 ? dto.page : 1;
    const limit = dto?.limit && dto.limit > 0 ? dto.limit : 20;

    const repo = this.appTypeormConnection.getRepository("cargo");

    const queryBuilder = repo.createQueryBuilder("cargo");

    const [data, totalItems] = await Promise.all([
      queryBuilder
        .select(["cargo.id AS id", "cargo.nome AS nome"])
        .limit(limit)
        .offset((page - 1) * limit)
        .getRawMany<CargoCreateQueryResult>(),
      queryBuilder.getCount(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages,
        search: "",
        sortBy: [],
        filter: {},
      },
    };
  }
}
