import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { CargoCreateQueryResult } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-create.command.handler.interface";
import type { CargoUpdateCommand } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-update.command";
import { ICargoUpdateCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-update.command.handler.interface";

@Impl()
export class CargoUpdateCommandHandlerImpl implements ICargoUpdateCommandHandler {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: CargoUpdateCommand,
  ): Promise<CargoCreateQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository("cargo");

    const existente = await repo
      .createQueryBuilder("cargo")
      .select(["cargo.id AS id", "cargo.nome AS nome"])
      .where("cargo.id = :id", { id: command.id })
      .getRawOne<CargoCreateQueryResult>();

    ensureExists(existente, "Cargo", command.id);

    if (command.nome !== undefined) {
      const nome = command.nome.trim();
      await repo
        .createQueryBuilder()
        .update("cargo")
        .set({ nome })
        .where("id = :id", { id: command.id })
        .execute();
      return { id: command.id, nome };
    }

    return existente;
  }
}
