import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { CargoCreateQueryResult } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-create.command.handler.interface";
import type { CargoFindOneQuery } from "@/modules/acesso/usuario/perfil/domain/queries/cargo-find-one.query";
import { ICargoFindOneQueryHandler } from "@/modules/acesso/usuario/perfil/domain/queries/cargo-find-one.query.handler.interface";

@Impl()
export class CargoFindOneQueryHandlerImpl implements ICargoFindOneQueryHandler {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CargoFindOneQuery,
  ): Promise<CargoCreateQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository("cargo");

    const existente = await repo
      .createQueryBuilder("cargo")
      .select(["cargo.id AS id", "cargo.nome AS nome"])
      .where("cargo.id = :id", { id: dto.id })
      .getRawOne<CargoCreateQueryResult>();

    return existente || null;
  }
}
