import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagiarioDeleteCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-delete.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQuery } from "@/modules/estagio/estagiario/domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@Impl()
export class EstagiarioDeleteCommandHandlerImpl implements IEstagiarioDeleteCommandHandler {
  constructor(
    @Dep(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { id }: EstagiarioFindOneQuery,
  ): Promise<void> {
    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Estagiario.entityName, id);
    ensureActiveEntity(domain, Estagiario.entityName, id);

    await this.repository.softDeleteById(id);
  }
}
