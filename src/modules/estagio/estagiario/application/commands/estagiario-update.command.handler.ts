import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EstagiarioUpdateCommand } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command";
import { IEstagiarioUpdateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQuery } from "@/modules/estagio/estagiario/domain/queries";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioUpdateCommandHandlerImpl implements IEstagiarioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EstagiarioFindOneQuery & EstagiarioUpdateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    const { id, ...dto } = command;

    const current = await this.repository.findById(accessContext, { id });
    ensureExists(current, Estagiario.entityName, id);

    await this.repository.update(id, dto);

    const result = await this.repository.findById(accessContext, { id });
    ensureExists(result, Estagiario.entityName, id);

    return result;
  }
}
