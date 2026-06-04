import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { CargoDeleteCommand } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-delete.command";
import { ICargoDeleteCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-delete.command.handler.interface";

@Impl()
export class CargoDeleteCommandHandlerImpl implements ICargoDeleteCommandHandler {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: CargoDeleteCommand,
  ): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository("cargo");

    const existente = await repo
      .createQueryBuilder("cargo")
      .select(["cargo.id AS id"])
      .where("cargo.id = :id", { id: command.id })
      .getRawOne<{ id: string }>();

    ensureExists(existente, "Cargo", command.id);

    await repo
      .createQueryBuilder()
      .delete()
      .from("cargo")
      .where("id = :id", { id: command.id })
      .execute();

    return true;
  }
}
