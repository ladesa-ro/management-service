import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { RelatorioUpdateCommand } from "../../domain/commands/relatorio-update.command";
import { IRelatorioUpdateCommandHandler } from "../../domain/commands/relatorio-update.command.handler.interface";
import type { RelatorioFindOneQuery, RelatorioFindOneQueryResult } from "../../domain/queries";
import { Relatorio } from "../../domain/relatorio";
import { IRelatorioEstagioRepository } from "../../domain/repositories";

@Impl()
export class RelatorioUpdateCommandHandlerImpl implements IRelatorioUpdateCommandHandler {
  constructor(
    @Dep(IRelatorioEstagioRepository) private readonly repository: IRelatorioEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: RelatorioFindOneQuery & RelatorioUpdateCommand,
  ): Promise<RelatorioFindOneQueryResult> {
    const relatorio = await this.repository.loadById(accessContext, dto.id);
    ensureExists(relatorio, Relatorio.entityName, dto.id);

    relatorio.update((dto.conteudoJson as Record<string, any>) ?? null);
    await this.repository.save(relatorio);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, Relatorio.entityName, dto.id);
    return result!;
  }
}
