import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IEstagioDeleteCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-delete.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQuery } from "@/modules/estagio/estagio/domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagioDeleteCommandHandlerImpl implements IEstagioDeleteCommandHandler {
  constructor(
    @DeclareDependency(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(accessContext: IAccessContext | null, { id }: EstagioFindOneQuery): Promise<void> {
    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Estagio.entityName, id);
    ensureActiveEntity(domain, Estagio.entityName, id);

    await this.repository.softDeleteHorariosEstagio(id);
    await this.repository.softDeleteById(id);
  }
}
