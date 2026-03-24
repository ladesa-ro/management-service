import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEstagiarioDeleteCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQuery } from "@/modules/estagio/estagiario/domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagiarioDeleteCommandHandlerImpl implements IEstagiarioDeleteCommandHandler {
  constructor(
    @DeclareDependency(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: EstagiarioFindOneQuery,
  ): Promise<void> {
    const current = await this.repository.findById(accessContext, { id });
    ensureExists(current, Estagiario.entityName, id);

    await this.repository.softDeleteById(id);
  }
}
