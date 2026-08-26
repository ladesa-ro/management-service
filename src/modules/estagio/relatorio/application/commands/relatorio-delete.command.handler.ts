import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IRelatorioDeleteCommandHandler } from "../../domain/commands/relatorio-delete.command.handler.interface";
import type { RelatorioFindOneQuery } from "../../domain/queries";
import { Relatorio } from "../../domain/relatorio";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioDeleteCommandHandlerImpl implements IRelatorioDeleteCommandHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: RelatorioFindOneQuery): Promise<void> {
    const relatorio = await this.repository.loadById(accessContext, dto.id);
    ensureExists(relatorio, Relatorio.entityName, dto.id);

    await this.repository.softDeleteById(dto.id);
  }
}
