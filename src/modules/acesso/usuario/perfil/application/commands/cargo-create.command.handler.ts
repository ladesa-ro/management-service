import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { CargoCreateCommand } from "@/modules/acesso/usuario/perfil/domain/commands/cargo-create.command";
import {
  type CargoCreateQueryResult,
  ICargoCreateCommandHandler,
} from "@/modules/acesso/usuario/perfil/domain/commands/cargo-create.command.handler.interface";

@Impl()
export class CargoCreateCommandHandlerImpl implements ICargoCreateCommandHandler {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: CargoCreateCommand,
  ): Promise<CargoCreateQueryResult> {
    const nome = command.nome.trim();

    const repo = this.appTypeormConnection.getRepository("cargo");

    const existente = await repo
      .createQueryBuilder("cargo")
      .select(["cargo.id AS id", "cargo.nome AS nome"])
      .where("cargo.nome = :nome", { nome })
      .getRawOne<CargoCreateQueryResult>();

    if (existente) {
      return existente;
    }

    const novoCargo: CargoCreateQueryResult = { id: generateUuidV7(), nome };

    await repo.createQueryBuilder().insert().into("cargo").values(novoCargo).execute();

    return novoCargo;
  }
}
